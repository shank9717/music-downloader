import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { color } from "react-native-elements/dist/helpers";
import Constants from 'expo-constants';
import { SafeAreaView } from "react-native";

const SearchBar = (props) => {
  
  const modifySearch = async (searchedPhrase) => {
    let headers = new Headers();

    headers.append('Access-Control-Allow-Origin', '*');
    headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const apiResponse = await fetch(
      Constants.expoConfig.extra.API_URL + '/search/' + searchedPhrase,
      {method: 'GET', headers: headers}
    );
    const data = await apiResponse.json();
    props.setResultData(data);

    if (data.length == 0) {
      props.setResultPresent(false);
    } else {
      props.setResultPresent(true);
    }
  };

  return (
    
    <SafeAreaView style={styles.container}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
        <SafeAreaView
          style={
            !props.clicked
              ? styles.searchBar__unclicked
              : styles.searchBar__clicked
          }
        >
          <Feather
            name="search"
            size={16}
            color="#fff"
            style={{ marginLeft: 3 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Search for a song..."
            value={props.searchPhrase}
            onChangeText={
              (searchedPhrase) => {
                props.setSearchPhrase(searchedPhrase);
                if (searchedPhrase === '') {
                  props.setResultData([]);
                  props.setResultPresent(false);
                } else {
                  modifySearch(searchedPhrase);
                }
              }
            }
            placeholderTextColor='#808c8c'
            cursorColor={'#fff'}
            color='#fff'
            fontSize='10'
            onFocus={() => {
              props.setClicked(true);
            }}
          />

          {props.clicked && (
            <Entypo name="cross" size={16} color="#fff" style={{ padding: 1 }} onPress={() => {
              props.setSearchPhrase("");
              props.setResultPresent(false);
            }} />
          )}
        </SafeAreaView>
      {/* </TouchableWithoutFeedback> */}
    </SafeAreaView>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    elevation: 10,
    fontFamily: 'Poppins-Light'
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#42414d",
    borderRadius: 15,
    alignItems: "center",
    fontFamily: 'Poppins-Light'
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#42414d",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    fontFamily: 'Poppins-Light'
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: "90%",
    color: '#fff',
    fontFamily: 'Poppins-Light'
  },
});