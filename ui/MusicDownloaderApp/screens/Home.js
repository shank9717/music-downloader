import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
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
  const [snackbarProperties, setSnackbarProperties] = React.useState({visible: false, text: ''});
  const [currentPlaying, setCurrentPlaying] = useState(null);

  return (
    <SafeAreaView style={styles.root}>
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
        snackbarProperties={snackbarProperties}
        setSnackbarProperties={setSnackbarProperties}
        currentPlaying={currentPlaying}
        setCurrentPlaying={setCurrentPlaying}
        style={styles.list_view}
        searchPhrase={searchPhrase}
        data={resultData}
        setClicked={setClicked}
        onStartShouldSetResponder={() => {
            setClicked(false);
        }}
      />}

      {!resultPresent && 
        <SafeAreaView style={{ alignContent: "center", alignSelf: "center", alignItems: "center" }}>
          <Text style={styles.empty_result}>Nothing to see here...</Text>
            <Image style={styles.empty_result_img} source={ require('../assets/no-results-3.png') }/>
        </SafeAreaView>
      }

      <Snackbar wrapperStyle={{ bottom: 0 }} style={styles.snackbar_style} visible={snackbarProperties.visible}>
          { snackbarProperties.text }
      </Snackbar>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
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
    marginTop: 150,
    color: '#fff',
    fontSize: 16,
    margin: 0,
    fontFamily: 'Poppins-Light'
  },
  empty_result_img: {
    width: 150,
    height: 150,
    marginTop: 10,
    resizeMode: 'stretch'
  },
  snackbar_style: {
    color: '#fff',
    backgroundColor: '#5a5c5e',
    opacity: 0.7,
    borderRadius: 9
  }
});