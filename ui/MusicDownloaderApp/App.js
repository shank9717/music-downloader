import React from "react";

import Home from './screens/Home';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, TextInput, View, KeyboardAvoidingView, SafeAreaView, PermissionsAndroid, Dimensions, useCallback } from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Feather, Entypo } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { moderateScale } from 'react-native-size-matters';


import Settings from './screens/Settings';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts({
        'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
        'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Italic': require('./assets/fonts/Poppins-Italic.ttf'),
    });

    const [searchPhrase, setSearchPhrase] = React.useState("");
    const onLayoutRootView = React.useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
        }, [fontsLoaded]
    );

    if (!fontsLoaded) {
        return null;
    }

    const Tab = createBottomTabNavigator();

    function LogoTitle() {
        return (
        //   <Image style={{ width: 40, height: 40 }} source={ require('./assets/main-icon-new.png') }/>
          <Text style={ styles.logoTitle }>Planck Tune - Music Downloader</Text>
        );
      }

    function HomePage({ navigation }) {
        return (
          <View onLayout={onLayoutRootView} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Home
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

    const windowWidth = Dimensions.get('window').width;
    let tabWidth = 160;

    let tabStyle = {
        borderTopWidth: 0,
        borderWidth: 0,
        width: tabWidth,
        textAlign: 'center',
        flexDirection: 'row',
        marginLeft: (windowWidth - tabWidth)/2,
        marginBottom: moderateScale(20),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 12,
        borderRadius: 12,
        backgroundColor: 'rgba(50, 51, 84, 1)',
        borderColor: 'black',
        borderWidth: 0.2,
        overflow: 'hidden',
        fontFamily: 'Inter-Black'
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Tab.Navigator 
                    screenOptions={{
                        headerStyle: { backgroundColor: '#323354'},
                        headerTintColor: '#e7e4eb',
                        headerTitleStyle: {
                            fontFamily: 'Inter-Black'
                        },
                    }}
                  >
                    <Tab.Screen 
                        name="Music Downloader" 
                        component={HomePage} 
                        options={{
                            tabBarStyle: {
                                ...tabStyle
                            },
                            tabBarLabel: 'home',
                            headerTitle: (props) => <LogoTitle {...props} />,
                            tabBarShowLabel: false,
                            tabBarLabelPosition: 'below-icon',
                            tabBarActiveTintColor: '#9c88ff',
                            tabBarInactiveTintColor: 'grey',
                            tabBarIcon: ({ focused, color, size }) => {
                                const newSize = focused ? 22 : 16;
                                return <Feather name="home" color={color} size={newSize} />;
                            }
                        }}/>
                    <Tab.Screen name="Settings" component={SettingsPage}  
                        options={{
                            tabBarStyle: {
                                ...tabStyle
                            },
                            tabBarShowLabel: false,
                            tabBarLabel: 'settings',
                            tabBarLabelPosition: 'below-icon',
                            tabBarActiveTintColor: '#9c88ff',
                            tabBarInactiveTintColor: 'grey',
                            tabBarIcon: ({ focused, color, size }) => {
                                const newSize = focused ? 22 : 16;
                                return <Feather name="settings" color={color} size={newSize} />;
                            }
                        }}/>
                </Tab.Navigator>
            </NavigationContainer>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(43, 42, 51)',
        justifyContent: 'center',
    },
    nav_style: {
        backgroundColor: 'rgb(43, 42, 51)',
    },
    textmain: {
        color: '#fff'
    },
    snackbar_style: {
        color: '#fff'
    },
    logoTitle: {
        marginTop: 5,
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: '#ffffffdd',
        
    }
});
