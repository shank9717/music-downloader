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

    // let data = [
    //   {
    //     "album_id": "26107098",
    //     "token_id": "bNFBWXMug2g_",
    //     "title": "MONTERO (Call Me By Your Name)",
    //     "image": "http://c.saavncdn.com/012/MONTERO-Call-Me-By-Your-Name--English-2021-20210322233947-150x150.jpg",
    //     "full_image": "http://c.saavncdn.com/012/MONTERO-Call-Me-By-Your-Name--English-2021-20210322233947-500x500.jpg",
    //     "album": null,
    //     "url": "https://www.jiosaavn.com/album/montero-call-me-by-your-name/bNFBWXMug2g_",
    //     "description": "2021 · English Album · Lil Nas X",
    //     "artist": "Lil Nas X",
    //     "language": null,
    //     "year": 2021,
    //     "genre": null,
    //     "preview_url": null,
    //     "song_pids": [
    //       "pnzAmmBZ"
    //     ],
    //     "songs": [
    //       {
    //         "song_id": "pnzAmmBZ",
    //         "title": "MONTERO (Call Me By Your Name)",
    //         "image": "http://c.saavncdn.com/012/MONTERO-Call-Me-By-Your-Name--English-2021-20210322233947-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/012/MONTERO-Call-Me-By-Your-Name--English-2021-20210322233947-500x500.jpg",
    //         "album": "MONTERO (Call Me By Your Name)",
    //         "url": "https://www.jiosaavn.com/song/montero-call-me-by-your-name/AAYRcBlddWk",
    //         "description": "MONTERO (Call Me By Your Name)",
    //         "primary_artists": "Lil Nas X",
    //         "singers": [
    //           "Montero Hill",
    //           "Denzel Baptiste",
    //           "Omer Fedi",
    //           "David Biral",
    //           "Roy Lenzo",
    //           "Lil Nas X",
    //           "Montero Hill",
    //           "Denzel Baptiste",
    //           "Omer Fedi",
    //           "David Biral",
    //           "Roy Lenzo"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2021-03-26T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       }
    //     ]
    //   },
    //   {
    //     "album_id": "29664028",
    //     "token_id": "BxTljgi93gI_",
    //     "title": "MONTERO",
    //     "image": "http://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-150x150.jpg",
    //     "full_image": "http://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-500x500.jpg",
    //     "album": null,
    //     "url": "https://www.jiosaavn.com/album/montero/BxTljgi93gI_",
    //     "description": "2021 · English Album · Lil Nas X",
    //     "artist": "Lil Nas X",
    //     "language": null,
    //     "year": 2021,
    //     "genre": null,
    //     "preview_url": null,
    //     "song_pids": [
    //       "IzToLhDW",
    //       "jIwZxdZI",
    //       "bwopJe3Y",
    //       "jWqiFIZ7",
    //       "FwjeAqRO",
    //       "X7pDN6A4",
    //       "8YHXmVgT",
    //       "ikLSNvET",
    //       "7e4d6IG3",
    //       "lCPPi6_f",
    //       "tdGK40RV",
    //       "6paa1fdN",
    //       "qvg6m_Xg",
    //       "841boTqw",
    //       "kBIT4G57"
    //     ],
    //     "songs": [
    //       {
    //         "song_id": "IzToLhDW",
    //         "title": "MONTERO (Call Me By Your Name)",
    //         "image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-150x150.jpg",
    //         "full_image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-500x500.jpg",
    //         "album": "MONTERO",
    //         "url": "https://www.jiosaavn.com/song/montero-call-me-by-your-name/ORI-XjhYc2Q",
    //         "description": "MONTERO (Call Me By Your Name)",
    //         "primary_artists": "Lil Nas X",
    //         "singers": [
    //           "Montero Hill",
    //           "Denzel Baptiste",
    //           "Omer Fedi",
    //           "David Biral",
    //           "Roy Lenzo",
    //           "Lil Nas X",
    //           "Montero Hill",
    //           "Denzel Baptiste",
    //           "Omer Fedi",
    //           "David Biral",
    //           "Roy Lenzo"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2021-09-17T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "jIwZxdZI",
    //         "title": "DEAD RIGHT NOW",
    //         "image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-150x150.jpg",
    //         "full_image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-500x500.jpg",
    //         "album": "MONTERO",
    //         "url": "https://www.jiosaavn.com/song/dead-right-now/GiEcawxUbXo",
    //         "description": "DEAD RIGHT NOW",
    //         "primary_artists": "Lil Nas X",
    //         "singers": [
    //           "Montero Hill",
    //           "Noel Goring",
    //           "Denzel Baptiste",
    //           "David Biral",
    //           "Jasper Harris",
    //           "Thomas James Levesque",
    //           "R.L. Stafford",
    //           "Lil Nas X",
    //           "Montero Hill",
    //           "Noel Goring",
    //           "Denzel Baptiste",
    //           "David Biral",
    //           "Jasper Harris",
    //           "Thomas James Levesque",
    //           "R.L. Stafford"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2021-09-17T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "bwopJe3Y",
    //         "title": "INDUSTRY BABY",
    //         "image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-150x150.jpg",
    //         "full_image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-500x500.jpg",
    //         "album": "MONTERO",
    //         "url": "https://www.jiosaavn.com/song/industry-baby/Eh8EQT5VBGo",
    //         "description": "INDUSTRY BABY",
    //         "primary_artists": "Lil Nas X",
    //         "singers": [
    //           "Jack Harlow",
    //           "Montero Hill",
    //           "David Biral",
    //           "Denzel Baptiste",
    //           "Nick Lee",
    //           "Raul Cubina",
    //           "Kanye West",
    //           "Mark Williams",
    //           "Roy Lenzo",
    //           "Lil Nas X",
    //           "Jack Harlow",
    //           "Lil Nas X &amp; Jack Harlow",
    //           "Jack Harlow",
    //           "Montero Hill",
    //           "David Biral",
    //           "Denzel Baptiste",
    //           "Nick Lee",
    //           "Raul Cubina",
    //           "Kanye West",
    //           "Mark Williams",
    //           "Roy Lenzo"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2021-09-17T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "jWqiFIZ7",
    //         "title": "THATS WHAT I WANT",
    //         "image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-150x150.jpg",
    //         "full_image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-500x500.jpg",
    //         "album": "MONTERO",
    //         "url": "https://www.jiosaavn.com/song/thats-what-i-want/Gj8aWDJ5bQQ",
    //         "description": "THATS WHAT I WANT",
    //         "primary_artists": "Lil Nas X",
    //         "singers": [
    //           "Montero Hill",
    //           "Omer Fedi",
    //           "Blake Slatkin",
    //           "Ryan Tedder",
    //           "Keegan Bach",
    //           "Lil Nas X",
    //           "Montero Hill",
    //           "Omer Fedi",
    //           "Blake Slatkin",
    //           "Ryan Tedder",
    //           "Keegan Bach"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2021-09-17T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "FwjeAqRO",
    //         "title": "THE ART OF REALIZATION",
    //         "image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-150x150.jpg",
    //         "full_image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-500x500.jpg",
    //         "album": "MONTERO",
    //         "url": "https://www.jiosaavn.com/song/the-art-of-realization/Nh8BVDVBZXw",
    //         "description": "THE ART OF REALIZATION",
    //         "primary_artists": "Lil Nas X",
    //         "singers": [
    //           "Montero Hill",
    //           "Denzel Baptiste",
    //           "David Biral",
    //           "Roy Lenzo",
    //           "Lil Nas X"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2021-09-17T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "X7pDN6A4",
    //         "title": "SCOOP",
    //         "image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-150x150.jpg",
    //         "full_image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-500x500.jpg",
    //         "album": "MONTERO",
    //         "url": "https://www.jiosaavn.com/song/scoop/KF8bdToGdgc",
    //         "description": "SCOOP",
    //         "primary_artists": "Lil Nas X",
    //         "singers": [
    //           "Montero Hill",
    //           "David Biral",
    //           "Amala Zandile Dlamini",
    //           "Denzel Baptiste",
    //           "Roy Lenzo",
    //           "Lil Nas X",
    //           "Doja Cat",
    //           "Montero Hill",
    //           "David Biral",
    //           "Amala Zandile Dlamini",
    //           "Denzel Baptiste",
    //           "Roy Lenzo"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2021-09-17T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "8YHXmVgT",
    //         "title": "ONE OF ME",
    //         "image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-150x150.jpg",
    //         "full_image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-500x500.jpg",
    //         "album": "MONTERO",
    //         "url": "https://www.jiosaavn.com/song/one-of-me/SDEjaRlmUGc",
    //         "description": "ONE OF ME",
    //         "primary_artists": "Lil Nas X",
    //         "singers": [
    //           "Montero Hill",
    //           "Jasper Sheff",
    //           "John Cunningham",
    //           "Ilsey Juber",
    //           "Lil Nas X",
    //           "Elton John",
    //           "Montero Hill",
    //           "Jasper Sheff",
    //           "John Cunningham",
    //           "Ilsey Juber"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2021-09-17T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "ikLSNvET",
    //         "title": "LOST IN THE CITADEL",
    //         "image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-150x150.jpg",
    //         "full_image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-500x500.jpg",
    //         "album": "MONTERO",
    //         "url": "https://www.jiosaavn.com/song/lost-in-the-citadel/GQMnYjpGcmc",
    //         "description": "LOST IN THE CITADEL",
    //         "primary_artists": "Lil Nas X",
    //         "singers": [
    //           "Montero Hill",
    //           "John Cunningham",
    //           "Lil Nas X",
    //           "Montero Hill",
    //           "John Cunningham"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2021-09-17T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "7e4d6IG3",
    //         "title": "DOLLA SIGN SLIME",
    //         "image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-150x150.jpg",
    //         "full_image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-500x500.jpg",
    //         "album": "MONTERO",
    //         "url": "https://www.jiosaavn.com/song/dolla-sign-slime/Rw1fVUJ5cAA",
    //         "description": "DOLLA SIGN SLIME",
    //         "primary_artists": "Lil Nas X",
    //         "singers": [
    //           "Montero Hill",
    //           "David Biral",
    //           "Denzel Baptiste",
    //           "Nick Lee",
    //           "Megan Pete",
    //           "Lil Nas X",
    //           "Megan Thee Stallion",
    //           "Montero Hill",
    //           "David Biral",
    //           "Denzel Baptiste",
    //           "Nick Lee",
    //           "Megan Pete"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2021-09-17T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "lCPPi6_f",
    //         "title": "TALES OF DOMINICA",
    //         "image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-150x150.jpg",
    //         "full_image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-500x500.jpg",
    //         "album": "MONTERO",
    //         "url": "https://www.jiosaavn.com/song/tales-of-dominica/HCs7YR0GaFU",
    //         "description": "TALES OF DOMINICA",
    //         "primary_artists": "Lil Nas X",
    //         "singers": [
    //           "Montero Hill",
    //           "Denzel Baptiste",
    //           "David Biral",
    //           "Omer Fedi",
    //           "Roy Lenzo",
    //           "Lil Nas X",
    //           "Montero Hill",
    //           "Denzel Baptiste",
    //           "David Biral",
    //           "Omer Fedi",
    //           "Roy Lenzo"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2021-09-17T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "tdGK40RV",
    //         "title": "SUN GOES DOWN",
    //         "image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-150x150.jpg",
    //         "full_image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-500x500.jpg",
    //         "album": "MONTERO",
    //         "url": "https://www.jiosaavn.com/song/sun-goes-down/BAwsekAAZWU",
    //         "description": "SUN GOES DOWN",
    //         "primary_artists": "Lil Nas X",
    //         "singers": [
    //           "Montero Hill",
    //           "Denzel Baptiste",
    //           "David Biral",
    //           "Omer Fedi",
    //           "Roy Lenzo",
    //           "Andrew Luce",
    //           "Michael Olmo",
    //           "Keegan Bach",
    //           "Blake Slatkin",
    //           "Lil Nas X",
    //           "Montero Hill",
    //           "Denzel Baptiste",
    //           "David Biral",
    //           "Omer Fedi",
    //           "Roy Lenzo",
    //           "Andrew Luce",
    //           "Michael Olmo",
    //           "Keegan Bach",
    //           "Blake Slatkin"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2021-09-17T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "6paa1fdN",
    //         "title": "VOID",
    //         "image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-150x150.jpg",
    //         "full_image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-500x500.jpg",
    //         "album": "MONTERO",
    //         "url": "https://www.jiosaavn.com/song/void/RhgKUEVWU30",
    //         "description": "VOID",
    //         "primary_artists": "Lil Nas X",
    //         "singers": [
    //           "Montero Hill",
    //           "John Cunningham",
    //           "Carter Lang",
    //           "Lil Nas X",
    //           "Montero Hill",
    //           "John Cunningham",
    //           "Carter Lang"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2021-09-17T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "qvg6m_Xg",
    //         "title": "DONT WANT IT",
    //         "image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-150x150.jpg",
    //         "full_image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-500x500.jpg",
    //         "album": "MONTERO",
    //         "url": "https://www.jiosaavn.com/song/dont-want-it/AR4MBxlvb1Q",
    //         "description": "DONT WANT IT",
    //         "primary_artists": "Lil Nas X",
    //         "singers": [
    //           "Montero Hill",
    //           "Denzel Baptiste",
    //           "David Biral",
    //           "Nicholas Mira",
    //           "Dorien Theus",
    //           "Dylan Wiggins",
    //           "Jaden Wiggins",
    //           "Martin Rodrigues",
    //           "Lil Nas X",
    //           "Montero Hill",
    //           "Denzel Baptiste",
    //           "David Biral",
    //           "Nicholas Mira",
    //           "Dorien Theus",
    //           "Dylan Wiggins",
    //           "Jaden Wiggins",
    //           "Martin Rodrigues"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2021-09-17T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "841boTqw",
    //         "title": "LIFE AFTER SALEM",
    //         "image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-150x150.jpg",
    //         "full_image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-500x500.jpg",
    //         "album": "MONTERO",
    //         "url": "https://www.jiosaavn.com/song/life-after-salem/SFxaUxtkRkQ",
    //         "description": "LIFE AFTER SALEM",
    //         "primary_artists": "Lil Nas X",
    //         "singers": [
    //           "Montero Hill",
    //           "Jasper Sheff",
    //           "Carter Lang",
    //           "John Cunningham",
    //           "Lil Nas X",
    //           "Montero Hill",
    //           "Jasper Sheff",
    //           "Carter Lang",
    //           "John Cunningham"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2021-09-17T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "kBIT4G57",
    //         "title": "AM I DREAMING",
    //         "image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-150x150.jpg",
    //         "full_image": "https://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-500x500.jpg",
    //         "album": "MONTERO",
    //         "url": "https://www.jiosaavn.com/song/am-i-dreaming/GyoiZUB3AgQ",
    //         "description": "AM I DREAMING",
    //         "primary_artists": "Lil Nas X",
    //         "singers": [
    //           "Montero Hill",
    //           "Denzel Baptiste",
    //           "William K. Ward",
    //           "David Biral",
    //           "Omer Fedi",
    //           "Miley Cyrus",
    //           "Vincent Goodyer",
    //           "Lil Nas X",
    //           "Miley Cyrus",
    //           "Montero Hill",
    //           "Denzel Baptiste",
    //           "William K. Ward",
    //           "David Biral",
    //           "Omer Fedi",
    //           "Miley Cyrus",
    //           "Vincent Goodyer"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2021-09-17T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       }
    //     ]
    //   },
    //   {
    //     "album_id": "18312356",
    //     "token_id": "4p9kGLWG5iE_",
    //     "title": "Montu Pilot",
    //     "image": "http://c.saavncdn.com/920/Montu-Pilot-Bengali-2019-20210210110908-150x150.jpg",
    //     "full_image": "http://c.saavncdn.com/920/Montu-Pilot-Bengali-2019-20210210110908-500x500.jpg",
    //     "album": null,
    //     "url": "https://www.jiosaavn.com/album/montu-pilot/4p9kGLWG5iE_",
    //     "description": "2019 · Bengali Album · Saurav Das, Ujjaini Mukherjee",
    //     "artist": "Saurav Das, Ujjaini Mukherjee",
    //     "language": null,
    //     "year": 2019,
    //     "genre": null,
    //     "preview_url": null,
    //     "song_pids": [
    //       "rBKxasK8"
    //     ],
    //     "songs": [
    //       {
    //         "song_id": "rBKxasK8",
    //         "title": "Ami Montu Pailot",
    //         "image": "http://c.saavncdn.com/920/Montu-Pilot-Bengali-2019-20210210110908-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/920/Montu-Pilot-Bengali-2019-20210210110908-500x500.jpg",
    //         "album": "Montu Pilot",
    //         "url": "https://www.jiosaavn.com/song/ami-montu-pailot/AiogSRVDfAs",
    //         "description": "Ami Montu Pailot",
    //         "primary_artists": "Ujjaini Mukherjee",
    //         "singers": [
    //           "Saurav Das",
    //           "Kuntal De",
    //           "Ujjaini Mukherjee",
    //           "Saurav Das",
    //           "Debaloy",
    //           "Soumit"
    //         ],
    //         "language": "bengali",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2019-12-09T00:00:00",
    //         "genre": null,
    //         "preview_url": "https://jiotunepreview.jio.com/content/Converted/010910091027990.mp3"
    //       }
    //     ]
    //   },
    //   {
    //     "song_id": "pnzAmmBZ",
    //     "title": "MONTERO (Call Me By Your Name)",
    //     "image": "http://c.saavncdn.com/012/MONTERO-Call-Me-By-Your-Name--English-2021-20210322233947-150x150.jpg",
    //     "full_image": "http://c.saavncdn.com/012/MONTERO-Call-Me-By-Your-Name--English-2021-20210322233947-500x500.jpg",
    //     "album": "MONTERO (Call Me By Your Name)",
    //     "url": "https://www.jiosaavn.com/song/montero-call-me-by-your-name/AAYRcBlddWk",
    //     "description": "Lil Nas X · MONTERO (Call Me By Your Name)",
    //     "primary_artists": "Lil Nas X",
    //     "singers": [
    //       "Lil Nas X"
    //     ],
    //     "language": "english",
    //     "encrypted_media_url": null,
    //     "duration": null,
    //     "release_date": null,
    //     "genre": null,
    //     "preview_url": null
    //   },
    //   {
    //     "song_id": "0VuE1TTJ",
    //     "title": "Monta Re",
    //     "image": "http://c.saavncdn.com/048/Lootera-2013-150x150.jpg",
    //     "full_image": "http://c.saavncdn.com/048/Lootera-2013-500x500.jpg",
    //     "album": "Lootera",
    //     "url": "https://www.jiosaavn.com/song/monta-re/QD4edEVkY3k",
    //     "description": "Lootera · Amit Trivedi, Swanand Kirkire, Amitabh Bhattacharya",
    //     "primary_artists": "Amit Trivedi, Swanand Kirkire, Amitabh Bhattacharya",
    //     "singers": [
    //       "Swanand Kirkire",
    //       "Amitabh Bhattacharya"
    //     ],
    //     "language": "hindi",
    //     "encrypted_media_url": null,
    //     "duration": null,
    //     "release_date": null,
    //     "genre": null,
    //     "preview_url": "https://jiotunepreview.jio.com/content/Converted/010910090353866.mp3"
    //   },
    //   {
    //     "song_id": "IzToLhDW",
    //     "title": "MONTERO (Call Me By Your Name)",
    //     "image": "http://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-150x150.jpg",
    //     "full_image": "http://c.saavncdn.com/440/MONTERO-English-2021-20210914233101-500x500.jpg",
    //     "album": "MONTERO",
    //     "url": "https://www.jiosaavn.com/song/montero-call-me-by-your-name/ORI-XjhYc2Q",
    //     "description": "Lil Nas X · MONTERO",
    //     "primary_artists": "Lil Nas X",
    //     "singers": [
    //       "Lil Nas X"
    //     ],
    //     "language": "english",
    //     "encrypted_media_url": null,
    //     "duration": null,
    //     "release_date": null,
    //     "genre": null,
    //     "preview_url": null
    //   }
    // ];
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