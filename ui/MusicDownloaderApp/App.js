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

// export async function GetAllPermissions() {
//     try {
//       if (Platform.OS === "android") {
//         const userResponse = await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
//         ]);
//         return userResponse;
//       }
//     } catch (err) {
//         console.warn(err);
//     }
//     return null;
//   }

export default function App() {
    // Text.defaultProps = Text.defaultProps || {};
    // Text.defaultProps.style =  { fontFamily: 'OpenSans_400Regular' };

    const [searchPhrase, setSearchPhrase] = React.useState("");
    const Tab = createBottomTabNavigator();

    function LogoTitle() {
        return (
          <Image style={{ width: 40, height: 40 }} source={ require('./assets/main-icon-new.png') }/>
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
    let tabWidth = 160;

    let tabStyle = {
        borderTopWidth: 0,
        borderWidth: 0,
        width: tabWidth,
        textAlign: 'center',
        flexDirection: 'row',
        marginLeft: (windowWidth - tabWidth)/2,
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 12,
        borderRadius: 12,
        backgroundColor: 'rgba(50, 51, 84, 1)',
        borderColor: 'black',
        borderWidth: 0.2,
        overflow: 'hidden',
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
    }
});
