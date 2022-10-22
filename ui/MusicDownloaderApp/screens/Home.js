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

const Home = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [resultPresent, setResultPresent] = useState(false);

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
        style={styles.list_view}
        searchPhrase={searchPhrase}
        data={resultData}
        setClicked={setClicked}
      />}

      {!resultPresent && <Text style={styles.empty_result}>Nothing to see here...</Text>}
    </KeyboardAvoidingView>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  list_view: {
    margin: 0
  },
  empty_result: {
    color: '#fff',
    margin: 0
  }
});