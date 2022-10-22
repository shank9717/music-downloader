import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  View
} from "react-native";

import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
  } from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setResult = (pick) => {
    const pickedDirectory = pick.uri;
    console.log(pickedDirectory);
};

const handleError = (err) => {
    console.error(err);
};

const settingsOptions = [
    {
        title: 'Download path', 
        subTitle: 'Setup the path where you want to download your files to', 
        onPress: async () => {
            DocumentPicker.pickDirectory().then(setResult).catch(handleError);
        }
    }
];

const Settings = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {settingsOptions.map(({title, subTitle, onPress}, index) => (
                    <TouchableOpacity key={title} onPress={onPress}>
                        <View>
                            <Text style={{fontSize: 17}} style={styles.label}>{title}</Text>
                                {subTitle && (
                                    <Text style={{fontSize: 14, opacity: 0.5, paddingTop: 5}}  style={styles.label}>
                                    {subTitle}
                                    </Text>
                                )}
                        </View>

                        <View style={{height: 0.5, backgroundColor: 'grey'}} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Settings;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b2a33',
        padding: 30,
        color: 'white',
        width: '100%',
    },
    label: {
        color: '#fff'
    }
});