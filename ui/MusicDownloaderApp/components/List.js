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

const List = (props) => {
    const renderItem = ({ item }) => {
        return (
            <ScrollView  keyboardShouldPersistTaps='handled'  style={styles.song_detail_view}>
                <Item title={item.title} album={item.album} artist={item.primary_artists} full_image={item.full_image} />
                <SongOptions item={item} showSnackbar={props.showSnackbar} setShowSnackbar={props.setShowSnackbar} />
            </ScrollView>
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
        marginLeft: moderateScale(10),
        marginRight: moderateScale(10)
    },
    item: {
        color: '#fff',
        justifyContent: "flex-start",
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
        fontWeight: "bold",
        marginBottom: 5,
        textAlign: "left",
    },
    details: {
        color: '#fff',
        textAlign: "left"
    }
});