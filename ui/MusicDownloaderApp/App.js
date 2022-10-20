import React from "react";

import Home from './screens/Home';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Home />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2a33',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  textmain: {
    color: '#fff'
  }
});
