import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView,
    KeyboardAvoidingView,
    TouchableOpacity,
} from "react-native";
import { moderateScale } from 'react-native-size-matters';
import { Image } from "react-native-elements";
import { Feather, Entypo } from "@expo/vector-icons";
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { StorageAccessFramework } from 'expo-file-system';

// definition of the Item, which will be rendered in the FlatList
const Item = ({ title, album, artist, full_image }) => (
    <KeyboardAvoidingView style={styles.item}>
        <Image
            style={{ width: 50, height: 50, padding: 10 }}
            source={{ uri: full_image }}
        />
        <View style={styles.song_details}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.details}>{artist}</Text>
            <Text style={styles.details}>{album}</Text>
        </View>
    </KeyboardAvoidingView>
);

const SongOptions = (item) => {
    const modes = ["play", "pause"];
    const [currentMode, setMode] = useState(0);
    const [sound, setSound] = React.useState();

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync( require('../assets/Hello.mp3') );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    React.useEffect(() => {
        return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
        } : undefined;
    }, [sound]);

    React.useEffect(() => {
        const downloadFile = () => {
            const filePath = 'https://file-examples.com/storage/fe4b4c6261634c76e91986b/2017/11/file_example_MP3_700KB.mp3';
            FileSystem.downloadAsync(
                filePath,
                FileSystem.documentDirectory + 'small.mp3'
              )
                .then(({ uri }) => {
                  console.log('Finished downloading to ', uri);
                })
                .catch(error => {
                  console.error(error);
                });
              
        }
        downloadFile();
    }, []);

    const copyFile = async () => {
        let fileUri = FileSystem.documentDirectory + "small.mp3";
        let newUri = '/storage/emulated/0/Download/Emojis/small.mp3';
        console.log("Requesting permissions");
        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
        console.log("Permission granted",  permissions.directoryUri);
        if (!permissions.granted) {
            return;
        }
        
        console.log('Copying from : ' + fileUri);
        console.log('Copying to : ' + newUri);
        const base64 = await FileSystem.readAsStringAsync(fileUri, { encoding: 'base64' });
        try {
            await StorageAccessFramework.createFileAsync('content://com.android.externalstorage.documents/tree/primary%3ADownload%2FEmojis/', 'small.mp3', 'audio/mp3')
                .then(async(uri) => {
                    await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (e) {
            throw new Error(e);
        }
    }
    
    return (
        <View style={styles.options_container}>
            <TouchableOpacity>
                <Feather name={modes[currentMode]} size={20} color="#fff" onPress={() => {
                        setMode(currentMode == 1 ? 0 : 1);
                        if (currentMode == 0) {
                            playSound();
                        } else {
                            sound.pauseAsync(); 
                            setSound(null);
                        }                       
                    }
                } />
            </TouchableOpacity>

            <TouchableOpacity>
                <Feather name="eye" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity>
                <Feather name="download" size={20} color="#fff" onPress={() => {
                        copyFile();                    
                    }
                }/>
            </TouchableOpacity>
        </View>
    )
};

// the filter
const List = (props) => {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.song_detail_view}>
                <Item title={item.title} album={item.album} artist={item.primary_artists} full_image={item.full_image} />
                <SongOptions item={item} />
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            onStartShouldSetResponder={() => {
                props.setClicked(false);
            }}
            style={styles.list__container}>

            <FlatList
                data={props.data}
                renderItem={renderItem}
                keyExtractor={(item) => item.song_id}
            />
        </KeyboardAvoidingView>
    );
};

export default List;

const styles = StyleSheet.create({
    song_detail_view: {
        marginBottom: moderateScale(10),
        marginLeft: 5
    },
    list__container: {
        height: "85%",
        display: "flex",
        alignSelf: "flex-start",
        textAlign: "left",
        marginLeft: moderateScale(20)
    },
    item: {
        color: '#fff',
        justifyContent: "flex-start",
        flexDirection: 'row',
        padding: 5,
        marginBottom: 10
    },
    options_container: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        backgroundColor: 'grey',
        alignSelf: 'stretch',
        textAlign: 'center',
        width: "100%",
        padding: 5
    },
    song_details: {
        marginLeft: 10
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        textAlign: "left",
    },
    details: {
        color: '#fff',
        textAlign: "left"
    }
});