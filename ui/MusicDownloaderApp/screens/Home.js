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
  const [fakeData, setFakeData] = useState();

  // get data from the fake api endpoint
  useEffect(() => {
    const getData = async () => {
      const data = [{ "song_id": "X25P7Qce", "title": "All I Want (Love That Lasts Mix)", "image": "http://c.saavncdn.com/227/All-I-Want-Love-That-Lasts-Mix--English-2020-20200521000737-150x150.jpg", "full_image": "http://c.saavncdn.com/227/All-I-Want-Love-That-Lasts-Mix--English-2020-20200521000737-500x500.jpg", "album": "All I Want (Love That Lasts Mix)", "url": null, "description": "Olivia Rodrigo \\u00b7 All I Want (Love That Lasts Mix)", "primary_artists": "Olivia Rodrigo", "singers": ["Olivia Rodrigo"], "language": "english", "encrypted_media_url": null, "duration": null, "release_date": null, "genre": null, "preview_url": null }, { "song_id": "3WbkR0EJ", "title": "All I Want", "image": "http://c.saavncdn.com/563/All-I-Want-English-2021-20211021195534-150x150.jpg", "full_image": "http://c.saavncdn.com/563/All-I-Want-English-2021-20211021195534-500x500.jpg", "album": "All I Want", "url": null, "description": "Kodaline \\u00b7 All I Want", "primary_artists": "Kodaline", "singers": ["Kodaline"], "language": "english", "encrypted_media_url": null, "duration": null, "release_date": null, "genre": null, "preview_url": null }];
      setFakeData(data);
    };
    getData();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.root}>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      ></SearchBar>

      <List
        style={styles.list_view}
        searchPhrase={searchPhrase}
        data={fakeData}
        setClicked={setClicked}
      />
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
  }
});