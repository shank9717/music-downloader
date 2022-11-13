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

const NonSongItem = ({ title, full_image, songs, type, setModalVisible }) => {
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
                <Text style={styles.subLabel}>{ type }</Text>
            </View>
            
        </KeyboardAvoidingView>
    )
};

const ExpansionPanel = ({type, artistAlbumItem, props}) => {
    const [expanded, setExpanded] = useState(false);

    const renderItem = ( songItem, artistAlbumItem ) => {
        return (
            <View key={ songItem.song_id } keyboardShouldPersistTaps='handled'  style={
                    {
                        ...styles.song_detail_view,
                        width: moderateScale(300 - 20),
                        marginLeft: moderateScale(10),
                        marginRight: moderateScale(10),
                        backgroundColor: 'rgba(0,0,0,0.1)'
                    }
                }>
                <SongItem 
                    title={songItem.title} 
                    album={songItem.album ? songItem.album : ''} 
                    artist={songItem.primary_artists ? songItem.primary_artists : ''} 
                    full_image={songItem.full_image}
                    setModalVisible={songItem.setModalVisible} />
                <SongOptions 
                    item={songItem} 
                    parentItem={artistAlbumItem}
                    currentPlaying={props.currentPlaying}
                    setCurrentPlaying={props.setCurrentPlaying}
                    snackbarProperties={props.snackbarProperties} 
                    setSnackbarProperties={props.setSnackbarProperties} />
            </View>
        );
    };
        
    return (
        <View style={{ flex: 1, overflow: 'scroll' }}>
            <View style={styles.expansion_panel__header}>
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
            </View>
            { expanded &&
                <ScrollView 
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    style={styles.expansion_panel__content_list}>
                    {
                        artistAlbumItem.songs.map((song) => {
                            return renderItem(song, artistAlbumItem);
                        })
                    }
                </ScrollView> 
            }
        </View>
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
                        parentItem={null}
                        currentPlaying={props.currentPlaying}
                        setCurrentPlaying={props.setCurrentPlaying}
                        snackbarProperties={props.snackbarProperties} 
                        setSnackbarProperties={props.setSnackbarProperties} />
                </SafeAreaView>
            );
        }
        {
            return (
                <View 
                    keyboardShouldPersistTaps='always'  style={styles.song_detail_view}>
                    <NonSongItem 
                        title={ item.name || item.title } 
                        full_image={item.full_image}
                        songs={item.songs}
                        type={ item.type }
                        setModalVisible={item.setModalVisible} />
                    <ExpansionPanel
                        type={ item.type }
                        artistAlbumItem={item}
                        props={props}
                    ></ExpansionPanel>
                </View>
            );
        }
    };

    useEffect(() => {
        if (props.data) {
            let modifiedData = [];
            let tempData: object[] = props.data.map((item) => {
                if (item.songs) {
                    item.songs = item.songs.slice(0, 10);
                    for (let songItem of item.songs) {
                        songItem.setModalVisible = setModalVisible;
                    }
                }
                item.setModalVisible = setModalVisible;
                return item;
            }).sort((a, b) => {
                if (a.is_top_result) {
                    return -1;
                } 
                if (b.is_top_result) {
                    return 1;
                } 
                if (a.song_id) {
                    return -1;
                } 
                if (b.song_id) {
                    return 1;
                } 
                return 0;
            });
            setSongList(tempData);
        }
    }, [props.data]);

    return (
        <View keyboardShouldPersistTaps='always' style={{flex: 1, overflow: 'scroll'}}>

            <FlatList
                nestedScrollEnabled={true}
                contentContainerStyle={styles.list_container}
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
        </View>
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
        flex: 1,
        width: moderateScale(320),
    },
    list_container: {
        overflow: 'scroll'
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
        height: moderateScale(22)
    },
    expansion_icon: {
        color: '#9c88ff',
        size: 24,
        alignContent: 'center',
        alignSelf: 'center',
    },
    expansion_panel__content: {
        maxHeight: moderateScale(300),
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    expansion_panel__content_list: {
        flexDirection: "column",
        paddingTop: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        overflow: 'scroll',
        maxHeight: moderateScale(300),
        marginBottom: 10,
    },
    subLabel: {
        color: 'white',
        fontFamily: 'Poppins-Light',
        fontSize: 12
    }
});