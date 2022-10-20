import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, KeyboardAvoidingView } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { color } from "react-native-elements/dist/helpers";


const SearchBar = (props) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <KeyboardAvoidingView
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
          placeholder="Enter song name..."
          value={props.searchPhrase}
          onChangeText={props.setSearchPhrase}
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
            props.setSearchPhrase("")
          }} />
        )}
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
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

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#42414d",
    borderRadius: 15,
    alignItems: "center"
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#42414d",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: "90%",
  },
});