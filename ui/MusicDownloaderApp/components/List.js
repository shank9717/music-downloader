import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    Animated,
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
import * as Animatable from 'react-native-animatable';
// definition of the Item, which will be rendered in the FlatList
const SongItem = ({ title, album, artist, full_image, setModalVisible }) => {
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

const ArtistItem = ({ title, full_image, songs, setModalVisible }) => {
    return (
        <KeyboardAvoidingView style={styles.item}>
            <Image
                style={{ width: 50, height: 50, padding: 10, marginTop: 5, borderRadius:7 }}
                source={{ uri: full_image }}
                onPress={() => {
                    setModalVisible({visible: true, img: full_image});
                }}
            />
            <View style={styles.artist_details}>
                <MarqueeText 
                    speed={0.4} 
                    marqueeOnStart={true}
                    loop={true}
                    delay={1000}
                    style={ { ...styles.title, fontSize: 18 } }
                >
                    {title}
                </MarqueeText>
            </View>
            
        </KeyboardAvoidingView>
    )
};

const ExpansionPanel = ({type, artistItem, props}) => {
    const [expanded, setExpanded] = useState(false);

    const renderItem = ({ item }) => {
        return (
            <SafeAreaView  keyboardShouldPersistTaps='handled'  style={
                    {
                        ...styles.song_detail_view,
                        width: moderateScale(300 - 20),
                        marginLeft: moderateScale(10),
                        marginRight: moderateScale(10),
                        backgroundColor: 'rgba(0,0,0,0.1)'
                    }
                }>
                <SongItem 
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
        
    return (
        <SafeAreaView>
            <SafeAreaView style={styles.expansion_panel__header}>
                <TouchableOpacity style={styles.expansion_panel__header} onPress={() => {
                    setExpanded(!expanded);
                }}>
                    { !expanded && 
                        <Feather name='chevron-down' size={24} style={styles.expansion_icon}></Feather>
                    }
                    { expanded && 
                        <Feather name='chevron-up' size={24} style={styles.expansion_icon}></Feather>
                    }
                </TouchableOpacity>
            </SafeAreaView>
            { expanded && 
                <ScrollView keyboardShouldPersistTaps='always'
                    nestedScrollEnabled={true}
                    persistentScrollbar={true} 
                    style={styles.expansion_panel__content}
                >
                    <FlatList style={styles.expansion_panel__content_list}
                        data={artistItem.songs}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.song_id }
                    />
                </ScrollView>
            }
        </SafeAreaView>
    );
    
};

const List = (props) => {
    const [modalVisible, setModalVisible] = useState({visible: false, img: null});
    const [songList, setSongList] = useState([]);

    const renderItem = ({ item }) => {
        if (item.song_id) {
            return (
                <SafeAreaView  keyboardShouldPersistTaps='always'  style={styles.song_detail_view}>
                    <SongItem 
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
        }
        if (item.artist_id) {
            return (
                <SafeAreaView keyboardShouldPersistTaps='always'  style={styles.song_detail_view}>
                    <ArtistItem 
                        title={item.name} 
                        full_image={item.full_image}
                        songs={item.songs}
                        setModalVisible={item.setModalVisible} />
                    <ExpansionPanel
                        type={'artist'}
                        artistItem={item}
                        props={props}
                    ></ExpansionPanel>
                </SafeAreaView>
            );
        }
    };

    useEffect(() => {
        let modifiedData = [];
        let tempData = props.data.map((item) => {
            if (item.songs) {
                item.songs = item.songs.slice(0, 4);
                for (let songItem of item.songs) {
                    songItem.setModalVisible = setModalVisible;
                }
            
            }
    
            item.setModalVisible = setModalVisible;
            return item;
        });
        for (let item of tempData) {
            if (item.song_id) {
                modifiedData.push(item);
            }
        }
        for (let item of tempData) {
            if (item.artist_id) {
                modifiedData.push(item);
            }
        }
        for (let item of tempData) {
            if (item.album_id) {
                modifiedData.push(item);
            }
        }
        setSongList(modifiedData);
    }, [props.setData]);

    return (
        <ScrollView nestedScrollEnabled={true} persistentScrollbar={true} keyboardShouldPersistTaps='always'
            onStartShouldSetResponder={() => {
                props.setClicked(false);
            }}
            style={styles.list__container}>

            <FlatList
                data={songList}
                renderItem={renderItem}
                keyExtractor={(item) => item.song_id || item.album_id || item.artist_id }
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
        </ScrollView>
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
        alignSelf: 'center',
        width: moderateScale(300),
    },
    list__container: {
        width: '100%',
        height: "85%",
        display: "flex",
        alignSelf: "flex-start",
        textAlign: "left"
    },
    item: {
        overflow: 'hidden',
        padding: 5,
        color: '#fff',
        justifyContent: "flex-start",
        backfaceVisibility: "hidden",
        flexDirection: 'row',
        marginBottom: 10,
        width: '100%'
    },
    song_details: {
        paddingRight: 5,
        paddingLeft: 10,
        width: moderateScale(300) - 60,
    },
    artist_details: {
        paddingRight: 5,
        paddingLeft: 10,
        width: moderateScale(300) - 60,
        alignSelf: 'center',
        alignContent: 'center'
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
    expansion_panel__header: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 5,
        height: moderateScale(20)
    },
    expansion_icon: {
        color: '#9c88ff',
        size: 24,
        alignContent: 'center',
        alignSelf: 'center',
    },
    expansion_panel__content: {
        height: moderateScale(200),
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    expansion_panel__content_list: {
        display: "flex",
        alignSelf: "flex-start",
        paddingTop: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        overflow: 'scroll',
        flex: 1,
        height: moderateScale(200),

    }
});