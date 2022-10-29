import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView,
    Pressable,
    Modal
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
import SongOptions from './context/Options';
import MarqueeText from 'react-native-marquee';
import { BlurView } from 'expo-blur';


// definition of the Item, which will be rendered in the FlatList
const Item = ({ title, album, artist, full_image, setModalVisible }) => {
    return (
        <KeyboardAvoidingView style={styles.item}>
            <Image
                style={{ width: 50, height: 50, padding: 10, marginTop: 5, borderRadius:7 }}
                source={{ uri: full_image }}
                onPress={() => {
                    setModalVisible({visible: true, img: full_image});
                }}
            />
            <View style={styles.song_details}>
                <MarqueeText 
                    speed={0.4} 
                    marqueeOnStart={true}
                    loop={true}
                    delay={1000}
                    style={styles.title}>{title}</MarqueeText>
                <MarqueeText 
                    style={styles.details}
                    speed={0.4}
                    marqueeOnStart={true}
                    loop={true}
                    delay={1000}
                >
                    {artist}
                </MarqueeText>
                <MarqueeText 
                    speed={0.4} 
                    marqueeOnStart={true}
                    loop={true}
                    delay={1000}
                    style={styles.details}>{album}
                </MarqueeText>
            </View>
            
        </KeyboardAvoidingView>
    )
};

const List = (props) => {
    const [modalVisible, setModalVisible] = useState({visible: false, img: null});

    const renderItem = ({ item }) => {
        return (
            <SafeAreaView  keyboardShouldPersistTaps='handled'  style={styles.song_detail_view}>
                <Item 
                    title={item.title} 
                    album={item.album ? item.album : ''} 
                    artist={item.primary_artists ? item.primary_artists : ''} 
                    full_image={item.full_image}
                    setModalVisible={item.setModalVisible} />
                <SongOptions 
                    item={item} 
                    snackbarProperties={props.snackbarProperties} 
                    setSnackbarProperties={props.setSnackbarProperties} />
            </SafeAreaView>
        );
    };

    let modifiedData = props.data.map((item) => {
        item.setModalVisible = setModalVisible;
        return item;
    });

    return (
        <SafeAreaView
            onStartShouldSetResponder={() => {
                props.setClicked(false);
            }}
            style={styles.list__container}>

            <FlatList
                data={modifiedData}
                renderItem={renderItem}
                keyExtractor={(item) => item.song_id}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible.visible}>
                    
                <SafeAreaView  style={styles.centeredView}>
                    <BlurView
                        blurType='light'
                        intensity={0} 
                        style={[styles.nonBlurredContent, { height: "100%" }]}
                    >
                        <SafeAreaView style={styles.modalView}>
                            <Image
                                style={{ width: 280, height: 280, padding: 5, marginBottom: 20, borderRadius: 15 }}
                                source={{ uri: modalVisible.img }}
                            />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible({visible: false, img: null})}>
                            <Feather name='x' color='#fff' size={16}></Feather>
                            </Pressable>
                        </SafeAreaView>
                    </BlurView>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
};

export default List;

const styles = StyleSheet.create({
    song_detail_view: {
        marginBottom: 10,
        fontFamily: 'Poppins-Light',
        backgroundColor: 'rgba(50, 51, 84, 1)',
        borderColor: '#9c88ff',
        borderWidth: 0.5,
        borderRadius: 5,
        paddingRight: 5,
    },
    list__container: {
        height: "85%",
        display: "flex",
        alignSelf: "flex-start",
        textAlign: "left",
        marginLeft: 10,
        marginRight: 10
    },
    item: {
        color: '#fff',
        justifyContent: "flex-start",
        backfaceVisibility: "hidden",
        flexDirection: 'row',
        padding: 5,
        marginBottom: 10
    },
    song_details: {
        marginLeft: 10
    },
    title: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 2,
        textAlign: "left",
        fontFamily: 'Poppins-Bold'
    },
    details: {
        color: '#fff',
        textAlign: "left",
        fontSize: 12,
        fontFamily: 'Poppins-Light',
        flexShrink: 1
    },
    nonBlurredContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        margin: 10,
        borderRadius: 10,
        padding: 1,
        alignItems: 'center'
    },
    button: {
        borderRadius: 20,
        padding: 12,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: 'rgba(50, 51, 84, 1)',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});