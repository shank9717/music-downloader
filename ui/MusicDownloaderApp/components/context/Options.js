import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView,
    KeyboardAvoidingView,
    PermissionsAndroid,
    TouchableOpacity,
    Animated,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { moderateScale } from 'react-native-size-matters';
import { Image } from "react-native-elements";
import { Feather, Entypo } from "@expo/vector-icons";
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { StorageAccessFramework } from 'expo-file-system';
import Constants from 'expo-constants';


const SongOptions = (props) => {
    const modes = ["play", "pause"];
    const [currentMode, setMode] = useState(0);
    const [sound, setSound] = React.useState();
    const [downloadInProgress, setDownloadInProgress] = React.useState(false);
    const [playDisabled, setPlayDisabled] = React.useState(props['item']['preview_url'] == null);
    const playBtnOpacity = playDisabled ? 0.5 : 1;
    const playBtnColor = playDisabled ? 'grey': '#9c88ff';

    
    const parentItem = props?.parentItem;
    let parentId = '';
    if (parentItem) {
        parentId = parentItem.album_id || parentItem.artist_id;
    }
    const currentItemId = parentId + '_' + props['item']['song_id'];

    async function playSound() {
        const preview_url = props['item']['preview_url'];
        const { sound } = await Audio.Sound.createAsync( {uri: preview_url},
            { shouldPlay: false },
            (status) => {
                if (status.didJustFinish) {
                    setMode(0);
                    setSound(null);
                }
            });
        setSound(sound);
        sound.playAsync();
    }

    React.useEffect(() => {
        return sound
        ? () => {
            console.log('Unloading Sound');
            sound?.unloadAsync();
        } : () => {
            props.setCurrentPlaying(currentItemId);
        };
    }, [sound]);

    useEffect(() => {
        if (sound && props.currentPlaying != currentItemId) {
            setMode(0);
            setSound(null);
        }
    }, [props.currentPlaying]);

    useEffect(() => {
        setMode(0);
        setSound(null);
    }, [props.forcePause]);

    const blobToBase64 = async (blob) => {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    };

    const downloadAndCopyFile = async () => {
        console.log('Downloading song..');
        setDownloadInProgress(true);
        const details = {'item': props.item};
        const downloadUrl = Constants.expoConfig.extra.API_URL + '/download';
        let dataReceived = ""; 
        let resp = await fetch(downloadUrl, {
                method: "post",
                body: JSON.stringify(details)
            });
        if (resp.status === 200) {
            let contentDisposition = resp.headers.get("content-disposition");
            const parts = contentDisposition.split(';');
            const filename = parts[1].split('=')[1];
            const data = await resp.blob();
            let base64 = await blobToBase64(data);
            base64 = base64.substr(base64.indexOf(',')+1)

            try {
                const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync('content://com.android.externalstorage.documents/tree/primary%3AMusic');
                if (!permissions.granted) {
                    props.setSnackbarProperties({visible: true, text: 'No permissions provided to write to path'});
                    setDownloadInProgress(false);
                    setTimeout(function () {
                        props.setSnackbarProperties({visible: false, text: ''});
                    }, 5000);
                    return;
                }
                // await RNFS.writeFile(RNFS.DownloadDirectoryPath + '/' + filename, base64, { encoding: 'base64' });
                await StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, 'audio/mp3')
                    .then(async (uri) => {
                        await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
                        uri = decodeURIComponent(uri);
                        let uriParts = uri.split(':');
                        let simplePath = decodeURIComponent(uriParts[uriParts.length - 1]);
                        setDownloadInProgress(false);
                        console.log('Downloaded song..');
                        props.setSnackbarProperties({visible: true, text: 'Downloaded song to: ' + simplePath});
                        setTimeout(function () {
                            props.setSnackbarProperties({visible: false, text: 'Downloaded song...'});
                        }, 5000);
                    })
                    .catch((e) => {
                        console.error(e);
                        setDownloadInProgress(false);
                    });
            } catch (e) {
                console.error(e);
            }
        } else {
            setDownloadInProgress(false);
            props.setSnackbarProperties({visible: true, text: 'Error while downloading song...'});
            setTimeout(function () {
                props.setSnackbarProperties({visible: false, text: ''});
            }, 5000);
            return Promise.reject("server error");
        }
    }
    
    return (
        <ScrollView  
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps='always' contentContainerStyle={styles.options_container}>
            <TouchableOpacity>
                <Feather style={{ opacity: playBtnOpacity, color: playBtnColor }} name={modes[currentMode]} size={20} color="#9c88ff" onPress={() => {
                        if (playDisabled) {
                            return;
                        }
                        setMode(currentMode == 1 ? 0 : 1);
                        if (currentMode == 0) {
                            playSound();
                        } else {
                            sound?.pauseAsync(); 
                            setSound(null);
                        }                       
                    }
                } />
            </TouchableOpacity>

            {
                downloadInProgress &&  
                <Animated.View>
                    <TouchableOpacity>
                        <ActivityIndicator
                            animating = {downloadInProgress}
                            color = '#9c88ff'
                            size = 'small'
                            hidesWhenStopped = "true"
                            style = {styles.activityIndicator}/>
                    </TouchableOpacity>
                </Animated.View>
            }

            {
                !downloadInProgress &&
                <Animated.View>
                    <TouchableOpacity>
                        <Feather name="download" size={20} color="#9c88ff" onPress={async () => {   
                                const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE );
                                if (granted) {
                                    downloadAndCopyFile();   
                                } else {
                                    const userResponse = await PermissionsAndroid.requestMultiple([
                                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                                    ]);
                                    if (userResponse) {
                                        downloadAndCopyFile();
                                    } else {
                                        setDownloadInProgress(false);
                                    }
                                }               
                            }
                        }/>
                    </TouchableOpacity>
                </Animated.View>
            }
        </ScrollView>
    )
};

export default SongOptions;


const styles = StyleSheet.create({
    options_container: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        // backgroundColor: 'rgba(50, 51, 84, 1)',
        borderColor: '#9c88ff',
        borderTopWidth: 0.5,
        alignSelf: 'stretch',
        textAlign: 'center',
        width: "100%",
        padding: 5,
        borderRadius: 5,
        fontFamily: 'Poppins-Light'
    }
});