import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView,
    KeyboardAvoidingView,
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

        console.log('Playing Sound');
        sound.playAsync();
    }

    React.useEffect(() => {
        return sound
        ? () => {
            console.log('Unloading Sound');
            sound?.unloadAsync();
        } : undefined;
    }, [sound]);

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
                await StorageAccessFramework.createFileAsync('content://com.android.externalstorage.documents/tree/primary%3AMusic/', filename, 'audio/mp3')
                    .then(async (uri) => {
                        await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
                        
                        setDownloadInProgress(false);
                        console.log('Downloaded song..');
                        props.setShowSnackbar(true);
                        setTimeout(function () {
                            props.setShowSnackbar(false);
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
            return Promise.reject("server error");
        }
    }
    
    return (
        <ScrollView  keyboardShouldPersistTaps='handled' contentContainerStyle={styles.options_container}>
            <TouchableOpacity>
                <Feather name={modes[currentMode]} size={20} color="#fff" onPress={() => {
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
                            color = '#fff'
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
                        <Feather name="download" size={20} color="#fff" onPress={async () => {   
                                const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSION.WRITE_EXTERNAL_STORAGE );
                                if (granted) {
                                    downloadAndCopyFile();   
                                } else {
                                    const userResponse = await PermissionsAndroid.requestMultiple([
                                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                                    ]);
                                    if (userResponse) {
                                        downloadAndCopyFile();
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
        backgroundColor: 'grey',
        alignSelf: 'stretch',
        textAlign: 'center',
        width: "100%",
        padding: 5,
        borderRadius: 5,
    }
});