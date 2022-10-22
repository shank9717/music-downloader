import React from "react";

import Home from './screens/Home';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, TextInput, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Feather, Entypo } from "@expo/vector-icons";

import Settings from './screens/Settings';
import { Snackbar } from 'react-native-paper';


export default function App() {
    const [searchPhrase, setSearchPhrase] = React.useState("");
    const [showSnackbar, setShowSnackbar] = React.useState(false);

    const Tab = createBottomTabNavigator();

    function LogoTitle() {
        return (
          <Image
            style={{ width: 30, height: 30 }}
            source={require('./assets/drawer.png')}
          />
        );
      }

    function HomePage({ navigation }) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Home 
                    showSnackbar={showSnackbar} 
                    setShowSnackbar={setShowSnackbar}
                    searchPhrase={searchPhrase}
                    setSearchPhrase={setSearchPhrase} 
                />
          </View>
        );
      }

      function SettingsPage({ navigation }) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Settings></Settings>
          </View>
        );
      }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Tab.Navigator screenOptions={{
                        tabBarActiveTintColor: '#e91e63',
                        headerStyle: { backgroundColor: '#224e73'},
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        tabBarLabelPosition: 'centre'
                    }}>
                    <Tab.Screen 
                        name="Music Downloader" 
                        component={HomePage} 
                        options={{
                            tabBarStyle: {
                                borderTopWidth: 0,
                            },
                            tabBarLabel: 'Home',
                            headerTitle: (props) => <LogoTitle {...props} />,
                            tabBarActiveBackgroundColor: '#25242b',
                            tabBarInactiveBackgroundColor: '#2b2a33',
                            tabBarShowLabel: false,
                            tabBarIcon: ({ color, size }) => (
                                <Feather name="home" color={'#fff'} size={size} />
                            )
                        }}/>
                    <Tab.Screen name="Settings" component={SettingsPage}  
                        options={{
                            tabBarStyle: {
                                borderTopWidth: 0,
                            },
                            tabBarActiveBackgroundColor: '#25242b',
                            tabBarInactiveBackgroundColor: '#2b2a33',
                            tabBarShowLabel: false,
                            tabBarLabel: 'Settings',
                            tabBarIcon: ({ color, size }) => (
                                <Feather name="settings" color={'#fff'} size={size} />
                            )
                        }}/>
                </Tab.Navigator>
            </NavigationContainer>

            <Snackbar wrapperStyle={{ bottom: 0 }} style={styles.snackbar_style} visible={showSnackbar}>
                Downloaded Song...
            </Snackbar>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b2a33',
        // alignItems: 'center',
        justifyContent: 'center',
        // padding: 10
    },
    nav_style: {
        backgroundColor: '#2b2a33',
    },
    textmain: {
        color: '#fff'
    },
    snackbar_style: {
        color: '#fff'
    }
});
