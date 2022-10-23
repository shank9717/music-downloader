import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import List from "../components/List";
import SearchBar from "../components/Searchbar";
import { Snackbar } from 'react-native-paper';

const Home = (props) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [resultPresent, setResultPresent] = useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  return (
    <KeyboardAvoidingView style={styles.root}>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
        resultPresent={resultPresent}
        setResultPresent={setResultPresent}
        resultData={resultData}
        setResultData={setResultData}
      ></SearchBar>

      {resultPresent && <List
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        style={styles.list_view}
        searchPhrase={searchPhrase}
        data={resultData}
        setClicked={setClicked}
        onStartShouldSetResponder={() => {
            setClicked(false);
        }}
      />}

      {!resultPresent && <Text style={styles.empty_result}>Nothing to see here...</Text>}

      <Snackbar wrapperStyle={{ bottom: 0 }} style={styles.snackbar_style} visible={showSnackbar}>
          Downloaded Song...
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    // justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: '#2b2a33',
    padding: 10,
    width: '100%'
  },
  list_view: {
    margin: 0
  },
  empty_result: {
    marginTop: 300,
    color: '#fff',
    margin: 0
  },
  snackbar_style: {
    color: '#fff',
    backgroundColor: '#5a5c5e',
    opacity: 0.7,
    borderRadius: 9
  }
});