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
                            <Text style={{fontSize: 20}} style={styles.label}>{title}</Text>
                                {subTitle && (
                                    <Text style={{fontSize: 14, opacity: 0.5, paddingTop: 10, color: '#fff'}} >
                                    {subTitle}
                                    </Text>
                                )}
                        </View>

                        <View style={{height: 0.2, marginTop: 10, backgroundColor: 'grey'}} />
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
        color: '#fff',
        fontSize: 18,
    }
});