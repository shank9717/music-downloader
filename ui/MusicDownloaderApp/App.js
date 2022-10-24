import React from "react";

import Home from './screens/Home';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, TextInput, View, KeyboardAvoidingView, SafeAreaView, PermissionsAndroid, Dimensions } from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Feather, Entypo } from "@expo/vector-icons";
// import {
//   useFonts,
//   OpenSans_300Light,
//   OpenSans_400Regular,
//   OpenSans_500Medium,
//   OpenSans_600SemiBold,
//   OpenSans_700Bold,
//   OpenSans_800ExtraBold,
//   OpenSans_300Light_Italic,
//   OpenSans_400Regular_Italic,
//   OpenSans_500Medium_Italic,
//   OpenSans_600SemiBold_Italic,
//   OpenSans_700Bold_Italic,
//   OpenSans_800ExtraBold_Italic,
// } from '@expo-google-fonts/open-sans';

import Settings from './screens/Settings';

// let [fontsLoaded] = useFonts({
//   OpenSans_300Light,
//   OpenSans_400Regular,
//   OpenSans_500Medium,
//   OpenSans_600SemiBold,
//   OpenSans_700Bold,
//   OpenSans_800ExtraBold,
//   OpenSans_300Light_Italic,
//   OpenSans_400Regular_Italic,
//   OpenSans_500Medium_Italic,
//   OpenSans_600SemiBold_Italic,
//   OpenSans_700Bold_Italic,
//   OpenSans_800ExtraBold_Italic,
// });

export async function GetAllPermissions() {
    try {
      if (Platform.OS === "android") {
        const userResponse = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ]);
        return userResponse;
      }
    } catch (err) {
        console.warn(err);
    }
    return null;
  }

export default function App() {
    // Text.defaultProps = Text.defaultProps || {};
    // Text.defaultProps.style =  { fontFamily: 'OpenSans_400Regular' };

    const [searchPhrase, setSearchPhrase] = React.useState("");
    const Tab = createBottomTabNavigator();

    function LogoTitle() {
        return (
          <Image style={{ width: 40, height: 40 }} source={ require('./assets/main-icon.png') }/>
        );
      }

    function HomePage({ navigation }) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
    let tabWidth = 250;

    let tabStyle = {
        borderTopWidth: 0,
        borderWidth: 0,
        width: tabWidth,
        textAlign: 'center',
        flexDirection: 'row',
        marginLeft: (windowWidth - tabWidth)/2,
        marginBottom: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 12,
        borderRadius: 12,
        borderColor: 'transparent',
        overflow: 'hidden',
    };

    return (
        GetAllPermissions() && <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Tab.Navigator 
                    screenOptions={{
                        tabBarActiveTintColor: 'white',
                        headerStyle: { backgroundColor: '#224e73'},
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
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
                            tabBarActiveBackgroundColor: '#2b2a33',
                            tabBarInactiveBackgroundColor: '#2b2a33',
                            tabBarShowLabel: false,
                            tabBarLabelPosition: 'below-icon',
                            tabBarIcon: ({ color, size }) => (
                                <Feather name="home" color={color} size={size} />
                            )
                        }}/>
                    <Tab.Screen name="Settings" component={SettingsPage}  
                        options={{
                            tabBarStyle: {
                                ...tabStyle
                            },
                            tabBarActiveBackgroundColor: '#2b2a33',
                            tabBarInactiveBackgroundColor: '#2b2a33',
                            tabBarShowLabel: false,
                            tabBarLabel: 'settings',
                            tabBarLabelPosition: 'below-icon',
                            tabBarIcon: ({ color, size }) => (
                                <Feather name="settings" color={color} size={size} />
                            )
                        }}/>
                </Tab.Navigator>
            </NavigationContainer>

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
