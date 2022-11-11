import React, { useEffect } from "react";
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
    //     "artist_id": "744457",
    //     "token_id": "X7WbuItkvYk_",
    //     "name": "Logic",
    //     "image": "http://c.saavncdn.com/artists/Logic_001_20200822051442_150x150.jpg",
    //     "full_image": "http://c.saavncdn.com/artists/Logic_001_20200822051442_150x150.jpg",
    //     "url": "https://www.jiosaavn.com/artist/logic/X7WbuItkvYk_",
    //     "description": "Logic",
    //     "songs": [
    //       {
    //         "song_id": "nuxmeh6Q",
    //         "title": "1-800-273-8255",
    //         "image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-500x500.jpg",
    //         "album": "Everybody",
    //         "url": "https://www.jiosaavn.com/song/1-800-273-8255/Hh0TXBFYAWI",
    //         "description": "1-800-273-8255",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Dylan Wiggins",
    //           "Arjun Ivatury",
    //           "Alessia Caracciolo",
    //           "Khalid Robinson",
    //           "Andrew Taggart",
    //           "Sir Robert Bryson Hall II",
    //           "Logic",
    //           "Dylan Wiggins",
    //           "Arjun Ivatury",
    //           "Alessia Caracciolo",
    //           "Khalid Robinson",
    //           "Andrew Taggart",
    //           "Sir Robert Bryson Hall II"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": "https://jiotunepreview.jio.com/content/Converted/010912291568585.mp3"
    //       },
    //       {
    //         "song_id": "C2qFBxhC",
    //         "title": "Everyday",
    //         "image": "http://c.saavncdn.com/879/Everyday-English-2018-20180302041506-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/879/Everyday-English-2018-20180302041506-500x500.jpg",
    //         "album": "Everyday",
    //         "url": "https://www.jiosaavn.com/song/everyday/M1oadzZIX3A",
    //         "description": "Everyday",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Marshmello",
    //           "Sir Robert Bryson Hall II",
    //           "Logic",
    //           "Marshmello",
    //           "Marshmello",
    //           "Sir Robert Bryson Hall II"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "NyZ5QxmL",
    //         "title": "Homicide",
    //         "image": "http://c.saavncdn.com/898/Confessions-of-a-Dangerous-Mind-English-2019-20190707230505-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/898/Confessions-of-a-Dangerous-Mind-English-2019-20190707230505-500x500.jpg",
    //         "album": "Confessions of a Dangerous Mind",
    //         "url": "https://www.jiosaavn.com/song/homicide/PhExBCVIWn8",
    //         "description": "Homicide",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Sir Robert Bryson Hall II",
    //           "Marshall Mathers",
    //           "Jeremy Alexander Uribe",
    //           "Dillan Beau Bailard",
    //           "Donnell Stephens III",
    //           "Tim Schoegje",
    //           "Luis Resto",
    //           "Logic",
    //           "Sir Robert Bryson Hall II",
    //           "Marshall Mathers",
    //           "Jeremy Alexander Uribe",
    //           "Dillan Beau Bailard",
    //           "Donnell Stephens III",
    //           "Tim Schoegje",
    //           "Luis Resto"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "qMCc1rcI",
    //         "title": "1-800-273-8255",
    //         "image": "http://c.saavncdn.com/950/1-800-273-8255-English-2017-20171012000905-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/950/1-800-273-8255-English-2017-20171012000905-500x500.jpg",
    //         "album": "1-800-273-8255",
    //         "url": "https://www.jiosaavn.com/song/1-800-273-8255/ASUoUkVCVHo",
    //         "description": "1-800-273-8255",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Logic",
    //           "Juanes",
    //           "Alessia Cara",
    //           "Khalid"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "sIrLrycj",
    //         "title": "100 Miles and Running",
    //         "image": "http://c.saavncdn.com/424/YSIV-English-2018-20180927233018-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/424/YSIV-English-2018-20180927233018-500x500.jpg",
    //         "album": "YSIV",
    //         "url": "https://www.jiosaavn.com/song/100-miles-and-running/AyEZfQZJVFk",
    //         "description": "100 Miles and Running",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Olubowale Akintimehin",
    //           "John Dombek Lindahl",
    //           "Jeremiah Lordan",
    //           "Logic",
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Olubowale Akintimehin",
    //           "John Dombek Lindahl",
    //           "Jeremiah Lordan"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "JiTvwaX_",
    //         "title": "44 More",
    //         "image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-500x500.jpg",
    //         "album": "Bobby Tarantino II",
    //         "url": "https://www.jiosaavn.com/song/44-more/OgE-RwNRb2w",
    //         "description": "44 More",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Robert Hall",
    //           "Arjun Ivatury",
    //           "Joshua Luellen",
    //           "Nayvadius Wilburn",
    //           "Eduardo Earle",
    //           "Ramon Ibanga Jr.",
    //           "Logic",
    //           "Robert Hall",
    //           "Arjun Ivatury",
    //           "Joshua Luellen",
    //           "Nayvadius Wilburn",
    //           "Eduardo Earle",
    //           "Ramon Ibanga Jr."
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "EgTSqnVc",
    //         "title": "One Day",
    //         "image": "http://c.saavncdn.com/197/One-Day-English-2018-20180725233551-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/197/One-Day-English-2018-20180725233551-500x500.jpg",
    //         "album": "One Day",
    //         "url": "https://www.jiosaavn.com/song/one-day/NQ8-YgVeYVA",
    //         "description": "One Day",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Ryan Tedder",
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Zach Skelton",
    //           "Kevin Randolph",
    //           "Logic",
    //           "Ryan Tedder",
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Zach Skelton",
    //           "Kevin Randolph"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": "https://jiotunepreview.jio.com/content/Converted/010912291110470.mp3"
    //       },
    //       {
    //         "song_id": "513XvxDb",
    //         "title": "Black SpiderMan",
    //         "image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-500x500.jpg",
    //         "album": "Everybody",
    //         "url": "https://www.jiosaavn.com/song/black-spiderman/RVlYaQJIc1E",
    //         "description": "Black SpiderMan",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Dylan Wiggins",
    //           "Damian Lemar Hudson",
    //           "Arjun Ivatury",
    //           "K. Abdul Rahman",
    //           "S. Barsh",
    //           "Sir Robert Bryson Hall II",
    //           "Logic",
    //           "Dylan Wiggins",
    //           "Damian Lemar Hudson",
    //           "Arjun Ivatury",
    //           "K. Abdul Rahman",
    //           "S. Barsh",
    //           "Sir Robert Bryson Hall II"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "VE01Mi3a",
    //         "title": "Gang Related",
    //         "image": "http://c.saavncdn.com/081/Under-Pressure-English-2014-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/081/Under-Pressure-English-2014-500x500.jpg",
    //         "album": "Under Pressure",
    //         "url": "https://www.jiosaavn.com/song/gang-related/Ji1bADlZBFI",
    //         "description": "Gang Related",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Lawrence Parker",
    //           "Praveen Sharma",
    //           "Travis Stewart",
    //           "Logic",
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Lawrence Parker",
    //           "Praveen Sharma",
    //           "Travis Stewart"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "vGcKxlMB",
    //         "title": "Everybody",
    //         "image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-500x500.jpg",
    //         "album": "Everybody",
    //         "url": "https://www.jiosaavn.com/song/everybody/Bi8IegxcenE",
    //         "description": "Everybody",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Sir Robert Bryson Hall II",
    //           "Logic",
    //           "Sir Robert Bryson Hall II"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "pX3wa7sl",
    //         "title": "Indica Badu",
    //         "image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-500x500.jpg",
    //         "album": "Bobby Tarantino II",
    //         "url": "https://www.jiosaavn.com/song/indica-badu/ADBYRhUHRF8",
    //         "description": "Indica Badu",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Kevin Randolph",
    //           "Robert Hall",
    //           "Arjun Ivatury",
    //           "Khalil Abdul-Rahman",
    //           "Cameron Jibril Thomaz",
    //           "Logic",
    //           "Kevin Randolph",
    //           "Robert Hall",
    //           "Arjun Ivatury",
    //           "Khalil Abdul-Rahman",
    //           "Cameron Jibril Thomaz"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "Mn1Y20IL",
    //         "title": "Contra",
    //         "image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-500x500.jpg",
    //         "album": "Bobby Tarantino II",
    //         "url": "https://www.jiosaavn.com/song/contra/PQZaaEYAfn8",
    //         "description": "Contra",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Nico Chiara",
    //           "Robert Hall",
    //           "Ozan Yildirim",
    //           "Logic",
    //           "Nico Chiara",
    //           "Robert Hall",
    //           "Ozan Yildirim"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "RuEpVJZF",
    //         "title": "YSIV",
    //         "image": "http://c.saavncdn.com/424/YSIV-English-2018-20180927233018-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/424/YSIV-English-2018-20180927233018-500x500.jpg",
    //         "album": "YSIV",
    //         "url": "https://www.jiosaavn.com/song/ysiv/Ih0uQSJ6bXU",
    //         "description": "YSIV",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Thomas Wlodaryck",
    //           "Melvin Dinkins",
    //           "Kier Gist",
    //           "Anthony S Cruz",
    //           "Nasir Jones",
    //           "Oliver A. Scott",
    //           "Ronnie James Wilson",
    //           "Olu Dara",
    //           "Logic",
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Thomas Wlodaryck",
    //           "Melvin Dinkins",
    //           "Kier Gist",
    //           "Anthony S Cruz",
    //           "Nasir Jones",
    //           "Oliver A. Scott",
    //           "Ronnie James Wilson",
    //           "Olu Dara"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "ESD6kFF1",
    //         "title": "Nikki",
    //         "image": "http://c.saavncdn.com/081/Under-Pressure-English-2014-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/081/Under-Pressure-English-2014-500x500.jpg",
    //         "album": "Under Pressure",
    //         "url": "https://www.jiosaavn.com/song/nikki/NTsvBx92cQI",
    //         "description": "Nikki",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Narada Michael Walden",
    //           "Logic",
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Narada Michael Walden"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "6j5Oj-fj",
    //         "title": "Midnight",
    //         "image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-500x500.jpg",
    //         "album": "Bobby Tarantino II",
    //         "url": "https://www.jiosaavn.com/song/midnight/RgJefh4dUVk",
    //         "description": "Midnight",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Arjun Ivatury",
    //           "Adam Feeney",
    //           "Sir Robert Bryson Hall II",
    //           "Logic",
    //           "Arjun Ivatury",
    //           "Adam Feeney",
    //           "Sir Robert Bryson Hall II"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "UAhnmZUb",
    //         "title": "Keanu Reeves",
    //         "image": "http://c.saavncdn.com/898/Confessions-of-a-Dangerous-Mind-English-2019-20190707230505-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/898/Confessions-of-a-Dangerous-Mind-English-2019-20190707230505-500x500.jpg",
    //         "album": "Confessions of a Dangerous Mind",
    //         "url": "https://www.jiosaavn.com/song/keanu-reeves/JSkDXxlqYlE",
    //         "description": "Keanu Reeves",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Aaron Gomez",
    //           "Logic",
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Aaron Gomez"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "CRiWNVEZ",
    //         "title": "Flexicution",
    //         "image": "http://c.saavncdn.com/596/Flexicution-English-2016-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/596/Flexicution-English-2016-500x500.jpg",
    //         "album": "Flexicution",
    //         "url": "https://www.jiosaavn.com/song/flexicution/MzoCZjpmcmk",
    //         "description": "Flexicution",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Logic"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "35Tbo2ax",
    //         "title": "One Day",
    //         "image": "http://c.saavncdn.com/424/YSIV-English-2018-20180927233018-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/424/YSIV-English-2018-20180927233018-500x500.jpg",
    //         "album": "YSIV",
    //         "url": "https://www.jiosaavn.com/song/one-day/Q10-UxsCVks",
    //         "description": "One Day",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Ryan Tedder",
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Zach Skelton",
    //           "Kevin Randolph",
    //           "Logic",
    //           "Ryan Tedder",
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Zach Skelton",
    //           "Kevin Randolph"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "iGf7UsmL",
    //         "title": "Overnight",
    //         "image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-500x500.jpg",
    //         "album": "Bobby Tarantino II",
    //         "url": "https://www.jiosaavn.com/song/overnight/GS8NBiFDWn8",
    //         "description": "Overnight",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Arjun Ivatury",
    //           "Sir Robert Bryson Hall II",
    //           "Logic",
    //           "Arjun Ivatury",
    //           "Sir Robert Bryson Hall II"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "baMx6FXh",
    //         "title": "Hallelujah",
    //         "image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-500x500.jpg",
    //         "album": "Everybody",
    //         "url": "https://www.jiosaavn.com/song/hallelujah/EgkmSUJ2b1s",
    //         "description": "Hallelujah",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Arjun Ivatury",
    //           "Sir Robert Bryson Hall II",
    //           "Logic",
    //           "Arjun Ivatury",
    //           "Sir Robert Bryson Hall II"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "V96oYuDV",
    //         "title": "Everybody Dies",
    //         "image": "http://c.saavncdn.com/943/Everybody-Dies-English-2018-20180905230446-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/943/Everybody-Dies-English-2018-20180905230446-500x500.jpg",
    //         "album": "Everybody Dies",
    //         "url": "https://www.jiosaavn.com/song/everybody-dies/JlFdXi1Fc2U",
    //         "description": "Everybody Dies",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Logic"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "OoYeC_vZ",
    //         "title": "Under Pressure",
    //         "image": "http://c.saavncdn.com/081/Under-Pressure-English-2014-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/081/Under-Pressure-English-2014-500x500.jpg",
    //         "album": "Under Pressure",
    //         "url": "https://www.jiosaavn.com/song/under-pressure/PwcyVDdvQWk",
    //         "description": "Under Pressure",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Steve Wyreman",
    //           "Rob Kinelski",
    //           "Claire Courchene",
    //           "Robert Bryson Hall",
    //           "Robert Mellin",
    //           "Guy Wood",
    //           "George Clinton",
    //           "William Collins",
    //           "Lorenzo Patterson",
    //           "Abrim Tilmon",
    //           "Bernie Worrell",
    //           "Eric Wright",
    //           "Andre Romell Young",
    //           "Kevin Randolph",
    //           "Logic",
    //           "Steve Wyreman",
    //           "Rob Kinelski",
    //           "Claire Courchene",
    //           "Robert Bryson Hall",
    //           "Robert Mellin",
    //           "Guy Wood",
    //           "George Clinton",
    //           "William Collins",
    //           "Lorenzo Patterson",
    //           "Abrim Tilmon",
    //           "Bernie Worrell",
    //           "Eric Wright",
    //           "Andre Romell Young",
    //           "Kevin Randolph"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "JKTHcK0i",
    //         "title": "The Return",
    //         "image": "http://c.saavncdn.com/714/The-Return-English-2018-20180822231954-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/714/The-Return-English-2018-20180822231954-500x500.jpg",
    //         "album": "The Return",
    //         "url": "https://www.jiosaavn.com/song/the-return/OiM-eRd7B1o",
    //         "description": "The Return",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Logic"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "6UhJNFd7",
    //         "title": "Wassup",
    //         "image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-500x500.jpg",
    //         "album": "Bobby Tarantino II",
    //         "url": "https://www.jiosaavn.com/song/wassup/Rj0Dezp2UwQ",
    //         "description": "Wassup",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Robert Hall",
    //           "Arjun Ivatury",
    //           "Sean Anderson",
    //           "Winston Riley",
    //           "Reggie Williams",
    //           "Logic",
    //           "Robert Hall",
    //           "Arjun Ivatury",
    //           "Sean Anderson",
    //           "Winston Riley",
    //           "Reggie Williams"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "j9aof0vf",
    //         "title": "Bohemian Trapsody",
    //         "image": "http://c.saavncdn.com/003/Supermarket-Soundtrack-Soundtrack--English-2019-20190325232417-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/003/Supermarket-Soundtrack-Soundtrack--English-2019-20190325232417-500x500.jpg",
    //         "album": "Supermarket (Soundtrack) (Soundtrack)",
    //         "url": "https://www.jiosaavn.com/song/bohemian-trapsody/GlEKXhIAQVU",
    //         "description": "Bohemian Trapsody",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Arjun Ivatury",
    //           "Sir Robert Bryson Hall II",
    //           "Logic",
    //           "Arjun Ivatury",
    //           "Sir Robert Bryson Hall II"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "twxhKp-X",
    //         "title": "Anziety",
    //         "image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-500x500.jpg",
    //         "album": "Everybody",
    //         "url": "https://www.jiosaavn.com/song/anziety/BB8TWT9AGms",
    //         "description": "Anziety",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Arjun Ivatury",
    //           "Nima Jahanbin",
    //           "Paimon Jahanbin",
    //           "James Bownes",
    //           "William Smith",
    //           "Sir Robert Bryson Hall II",
    //           "Logic",
    //           "Arjun Ivatury",
    //           "Nima Jahanbin",
    //           "Paimon Jahanbin",
    //           "James Bownes",
    //           "William Smith",
    //           "Sir Robert Bryson Hall II"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "t7A5tCV_",
    //         "title": "Warm It Up",
    //         "image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-500x500.jpg",
    //         "album": "Bobby Tarantino II",
    //         "url": "https://www.jiosaavn.com/song/warm-it-up/BF8qBABzYWw",
    //         "description": "Warm It Up",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Robert Hall",
    //           "Arjun Ivatury",
    //           "Terry Kevontay Watson",
    //           "Anthony Cruz",
    //           "Nasir Jones",
    //           "Oliver Scott",
    //           "Ronnie James Wilson",
    //           "Logic",
    //           "Robert Hall",
    //           "Arjun Ivatury",
    //           "Terry Kevontay Watson",
    //           "Anthony Cruz",
    //           "Nasir Jones",
    //           "Oliver Scott",
    //           "Ronnie James Wilson"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "-LQBGO7j",
    //         "title": "Icy",
    //         "image": "http://c.saavncdn.com/898/Confessions-of-a-Dangerous-Mind-English-2019-20190707230505-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/898/Confessions-of-a-Dangerous-Mind-English-2019-20190707230505-500x500.jpg",
    //         "album": "Confessions of a Dangerous Mind",
    //         "url": "https://www.jiosaavn.com/song/icy/XSQ6czN-AFk",
    //         "description": "Icy",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Arkae Tuazon",
    //           "Radric Davis",
    //           "Logic",
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Arkae Tuazon",
    //           "Radric Davis"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "V_aSNwnm",
    //         "title": "Take It Back",
    //         "image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-500x500.jpg",
    //         "album": "Everybody",
    //         "url": "https://www.jiosaavn.com/song/take-it-back/JjcKYjpHWV4",
    //         "description": "Take It Back",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Robert Campbell",
    //           "Robert Hall",
    //           "Arjun Ivatury",
    //           "Logic",
    //           "Robert Campbell",
    //           "Robert Hall",
    //           "Arjun Ivatury"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "edz6oyBU",
    //         "title": "ICONIC",
    //         "image": "http://c.saavncdn.com/424/YSIV-English-2018-20180927233018-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/424/YSIV-English-2018-20180927233018-500x500.jpg",
    //         "album": "YSIV",
    //         "url": "https://www.jiosaavn.com/song/iconic/FQwRBxtJdWY",
    //         "description": "ICONIC",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Melvin CHAOS Lewis",
    //           "Logic",
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Melvin CHAOS Lewis"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "9NTolPFs",
    //         "title": "BoomTrap Protocol",
    //         "image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-500x500.jpg",
    //         "album": "Bobby Tarantino II",
    //         "url": "https://www.jiosaavn.com/song/boomtrap-protocol/SSY-XhhgcUA",
    //         "description": "BoomTrap Protocol",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Arjun Ivatury",
    //           "James Vincent Dondelinger",
    //           "Sir Robert Bryson Hall II",
    //           "Logic",
    //           "Arjun Ivatury",
    //           "James Vincent Dondelinger",
    //           "Sir Robert Bryson Hall II"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "EMYM23Al",
    //         "title": "Yuck",
    //         "image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-500x500.jpg",
    //         "album": "Bobby Tarantino II",
    //         "url": "https://www.jiosaavn.com/song/yuck/NSUyfEYDdl8",
    //         "description": "Yuck",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Robert Hall",
    //           "Arjun Ivatury",
    //           "Aaron Gomez",
    //           "Logic",
    //           "Robert Hall",
    //           "Arjun Ivatury",
    //           "Aaron Gomez"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "MwNG8QBF",
    //         "title": "Wu Tang Forever",
    //         "image": "http://c.saavncdn.com/424/YSIV-English-2018-20180927233018-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/424/YSIV-English-2018-20180927233018-500x500.jpg",
    //         "album": "YSIV",
    //         "url": "https://www.jiosaavn.com/song/wu-tang-forever/PR8ldkxhdXU",
    //         "description": "Wu Tang Forever",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Joshua Portillo",
    //           "Dennis Coles",
    //           "Corey Woods",
    //           "Robert Diggs",
    //           "Clifford Smith",
    //           "Jason Hunter",
    //           "Darryl Hill",
    //           "Samuel Regis",
    //           "Lamont Jody Hawkins",
    //           "Gary Grice",
    //           "Caleb Armstrong",
    //           "Ray Anthony Smith",
    //           "Brian Alexander Morgan",
    //           "Russell Jones",
    //           "Elgin Turner",
    //           "Logic",
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Joshua Portillo",
    //           "Dennis Coles",
    //           "Corey Woods",
    //           "Robert Diggs",
    //           "Clifford Smith",
    //           "Jason Hunter",
    //           "Darryl Hill",
    //           "Samuel Regis",
    //           "Lamont Jody Hawkins",
    //           "Gary Grice",
    //           "Caleb Armstrong",
    //           "Ray Anthony Smith",
    //           "Brian Alexander Morgan",
    //           "Russell Jones",
    //           "Elgin Turner"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "TDJVmKed",
    //         "title": "Soul Food",
    //         "image": "http://c.saavncdn.com/081/Under-Pressure-English-2014-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/081/Under-Pressure-English-2014-500x500.jpg",
    //         "album": "Under Pressure",
    //         "url": "https://www.jiosaavn.com/song/soul-food/JCwhZxl7Ulc",
    //         "description": "Soul Food",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Sir Robert Bryson Hall II",
    //           "Khalil Abdul-Rahman",
    //           "Alkebulan Williams",
    //           "Arjun Ivatury",
    //           "Logic",
    //           "Sir Robert Bryson Hall II",
    //           "Khalil Abdul-Rahman",
    //           "Alkebulan Williams",
    //           "Arjun Ivatury"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "2gQfmP6F",
    //         "title": "Young Jesus",
    //         "image": "http://c.saavncdn.com/414/The-Incredible-True-Story-English-2015-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/414/The-Incredible-True-Story-English-2015-500x500.jpg",
    //         "album": "The Incredible True Story",
    //         "url": "https://www.jiosaavn.com/song/young-jesus/Qg86VxlgAXU",
    //         "description": "Young Jesus",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "James Blake",
    //           "Robert Diggs",
    //           "Deborah Scroggins",
    //           "Sir Robert Bryson Hall II",
    //           "Logic",
    //           "James Blake",
    //           "Robert Diggs",
    //           "Deborah Scroggins",
    //           "Sir Robert Bryson Hall II"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "A8oOzlpG",
    //         "title": "Still Ballin",
    //         "image": "http://c.saavncdn.com/898/Confessions-of-a-Dangerous-Mind-English-2019-20190707230505-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/898/Confessions-of-a-Dangerous-Mind-English-2019-20190707230505-500x500.jpg",
    //         "album": "Confessions of a Dangerous Mind",
    //         "url": "https://www.jiosaavn.com/song/still-ballin/MVAEfg5cR3Q",
    //         "description": "Still Ballin",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Cameron Jibril Thomaz",
    //           "Logic",
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Cameron Jibril Thomaz"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "FxcVjY6j",
    //         "title": "Can I Kick It",
    //         "image": "http://c.saavncdn.com/003/Supermarket-Soundtrack-Soundtrack--English-2019-20190325232417-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/003/Supermarket-Soundtrack-Soundtrack--English-2019-20190325232417-500x500.jpg",
    //         "album": "Supermarket (Soundtrack) (Soundtrack)",
    //         "url": "https://www.jiosaavn.com/song/can-i-kick-it/NhAIZx5pAVk",
    //         "description": "Can I Kick It",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Lou Reed",
    //           "Logic",
    //           "Lou Reed"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "3FfsUYKp",
    //         "title": "Waiting Room",
    //         "image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-500x500.jpg",
    //         "album": "Everybody",
    //         "url": "https://www.jiosaavn.com/song/waiting-room/Qy4NQiFpfEM",
    //         "description": "Waiting Room",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Robert Hall",
    //           "Logic",
    //           "Robert Hall"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "vCL07129",
    //         "title": "Bounce",
    //         "image": "http://c.saavncdn.com/081/Under-Pressure-English-2014-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/081/Under-Pressure-English-2014-500x500.jpg",
    //         "album": "Under Pressure",
    //         "url": "https://www.jiosaavn.com/song/bounce/BisnAUMBBQo",
    //         "description": "Bounce",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Sir Robert Bryson Hall II",
    //           "Larry Griffin Jr.",
    //           "Mark Landon",
    //           "Logic",
    //           "Sir Robert Bryson Hall II",
    //           "Larry Griffin Jr.",
    //           "Mark Landon"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "tMp3XaiO",
    //         "title": "Fade Away",
    //         "image": "http://c.saavncdn.com/414/The-Incredible-True-Story-English-2015-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/414/The-Incredible-True-Story-English-2015-500x500.jpg",
    //         "album": "The Incredible True Story",
    //         "url": "https://www.jiosaavn.com/song/fade-away/BCUbAixRXnw",
    //         "description": "Fade Away",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Gene Puerling",
    //           "Sir Robert Bryson Hall II",
    //           "Logic",
    //           "Gene Puerling",
    //           "Sir Robert Bryson Hall II"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "0k0MaJnI",
    //         "title": "Grandpa's Space Ship",
    //         "image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-500x500.jpg",
    //         "album": "Bobby Tarantino II",
    //         "url": "https://www.jiosaavn.com/song/grandpas-space-ship/QANbfBV6WXo",
    //         "description": "Grandpa's Space Ship",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Logic"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "WEiySOGD",
    //         "title": "44 Bars",
    //         "image": "http://c.saavncdn.com/047/Bobby-Tarantino-English-2016-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/047/Bobby-Tarantino-English-2016-500x500.jpg",
    //         "album": "Bobby Tarantino",
    //         "url": "https://www.jiosaavn.com/song/44-bars/Jy0CSCd-cHc",
    //         "description": "44 Bars",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Arjun Ivatury",
    //           "Barrington Levy",
    //           "Sir Robert Bryson Hall II",
    //           "Dylan Wiggins",
    //           "Logic",
    //           "Arjun Ivatury",
    //           "Barrington Levy",
    //           "Sir Robert Bryson Hall II",
    //           "Dylan Wiggins"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "8Qi35AY5",
    //         "title": "Confess",
    //         "image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-500x500.jpg",
    //         "album": "Everybody",
    //         "url": "https://www.jiosaavn.com/song/confess/SDkCAkFxbgY",
    //         "description": "Confess",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Dylan Wiggins",
    //           "Arjun Ivatury",
    //           "Christopher Thornton Holmes",
    //           "M. Render",
    //           "Sir Robert Bryson Hall II",
    //           "Diondria Thornton",
    //           "Logic",
    //           "Dylan Wiggins",
    //           "Arjun Ivatury",
    //           "Christopher Thornton Holmes",
    //           "M. Render",
    //           "Sir Robert Bryson Hall II",
    //           "Diondria Thornton"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "gmwLhSZT",
    //         "title": "Wizard Of Oz",
    //         "image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-500x500.jpg",
    //         "album": "Bobby Tarantino II",
    //         "url": "https://www.jiosaavn.com/song/wizard-of-oz/FwUcfRxjbWc",
    //         "description": "Wizard Of Oz",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Arjun Ivatury",
    //           "Ozan Yildirim",
    //           "Sir Robert Bryson Hall II",
    //           "Logic",
    //           "Arjun Ivatury",
    //           "Ozan Yildirim",
    //           "Sir Robert Bryson Hall II"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "SeBpM__6",
    //         "title": "America",
    //         "image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-500x500.jpg",
    //         "album": "Everybody",
    //         "url": "https://www.jiosaavn.com/song/america/Iw0pQTlvaAU",
    //         "description": "America",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Robert Hall",
    //           "Carlton Ridenhour",
    //           "Leon Ressalam",
    //           "Shawn Mckenzie",
    //           "Paul Mitchell",
    //           "Kevin Mckenzie",
    //           "Tariq Trotter",
    //           "No I.D.",
    //           "Logic",
    //           "Robert Hall",
    //           "Carlton Ridenhour",
    //           "Leon Ressalam",
    //           "Shawn Mckenzie",
    //           "Paul Mitchell",
    //           "Kevin Mckenzie",
    //           "Tariq Trotter",
    //           "No I.D."
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "eScZjg8j",
    //         "title": "Killing Spree",
    //         "image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-500x500.jpg",
    //         "album": "Everybody",
    //         "url": "https://www.jiosaavn.com/song/killing-spree/FTsIax5XD1k",
    //         "description": "Killing Spree",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Darrel Alston",
    //           "Robert Hall",
    //           "Arjun Ivatury",
    //           "Logic",
    //           "Darrel Alston",
    //           "Robert Hall",
    //           "Arjun Ivatury"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "rOKEn7W4",
    //         "title": "OCD",
    //         "image": "http://c.saavncdn.com/605/OCD-English-2019-20191024231029-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/605/OCD-English-2019-20191024231029-500x500.jpg",
    //         "album": "OCD",
    //         "url": "https://www.jiosaavn.com/song/ocd/AicgdBoHYAc",
    //         "description": "OCD",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "William Harris",
    //           "Gene Puerling",
    //           "Logic",
    //           "Dwn2earth",
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "William Harris",
    //           "Gene Puerling"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "2TzNeF5T",
    //         "title": "State Of Emergency",
    //         "image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/564/Bobby-Tarantino-II-English-2018-20180308041523-500x500.jpg",
    //         "album": "Bobby Tarantino II",
    //         "url": "https://www.jiosaavn.com/song/state-of-emergency/QjwRfxF2Amc",
    //         "description": "State Of Emergency",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Robert Hall",
    //           "Arjun Ivatury",
    //           "Altariq Crapps",
    //           "Darrell Alston",
    //           "Khalil Abdul-Rahman",
    //           "Tauheed Epps",
    //           "Logic",
    //           "Robert Hall",
    //           "Arjun Ivatury",
    //           "Altariq Crapps",
    //           "Darrell Alston",
    //           "Khalil Abdul-Rahman",
    //           "Tauheed Epps"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "wAMYvaGS",
    //         "title": "Perfect",
    //         "image": "http://c.saavncdn.com/494/No-Pressure-English-2020-20200724040644-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/494/No-Pressure-English-2020-20200724040644-500x500.jpg",
    //         "album": "No Pressure",
    //         "url": "https://www.jiosaavn.com/song/perfect/BykmaAJRcGA",
    //         "description": "Perfect",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Keanu Torres",
    //           "Michael Mule",
    //           "Isaac Deboni",
    //           "Logic",
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Keanu Torres",
    //           "Michael Mule",
    //           "Isaac Deboni"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "nnlYlvgH",
    //         "title": "Confessions of a Dangerous Mind",
    //         "image": "http://c.saavncdn.com/898/Confessions-of-a-Dangerous-Mind-English-2019-20190707230505-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/898/Confessions-of-a-Dangerous-Mind-English-2019-20190707230505-500x500.jpg",
    //         "album": "Confessions of a Dangerous Mind",
    //         "url": "https://www.jiosaavn.com/song/confessions-of-a-dangerous-mind/HgYHaBhGUHs",
    //         "description": "Confessions of a Dangerous Mind",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury",
    //           "Logic",
    //           "Sir Robert Bryson Hall II",
    //           "Arjun Ivatury"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       }
    //     ]
    //   },
    //   {
    //     "artist_id": "12071008",
    //     "token_id": "M94TGPwP4i4_",
    //     "name": "Logic RockStar",
    //     "image": "https://static.saavncdn.com/_i/share-image-2.png",
    //     "full_image": "https://static.saavncdn.com/_i/share-image-2.png",
    //     "url": "https://www.jiosaavn.com/artist/logic-rockstar/M94TGPwP4i4_",
    //     "description": "Logic RockStar",
    //     "songs": [
    //       {
    //         "song_id": "kv7NWTM-",
    //         "title": "SHOCKER",
    //         "image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-500x500.jpg",
    //         "album": "JOKER - THE ALBUM",
    //         "url": "https://www.jiosaavn.com/song/shocker/Gx5cfyNkeh4",
    //         "description": "SHOCKER",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "tfr3xqDQ",
    //         "title": "HEART ON FIRE",
    //         "image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-500x500.jpg",
    //         "album": "JOKER - THE ALBUM",
    //         "url": "https://www.jiosaavn.com/song/heart-on-fire/BA4ZAgxBc2I",
    //         "description": "HEART ON FIRE",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "KF5edc0Y",
    //         "title": "DYNAMITE EYES",
    //         "image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-500x500.jpg",
    //         "album": "JOKER - THE ALBUM",
    //         "url": "https://www.jiosaavn.com/song/dynamite-eyes/Oy5eVBBTB2o",
    //         "description": "DYNAMITE EYES",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "fGTsKeS0",
    //         "title": "CUTTING EDGE",
    //         "image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-500x500.jpg",
    //         "album": "JOKER - THE ALBUM",
    //         "url": "https://www.jiosaavn.com/song/cutting-edge/Fi8-Qj9VZAM",
    //         "description": "CUTTING EDGE",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "W6x2qRc5",
    //         "title": "CHALLENGE",
    //         "image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-500x500.jpg",
    //         "album": "JOKER - THE ALBUM",
    //         "url": "https://www.jiosaavn.com/song/challenge/J14TAwViVAY",
    //         "description": "CHALLENGE",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "jEfA2Sor",
    //         "title": "SUPER RELIANCE STATE",
    //         "image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-500x500.jpg",
    //         "album": "JOKER - THE ALBUM",
    //         "url": "https://www.jiosaavn.com/song/super-reliance-state/Gi0NcEZjWEE",
    //         "description": "SUPER RELIANCE STATE",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "bu8IA1pF",
    //         "title": "ORION",
    //         "image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-500x500.jpg",
    //         "album": "JOKER - THE ALBUM",
    //         "url": "https://www.jiosaavn.com/song/orion/Eh1TeDUBR3U",
    //         "description": "ORION",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "mmMb35Jg",
    //         "title": "COLD JOINT",
    //         "image": "http://c.saavncdn.com/054/COLD-JOINT-Unknown-2022-20220614131441-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/054/COLD-JOINT-Unknown-2022-20220614131441-500x500.jpg",
    //         "album": "COLD JOINT",
    //         "url": "https://www.jiosaavn.com/song/cold-joint/HQUmU0cFfVQ",
    //         "description": "COLD JOINT",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "f43-EBn9",
    //         "title": "SECOND STORY",
    //         "image": "http://c.saavncdn.com/934/SECOND-STORY-Unknown-2022-20220609004710-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/934/SECOND-STORY-Unknown-2022-20220609004710-500x500.jpg",
    //         "album": "SECOND STORY",
    //         "url": "https://www.jiosaavn.com/song/second-story/FlxYHDFyWQo",
    //         "description": "SECOND STORY",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "BIwrK7Z1",
    //         "title": "GALAXY",
    //         "image": "http://c.saavncdn.com/674/THE-POWER-OF-PASSION-Unknown-2022-20220331084227-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/674/THE-POWER-OF-PASSION-Unknown-2022-20220331084227-500x500.jpg",
    //         "album": "& - THE POWER OF PASSION",
    //         "url": "https://www.jiosaavn.com/song/galaxy/MiEcQz8HbQI",
    //         "description": "GALAXY",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "9UAuinga",
    //         "title": "SAPPORO NIGHT PARTY",
    //         "image": "http://c.saavncdn.com/809/Perfume-Unknown-2022-20220210024135-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/809/Perfume-Unknown-2022-20220210024135-500x500.jpg",
    //         "album": "Perfume",
    //         "url": "https://www.jiosaavn.com/song/sapporo-night-party/ST0qRB1eUFI",
    //         "description": "SAPPORO NIGHT PARTY",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "Ka9fNkJy",
    //         "title": "OPTION",
    //         "image": "http://c.saavncdn.com/254/SWIPE-UP-Unknown-2022-20211223234540-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/254/SWIPE-UP-Unknown-2022-20211223234540-500x500.jpg",
    //         "album": "SWIPE UP",
    //         "url": "https://www.jiosaavn.com/song/option/OwlSVzpbfUo",
    //         "description": "OPTION",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "YN6du9IG",
    //         "title": "RED COMET",
    //         "image": "http://c.saavncdn.com/267/OSAKA-LOVE-STORY-Unknown-2022-20220126214947-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/267/OSAKA-LOVE-STORY-Unknown-2022-20220126214947-500x500.jpg",
    //         "album": "OSAKA LOVE STORY",
    //         "url": "https://www.jiosaavn.com/song/red-comet/KSZdVQEJfnQ",
    //         "description": "RED COMET",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "CMw2_1iP",
    //         "title": "OSAKA LOVE STORY",
    //         "image": "http://c.saavncdn.com/267/OSAKA-LOVE-STORY-Unknown-2022-20220126214947-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/267/OSAKA-LOVE-STORY-Unknown-2022-20220126214947-500x500.jpg",
    //         "album": "OSAKA LOVE STORY",
    //         "url": "https://www.jiosaavn.com/song/osaka-love-story/MyUcAysBXmM",
    //         "description": "OSAKA LOVE STORY",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "JUYy6Gim",
    //         "title": "SCARLET",
    //         "image": "http://c.saavncdn.com/267/OSAKA-LOVE-STORY-Unknown-2022-20220126214947-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/267/OSAKA-LOVE-STORY-Unknown-2022-20220126214947-500x500.jpg",
    //         "album": "OSAKA LOVE STORY",
    //         "url": "https://www.jiosaavn.com/song/scarlet/Oj0ySEJ3Xl4",
    //         "description": "SCARLET",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "V-91cxuh",
    //         "title": "PROOF OF GENIUS",
    //         "image": "http://c.saavncdn.com/939/ENERGY-FLOW-Unknown-2022-20211219215058-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/939/ENERGY-FLOW-Unknown-2022-20211219215058-500x500.jpg",
    //         "album": "ENERGY FLOW",
    //         "url": "https://www.jiosaavn.com/song/proof-of-genius/JkVSABdIQls",
    //         "description": "PROOF OF GENIUS",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "P6PWbeY_",
    //         "title": "AFTER BEATS",
    //         "image": "http://c.saavncdn.com/326/AFTER-BEATS-Unknown-2022-20220429010110-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/326/AFTER-BEATS-Unknown-2022-20220429010110-500x500.jpg",
    //         "album": "AFTER BEATS",
    //         "url": "https://www.jiosaavn.com/song/after-beats/IF47ZhZVbmw",
    //         "description": "AFTER BEATS",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "pGfZSPLT",
    //         "title": "Diffuse Reflections",
    //         "image": "http://c.saavncdn.com/254/SWIPE-UP-Unknown-2022-20211223234540-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/254/SWIPE-UP-Unknown-2022-20211223234540-500x500.jpg",
    //         "album": "SWIPE UP",
    //         "url": "https://www.jiosaavn.com/song/diffuse-reflections/AC8Naydge2c",
    //         "description": "Diffuse Reflections",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "DvVX6UGY",
    //         "title": "THE JAPNANESE TECH",
    //         "image": "http://c.saavncdn.com/279/THE-JAPNANESE-TECH-Unknown-2022-20221105095850-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/279/THE-JAPNANESE-TECH-Unknown-2022-20221105095850-500x500.jpg",
    //         "album": "THE JAPNANESE TECH",
    //         "url": "https://www.jiosaavn.com/song/the-japnanese-tech/NB49aUJlcGo",
    //         "description": "THE JAPNANESE TECH",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "Vas-jW2I",
    //         "title": "DANGER ZONE",
    //         "image": "http://c.saavncdn.com/674/THE-POWER-OF-PASSION-Unknown-2022-20220331084227-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/674/THE-POWER-OF-PASSION-Unknown-2022-20220331084227-500x500.jpg",
    //         "album": "& - THE POWER OF PASSION",
    //         "url": "https://www.jiosaavn.com/song/danger-zone/JgkYHB5nBXo",
    //         "description": "DANGER ZONE",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "XpHrzCmx",
    //         "title": "DIMENSION",
    //         "image": "http://c.saavncdn.com/842/DIMENSION-Unknown-2022-20220609005119-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/842/DIMENSION-Unknown-2022-20220609005119-500x500.jpg",
    //         "album": "DIMENSION",
    //         "url": "https://www.jiosaavn.com/song/dimension/KBgjQw5zWks",
    //         "description": "DIMENSION",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "9Lh_dfMw",
    //         "title": "OLD ROOKIE",
    //         "image": "http://c.saavncdn.com/859/OLD-ROOKIE-Unknown-2022-20220609005058-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/859/OLD-ROOKIE-Unknown-2022-20220609005058-500x500.jpg",
    //         "album": "OLD ROOKIE",
    //         "url": "https://www.jiosaavn.com/song/old-rookie/SSQDbhBWekQ",
    //         "description": "OLD ROOKIE",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "hf4gdFQ1",
    //         "title": "MIDNIGHT BLUE",
    //         "image": "http://c.saavncdn.com/267/OSAKA-LOVE-STORY-Unknown-2022-20220126214947-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/267/OSAKA-LOVE-STORY-Unknown-2022-20220126214947-500x500.jpg",
    //         "album": "OSAKA LOVE STORY",
    //         "url": "https://www.jiosaavn.com/song/midnight-blue/GA5fVhB2ZgI",
    //         "description": "MIDNIGHT BLUE",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "-9WHWBAr",
    //         "title": "THE JAPNANESE HI-EDGE",
    //         "image": "http://c.saavncdn.com/897/THE-JAPNANESE-HI-EDGE-Unknown-2022-20220609004838-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/897/THE-JAPNANESE-HI-EDGE-Unknown-2022-20220609004838-500x500.jpg",
    //         "album": "THE JAPNANESE HI-EDGE",
    //         "url": "https://www.jiosaavn.com/song/the-japnanese-hi-edge/XVE8eSNydkE",
    //         "description": "THE JAPNANESE HI-EDGE",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "qkwBplJM",
    //         "title": "FOOTWORK",
    //         "image": "http://c.saavncdn.com/254/SWIPE-UP-Unknown-2022-20211223234540-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/254/SWIPE-UP-Unknown-2022-20211223234540-500x500.jpg",
    //         "album": "SWIPE UP",
    //         "url": "https://www.jiosaavn.com/song/footwork/AQMccwRcfX4",
    //         "description": "FOOTWORK",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "zwmINVIx",
    //         "title": "CYCLONE",
    //         "image": "http://c.saavncdn.com/674/THE-POWER-OF-PASSION-Unknown-2022-20220331084227-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/674/THE-POWER-OF-PASSION-Unknown-2022-20220331084227-500x500.jpg",
    //         "album": "& - THE POWER OF PASSION",
    //         "url": "https://www.jiosaavn.com/song/cyclone/Ch8GeDpmfks",
    //         "description": "CYCLONE",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "1R4t1kpt",
    //         "title": "BECAUSE I LOVE YOU",
    //         "image": "http://c.saavncdn.com/267/OSAKA-LOVE-STORY-Unknown-2022-20220126214947-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/267/OSAKA-LOVE-STORY-Unknown-2022-20220126214947-500x500.jpg",
    //         "album": "OSAKA LOVE STORY",
    //         "url": "https://www.jiosaavn.com/song/because-i-love-you/QTpfRUVbR0c",
    //         "description": "BECAUSE I LOVE YOU",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "iqOd6rBt",
    //         "title": "TRACK16",
    //         "image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-500x500.jpg",
    //         "album": "JOKER - THE ALBUM",
    //         "url": "https://www.jiosaavn.com/song/track16/GRkkVUJCdUc",
    //         "description": "TRACK16",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "Twn4tvvm",
    //         "title": "LOVERS",
    //         "image": "http://c.saavncdn.com/804/LOVERS-Unknown-2022-20220609005246-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/804/LOVERS-Unknown-2022-20220609005246-500x500.jpg",
    //         "album": "LOVERS",
    //         "url": "https://www.jiosaavn.com/song/lovers/JB8FBQBGQV4",
    //         "description": "LOVERS",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "LKzY9v8B",
    //         "title": "THE TROPICS",
    //         "image": "http://c.saavncdn.com/674/THE-POWER-OF-PASSION-Unknown-2022-20220331084227-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/674/THE-POWER-OF-PASSION-Unknown-2022-20220331084227-500x500.jpg",
    //         "album": "& - THE POWER OF PASSION",
    //         "url": "https://www.jiosaavn.com/song/the-tropics/PCMRaE1GD3E",
    //         "description": "THE TROPICS",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "txHg77Hd",
    //         "title": "LEGACY",
    //         "image": "http://c.saavncdn.com/254/SWIPE-UP-Unknown-2022-20211223234540-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/254/SWIPE-UP-Unknown-2022-20211223234540-500x500.jpg",
    //         "album": "SWIPE UP",
    //         "url": "https://www.jiosaavn.com/song/legacy/BBAjVkMHf1c",
    //         "description": "LEGACY",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "btqHyOEI",
    //         "title": "OSAKA BEATS",
    //         "image": "http://c.saavncdn.com/267/OSAKA-LOVE-STORY-Unknown-2022-20220126214947-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/267/OSAKA-LOVE-STORY-Unknown-2022-20220126214947-500x500.jpg",
    //         "album": "OSAKA LOVE STORY",
    //         "url": "https://www.jiosaavn.com/song/osaka-beats/EhwaeQ1-cno",
    //         "description": "OSAKA BEATS",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "lkP5091M",
    //         "title": "ZONE",
    //         "image": "http://c.saavncdn.com/674/THE-POWER-OF-PASSION-Unknown-2022-20220331084227-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/674/THE-POWER-OF-PASSION-Unknown-2022-20220331084227-500x500.jpg",
    //         "album": "& - THE POWER OF PASSION",
    //         "url": "https://www.jiosaavn.com/song/zone/HAM7BEQJBn4",
    //         "description": "ZONE",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "MCZ8zTxq",
    //         "title": "Dynamite",
    //         "image": "http://c.saavncdn.com/939/ENERGY-FLOW-Unknown-2022-20211219215058-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/939/ENERGY-FLOW-Unknown-2022-20211219215058-500x500.jpg",
    //         "album": "ENERGY FLOW",
    //         "url": "https://www.jiosaavn.com/song/dynamite/PSsxCQ5kT0I",
    //         "description": "Dynamite",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "nuDicwJF",
    //         "title": "TOY BOX",
    //         "image": "http://c.saavncdn.com/809/Perfume-Unknown-2022-20220210024135-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/809/Perfume-Unknown-2022-20220210024135-500x500.jpg",
    //         "album": "Perfume",
    //         "url": "https://www.jiosaavn.com/song/toy-box/Hh0vWBdHfXU",
    //         "description": "TOY BOX",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "ZkxugzRx",
    //         "title": "RETURNS",
    //         "image": "http://c.saavncdn.com/322/PRAYER-Unknown-2022-20220324120555-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/322/PRAYER-Unknown-2022-20220324120555-500x500.jpg",
    //         "album": "PRAYER",
    //         "url": "https://www.jiosaavn.com/song/returns/KgMTRBNKZUs",
    //         "description": "RETURNS",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "8xZekYeC",
    //         "title": "Hi-LOGIC",
    //         "image": "http://c.saavncdn.com/939/ENERGY-FLOW-Unknown-2022-20211219215058-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/939/ENERGY-FLOW-Unknown-2022-20211219215058-500x500.jpg",
    //         "album": "ENERGY FLOW",
    //         "url": "https://www.jiosaavn.com/song/hi-logic/SBAxVB9pUnA",
    //         "description": "Hi-LOGIC",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "O_Th_kNB",
    //         "title": "OSAKA LOVERS",
    //         "image": "http://c.saavncdn.com/267/OSAKA-LOVE-STORY-Unknown-2022-20220126214947-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/267/OSAKA-LOVE-STORY-Unknown-2022-20220126214947-500x500.jpg",
    //         "album": "OSAKA LOVE STORY",
    //         "url": "https://www.jiosaavn.com/song/osaka-lovers/Pzc-WStbeXE",
    //         "description": "OSAKA LOVERS",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "gkokkM89",
    //         "title": "CHAPTER",
    //         "image": "http://c.saavncdn.com/674/THE-POWER-OF-PASSION-Unknown-2022-20220331084227-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/674/THE-POWER-OF-PASSION-Unknown-2022-20220331084227-500x500.jpg",
    //         "album": "& - THE POWER OF PASSION",
    //         "url": "https://www.jiosaavn.com/song/chapter/FwMEWh99Dwo",
    //         "description": "CHAPTER",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "1CJEhMiu",
    //         "title": "CONTROL",
    //         "image": "http://c.saavncdn.com/939/ENERGY-FLOW-Unknown-2022-20211219215058-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/939/ENERGY-FLOW-Unknown-2022-20211219215058-500x500.jpg",
    //         "album": "ENERGY FLOW",
    //         "url": "https://www.jiosaavn.com/song/control/QSshdBx9XkY",
    //         "description": "CONTROL",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "vhZhUfYL",
    //         "title": "CAPRICIOUS",
    //         "image": "http://c.saavncdn.com/674/THE-POWER-OF-PASSION-Unknown-2022-20220331084227-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/674/THE-POWER-OF-PASSION-Unknown-2022-20220331084227-500x500.jpg",
    //         "album": "& - THE POWER OF PASSION",
    //         "url": "https://www.jiosaavn.com/song/capricious/BgAxWSFWbn8",
    //         "description": "CAPRICIOUS",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "w5eoIUNo",
    //         "title": "FUTURE TECH QUEEN",
    //         "image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-500x500.jpg",
    //         "album": "JOKER - THE ALBUM",
    //         "url": "https://www.jiosaavn.com/song/future-tech-queen/B10OXj1leVw",
    //         "description": "FUTURE TECH QUEEN",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "bHNW7SYL",
    //         "title": "TOP RUNNER",
    //         "image": "http://c.saavncdn.com/047/TOP-RUNNER-Unknown-2022-20220614131505-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/047/TOP-RUNNER-Unknown-2022-20220614131505-500x500.jpg",
    //         "album": "TOP RUNNER",
    //         "url": "https://www.jiosaavn.com/song/top-runner/EiAlZkNjbn8",
    //         "description": "TOP RUNNER",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "Ci9YUHbW",
    //         "title": "PROGRESSIVE TECH",
    //         "image": "http://c.saavncdn.com/322/PRAYER-Unknown-2022-20220324120555-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/322/PRAYER-Unknown-2022-20220324120555-500x500.jpg",
    //         "album": "PRAYER",
    //         "url": "https://www.jiosaavn.com/song/progressive-tech/MwFSaCF4VWQ",
    //         "description": "PROGRESSIVE TECH",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "SkL3Dale",
    //         "title": "DENGEKI",
    //         "image": "http://c.saavncdn.com/939/ENERGY-FLOW-Unknown-2022-20211219215058-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/939/ENERGY-FLOW-Unknown-2022-20211219215058-500x500.jpg",
    //         "album": "ENERGY FLOW",
    //         "url": "https://www.jiosaavn.com/song/dengeki/IwMnAjBRW1Y",
    //         "description": "DENGEKI",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "0Vzc-x10",
    //         "title": "THIRD STAGE",
    //         "image": "http://c.saavncdn.com/809/Perfume-Unknown-2022-20220210024135-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/809/Perfume-Unknown-2022-20220210024135-500x500.jpg",
    //         "album": "Perfume",
    //         "url": "https://www.jiosaavn.com/song/third-stage/QD4RUllIBgM",
    //         "description": "THIRD STAGE",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "Ej0XwYlj",
    //         "title": "NEON SIGH",
    //         "image": "http://c.saavncdn.com/809/Perfume-Unknown-2022-20220210024135-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/809/Perfume-Unknown-2022-20220210024135-500x500.jpg",
    //         "album": "Perfume",
    //         "url": "https://www.jiosaavn.com/song/neon-sigh/NQJbaQNpW1k",
    //         "description": "NEON SIGH",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "55gO_2bh",
    //         "title": "ENTER",
    //         "image": "http://c.saavncdn.com/254/SWIPE-UP-Unknown-2022-20211223234540-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/254/SWIPE-UP-Unknown-2022-20211223234540-500x500.jpg",
    //         "album": "SWIPE UP",
    //         "url": "https://www.jiosaavn.com/song/enter/RV0MfisCVVs",
    //         "description": "ENTER",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "qccluoVG",
    //         "title": "ELECTRIC FUNK",
    //         "image": "http://c.saavncdn.com/254/SWIPE-UP-Unknown-2022-20211223234540-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/254/SWIPE-UP-Unknown-2022-20211223234540-500x500.jpg",
    //         "album": "SWIPE UP",
    //         "url": "https://www.jiosaavn.com/song/electric-funk/AQsIXQFfYXQ",
    //         "description": "ELECTRIC FUNK",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "vtXJpotx",
    //         "title": "THE POWER OF LOVE",
    //         "image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/798/JOKER-THE-ALBUM-Unknown-2022-20220609005311-500x500.jpg",
    //         "album": "JOKER - THE ALBUM",
    //         "url": "https://www.jiosaavn.com/song/the-power-of-love/BhwzewRfQ0s",
    //         "description": "THE POWER OF LOVE",
    //         "primary_artists": "Logic RockStar",
    //         "singers": [
    //           "Logic RockStar"
    //         ],
    //         "language": "unknown",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       }
    //     ]
    //   },
    //   {
    //     "artist_id": "3957082",
    //     "token_id": "cFT70YRePiI_",
    //     "name": "Lyrics Logic and Lullabies",
    //     "image": "http://c.saavncdn.com/537/Beautiful-Liar-English-2017-20171025103247-150x150.jpg",
    //     "full_image": "http://c.saavncdn.com/537/Beautiful-Liar-English-2017-20171025103247-500x500.jpg",
    //     "url": "https://www.jiosaavn.com/artist/lyrics-logic-and-lullabies/cFT70YRePiI_",
    //     "description": "Lyrics Logic and Lullabies",
    //     "songs": [
    //       {
    //         "song_id": "58l-yt9A",
    //         "title": "Beautiful Liar",
    //         "image": "http://c.saavncdn.com/537/Beautiful-Liar-English-2017-20171025103247-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/537/Beautiful-Liar-English-2017-20171025103247-500x500.jpg",
    //         "album": "Beautiful Liar",
    //         "url": "https://www.jiosaavn.com/song/beautiful-liar/RVAHHA1EDnI",
    //         "description": "Beautiful Liar",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "t0fZNFP8",
    //         "title": "Never Know How",
    //         "image": "http://c.saavncdn.com/224/Never-Know-How-English-2018-20180713123018-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/224/Never-Know-How-English-2018-20180713123018-500x500.jpg",
    //         "album": "Never Know How",
    //         "url": "https://www.jiosaavn.com/song/never-know-how/BFgNazp2Zws",
    //         "description": "Never Know How",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "fMuYOVfU",
    //         "title": "Fall so Hard",
    //         "image": "http://c.saavncdn.com/661/Fall-so-Hard-English-2019-20190706023131-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/661/Fall-so-Hard-English-2019-20190706023131-500x500.jpg",
    //         "album": "Fall so Hard",
    //         "url": "https://www.jiosaavn.com/song/fall-so-hard/FiUeaDtmUWY",
    //         "description": "Fall so Hard",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "xBzMVMG-",
    //         "title": "We Know",
    //         "image": "http://c.saavncdn.com/583/We-Know-English-2018-20180713123017-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/583/We-Know-English-2018-20180713123017-500x500.jpg",
    //         "album": "We Know",
    //         "url": "https://www.jiosaavn.com/song/we-know/CCoRfCJ9cB4",
    //         "description": "We Know",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "9Jio92PI",
    //         "title": "I Let It Fade",
    //         "image": "http://c.saavncdn.com/659/The-Show-Tune-Style-Collection-English-2019-20190921093011-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/659/The-Show-Tune-Style-Collection-English-2019-20190921093011-500x500.jpg",
    //         "album": "The Show Tune Style Collection",
    //         "url": "https://www.jiosaavn.com/song/i-let-it-fade/SSICXk0CZ3o",
    //         "description": "I Let It Fade",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "5QnG5eX9",
    //         "title": "Dangerous Man",
    //         "image": "http://c.saavncdn.com/659/The-Show-Tune-Style-Collection-English-2019-20190921093011-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/659/The-Show-Tune-Style-Collection-English-2019-20190921093011-500x500.jpg",
    //         "album": "The Show Tune Style Collection",
    //         "url": "https://www.jiosaavn.com/song/dangerous-man/RTkFdkFVbwo",
    //         "description": "Dangerous Man",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "S83VtcAx",
    //         "title": "Go Ahead",
    //         "image": "http://c.saavncdn.com/659/The-Show-Tune-Style-Collection-English-2019-20190921093011-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/659/The-Show-Tune-Style-Collection-English-2019-20190921093011-500x500.jpg",
    //         "album": "The Show Tune Style Collection",
    //         "url": "https://www.jiosaavn.com/song/go-ahead/I1BYZwBTdks",
    //         "description": "Go Ahead",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "tanKFrAN",
    //         "title": "Under the Collar",
    //         "image": "http://c.saavncdn.com/201/Under-the-Collar-English-2017-20171221063035-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/201/Under-the-Collar-English-2017-20171221063035-500x500.jpg",
    //         "album": "Under the Collar",
    //         "url": "https://www.jiosaavn.com/song/under-the-collar/BAkFejJCdn0",
    //         "description": "Under the Collar",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "-yRDWmMp",
    //         "title": "Say Goodbye",
    //         "image": "http://c.saavncdn.com/951/Say-Goodbye-English-2019-20190521183138-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/951/Say-Goodbye-English-2019-20190521183138-500x500.jpg",
    //         "album": "Say Goodbye",
    //         "url": "https://www.jiosaavn.com/song/say-goodbye/XRE5dSNdekM",
    //         "description": "Say Goodbye",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "742nG5SC",
    //         "title": "Captain's Maiden",
    //         "image": "http://c.saavncdn.com/818/Captain-s-Maiden-English-2019-20190425213230-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/818/Captain-s-Maiden-English-2019-20190425213230-500x500.jpg",
    //         "album": "Captain's Maiden",
    //         "url": "https://www.jiosaavn.com/song/captains-maiden/R1xZXzMFZHA",
    //         "description": "Captain's Maiden",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "eN_tbT0f",
    //         "title": "I'll Never Do That to You",
    //         "image": "http://c.saavncdn.com/659/I-ll-Never-Do-That-to-You-English-2018-20180314043017-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/659/I-ll-Never-Do-That-to-You-English-2018-20180314043017-500x500.jpg",
    //         "album": "I'll Never Do That to You",
    //         "url": "https://www.jiosaavn.com/song/ill-never-do-that-to-you/FSY0RRZkB1U",
    //         "description": "I'll Never Do That to You",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "DaKZQa-E",
    //         "title": "In My Mind I Love",
    //         "image": "http://c.saavncdn.com/463/In-My-Mind-I-Love-English-2016-20180826153318-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/463/In-My-Mind-I-Love-English-2016-20180826153318-500x500.jpg",
    //         "album": "In My Mind I Love",
    //         "url": "https://www.jiosaavn.com/song/in-my-mind-i-love/NAkgayVRGnY",
    //         "description": "In My Mind I Love",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "aCaTZvZt",
    //         "title": "To My Heart",
    //         "image": "http://c.saavncdn.com/743/To-My-Heart-English-2016-20180826153317-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/743/To-My-Heart-English-2016-20180826153317-500x500.jpg",
    //         "album": "To My Heart",
    //         "url": "https://www.jiosaavn.com/song/to-my-heart/ESsKZS5GbUc",
    //         "description": "To My Heart",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "y7GD3w3J",
    //         "title": "Wildfire",
    //         "image": "http://c.saavncdn.com/179/Wildfire-English-2019-20190808073034-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/179/Wildfire-English-2019-20190808073034-500x500.jpg",
    //         "album": "Wildfire",
    //         "url": "https://www.jiosaavn.com/song/wildfire/CV8sdUdHBHk",
    //         "description": "Wildfire",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Michael Martin Murphey",
    //           "Larry Cansler",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "OPVk0wN7",
    //         "title": "No Win Scenario",
    //         "image": "http://c.saavncdn.com/070/No-Win-Scenario-English-2018-20180611063020-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/070/No-Win-Scenario-English-2018-20180611063020-500x500.jpg",
    //         "album": "No Win Scenario",
    //         "url": "https://www.jiosaavn.com/song/no-win-scenario/Pzg9WkRHeQQ",
    //         "description": "No Win Scenario",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "AOR5AN6I",
    //         "title": "Warring Angels",
    //         "image": "http://c.saavncdn.com/698/Warring-Angels-English-2018-20180404123544-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/698/Warring-Angels-English-2018-20180404123544-500x500.jpg",
    //         "album": "Warring Angels",
    //         "url": "https://www.jiosaavn.com/song/warring-angels/MSc5BDV,AXo",
    //         "description": "Warring Angels",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "ibr5Afd6",
    //         "title": "Why She Hides (Instrumental Version)",
    //         "image": "http://c.saavncdn.com/920/Guitar-Instrumentals-English-2019-20190625213045-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/920/Guitar-Instrumentals-English-2019-20190625213045-500x500.jpg",
    //         "album": "Guitar Instrumentals",
    //         "url": "https://www.jiosaavn.com/song/why-she-hides-instrumental-version/GQoZBDVWUwU",
    //         "description": "Why She Hides (Instrumental Version)",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "HZY7G_7r",
    //         "title": "Animal Eyes (Instrumental Version)",
    //         "image": "http://c.saavncdn.com/920/Guitar-Instrumentals-English-2019-20190625213045-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/920/Guitar-Instrumentals-English-2019-20190625213045-500x500.jpg",
    //         "album": "Guitar Instrumentals",
    //         "url": "https://www.jiosaavn.com/song/animal-eyes-instrumental-version/ODIyBjNvAEE",
    //         "description": "Animal Eyes (Instrumental Version)",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "lzDZh39O",
    //         "title": "That's the Reason",
    //         "image": "http://c.saavncdn.com/034/That-s-the-Reason-English-2016-20180826153321-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/034/That-s-the-Reason-English-2016-20180826153321-500x500.jpg",
    //         "album": "That's the Reason",
    //         "url": "https://www.jiosaavn.com/song/thats-the-reason/HBIvaxwDDnw",
    //         "description": "That's the Reason",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "dNDqjsbH",
    //         "title": "Lady of Braid",
    //         "image": "http://c.saavncdn.com/586/Lady-of-Braid-English-2019-20190716203111-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/586/Lady-of-Braid-English-2019-20190716203111-500x500.jpg",
    //         "album": "Lady of Braid",
    //         "url": "https://www.jiosaavn.com/song/lady-of-braid/FCYvQB5DVXs",
    //         "description": "Lady of Braid",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "3UirJBNU",
    //         "title": "Howling at the Moon",
    //         "image": "http://c.saavncdn.com/083/Howling-at-the-Moon-English-2017-20171221063036-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/083/Howling-at-the-Moon-English-2017-20171221063036-500x500.jpg",
    //         "album": "Howling at the Moon",
    //         "url": "https://www.jiosaavn.com/song/howling-at-the-moon/Qz0CQz5yeWY",
    //         "description": "Howling at the Moon",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "Kpfvw_sE",
    //         "title": "My Frozen Heart (Instrumental Version)",
    //         "image": "http://c.saavncdn.com/920/Guitar-Instrumentals-English-2019-20190625213045-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/920/Guitar-Instrumentals-English-2019-20190625213045-500x500.jpg",
    //         "album": "Guitar Instrumentals",
    //         "url": "https://www.jiosaavn.com/song/my-frozen-heart-instrumental-version/OxgNRwNvRHY",
    //         "description": "My Frozen Heart (Instrumental Version)",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "m0ZBImec",
    //         "title": "Country Song Epitaph",
    //         "image": "http://c.saavncdn.com/301/Country-Song-Epitaph-English-2016-20180826163048-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/301/Country-Song-Epitaph-English-2016-20180826163048-500x500.jpg",
    //         "album": "Country Song Epitaph",
    //         "url": "https://www.jiosaavn.com/song/country-song-epitaph/HVgxcz1dUlA",
    //         "description": "Country Song Epitaph",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "3S9KhFuz",
    //         "title": "Blending In",
    //         "image": "http://c.saavncdn.com/347/Blending-In-English-2018-20180713123407-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/347/Blending-In-English-2018-20180713123407-500x500.jpg",
    //         "album": "Blending In",
    //         "url": "https://www.jiosaavn.com/song/blending-in/QztSehx2Qkk",
    //         "description": "Blending In",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "GmbOwowz",
    //         "title": "Single Parent Now",
    //         "image": "http://c.saavncdn.com/659/The-Show-Tune-Style-Collection-English-2019-20190921093011-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/659/The-Show-Tune-Style-Collection-English-2019-20190921093011-500x500.jpg",
    //         "album": "The Show Tune Style Collection",
    //         "url": "https://www.jiosaavn.com/song/single-parent-now/NwUJfgNfQEk",
    //         "description": "Single Parent Now",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "753Lk4us",
    //         "title": "The Truth Is",
    //         "image": "http://c.saavncdn.com/659/The-Show-Tune-Style-Collection-English-2019-20190921093011-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/659/The-Show-Tune-Style-Collection-English-2019-20190921093011-500x500.jpg",
    //         "album": "The Show Tune Style Collection",
    //         "url": "https://www.jiosaavn.com/song/the-truth-is/R11YfR8EQkA",
    //         "description": "The Truth Is",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "ZDeCErI-",
    //         "title": "Your August",
    //         "image": "http://c.saavncdn.com/432/Your-August-English-2019-20190605173230-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/432/Your-August-English-2019-20190605173230-500x500.jpg",
    //         "album": "Your August",
    //         "url": "https://www.jiosaavn.com/song/your-august/KiwOcjFCfh4",
    //         "description": "Your August",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "PtK-pDsU",
    //         "title": "The Fall",
    //         "image": "http://c.saavncdn.com/071/The-Fall-English-2018-20180713123030-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/071/The-Fall-English-2018-20180713123030-500x500.jpg",
    //         "album": "The Fall",
    //         "url": "https://www.jiosaavn.com/song/the-fall/IBwgHAR0RGY",
    //         "description": "The Fall",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "0rcZN7QU",
    //         "title": "And I Love You (Instrumental Version)",
    //         "image": "http://c.saavncdn.com/920/Guitar-Instrumentals-English-2019-20190625213045-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/920/Guitar-Instrumentals-English-2019-20190625213045-500x500.jpg",
    //         "album": "Guitar Instrumentals",
    //         "url": "https://www.jiosaavn.com/song/and-i-love-you-instrumental-version/QBoIazoHZmY",
    //         "description": "And I Love You (Instrumental Version)",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "4uxo-oRj",
    //         "title": "When Words Fail",
    //         "image": "http://c.saavncdn.com/344/When-Words-Fail-English-2019-20190423133135-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/344/When-Words-Fail-English-2019-20190423133135-500x500.jpg",
    //         "album": "When Words Fail",
    //         "url": "https://www.jiosaavn.com/song/when-words-fail/RB0TXllfZVk",
    //         "description": "When Words Fail",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "RC5YVeMc",
    //         "title": "I Used to Dream of You",
    //         "image": "http://c.saavncdn.com/907/I-Used-to-Dream-of-You-English-2019-20190820153120-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/907/I-Used-to-Dream-of-You-English-2019-20190820153120-500x500.jpg",
    //         "album": "I Used to Dream of You",
    //         "url": "https://www.jiosaavn.com/song/i-used-to-dream-of-you/IiteaCJVelA",
    //         "description": "I Used to Dream of You",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "ZAiBxFjm",
    //         "title": "To My Heart",
    //         "image": "http://c.saavncdn.com/659/The-Show-Tune-Style-Collection-English-2019-20190921093011-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/659/The-Show-Tune-Style-Collection-English-2019-20190921093011-500x500.jpg",
    //         "album": "The Show Tune Style Collection",
    //         "url": "https://www.jiosaavn.com/song/to-my-heart/KikCcwx2XV4",
    //         "description": "To My Heart",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "3A4qwHmb",
    //         "title": "My Frozen Heart",
    //         "image": "http://c.saavncdn.com/576/My-Frozen-Heart-English-2018-20180727043026-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/576/My-Frozen-Heart-English-2018-20180727043026-500x500.jpg",
    //         "album": "My Frozen Heart",
    //         "url": "https://www.jiosaavn.com/song/my-frozen-heart/QylfQAN4WlE",
    //         "description": "My Frozen Heart",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "3uf6Z5Oi",
    //         "title": "Ebb and Flow",
    //         "image": "http://c.saavncdn.com/306/Ebb-and-Flow-English-2017-20171006163414-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/306/Ebb-and-Flow-English-2017-20171006163414-500x500.jpg",
    //         "album": "Ebb and Flow",
    //         "url": "https://www.jiosaavn.com/song/ebb-and-flow/Qx0NBy4FeFo",
    //         "description": "Ebb and Flow",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "goxdfg6M",
    //         "title": "Tomorrow",
    //         "image": "http://c.saavncdn.com/659/The-Show-Tune-Style-Collection-English-2019-20190921093011-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/659/The-Show-Tune-Style-Collection-English-2019-20190921093011-500x500.jpg",
    //         "album": "The Show Tune Style Collection",
    //         "url": "https://www.jiosaavn.com/song/tomorrow/FwcTVRJXAX4",
    //         "description": "Tomorrow",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "5GBdgPD-",
    //         "title": "Makes Me Sad",
    //         "image": "http://c.saavncdn.com/279/Makes-Me-Sad-English-2018-20180713123313-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/279/Makes-Me-Sad-English-2018-20180713123313-500x500.jpg",
    //         "album": "Makes Me Sad",
    //         "url": "https://www.jiosaavn.com/song/makes-me-sad/RS8pVRNgcx4",
    //         "description": "Makes Me Sad",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "s-ekSuqN",
    //         "title": "Captain with His Ship (Instrumental Version)",
    //         "image": "http://c.saavncdn.com/920/Guitar-Instrumentals-English-2019-20190625213045-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/920/Guitar-Instrumentals-English-2019-20190625213045-500x500.jpg",
    //         "album": "Guitar Instrumentals",
    //         "url": "https://www.jiosaavn.com/song/captain-with-his-ship-instrumental-version/A0UOWidFRn0",
    //         "description": "Captain with His Ship (Instrumental Version)",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "5-ZHd_0z",
    //         "title": "Abandoned and Forgotten (Instrumental Version)",
    //         "image": "http://c.saavncdn.com/920/Guitar-Instrumentals-English-2019-20190625213045-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/920/Guitar-Instrumentals-English-2019-20190625213045-500x500.jpg",
    //         "album": "Guitar Instrumentals",
    //         "url": "https://www.jiosaavn.com/song/abandoned-and-forgotten-instrumental-version/RUUxeRBvB0k",
    //         "description": "Abandoned and Forgotten (Instrumental Version)",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "ygiq8HPF",
    //         "title": "Vic",
    //         "image": "http://c.saavncdn.com/843/Vic-English-2018-20180111113434-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/843/Vic-English-2018-20180111113434-500x500.jpg",
    //         "album": "Vic",
    //         "url": "https://www.jiosaavn.com/song/vic/CQ8CQEx4Z3U",
    //         "description": "Vic",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "rl9KFhw1",
    //         "title": "Warm Thunderstorm",
    //         "image": "http://c.saavncdn.com/562/Warm-Thunderstorm-English-2018-20180713043132-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/562/Warm-Thunderstorm-English-2018-20180713043132-500x500.jpg",
    //         "album": "Warm Thunderstorm",
    //         "url": "https://www.jiosaavn.com/song/warm-thunderstorm/AgRSejJYQAI",
    //         "description": "Warm Thunderstorm",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "JYRlmDVW",
    //         "title": "Unwind",
    //         "image": "http://c.saavncdn.com/163/Unwind-English-2018-20180713123021-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/163/Unwind-English-2018-20180713123021-500x500.jpg",
    //         "album": "Unwind",
    //         "url": "https://www.jiosaavn.com/song/unwind/OjE5XRl0YWQ",
    //         "description": "Unwind",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "Q0MXfbX4",
    //         "title": "Little Squaw (Instrumental Version)",
    //         "image": "http://c.saavncdn.com/920/Guitar-Instrumentals-English-2019-20190625213045-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/920/Guitar-Instrumentals-English-2019-20190625213045-500x500.jpg",
    //         "album": "Guitar Instrumentals",
    //         "url": "https://www.jiosaavn.com/song/little-squaw-instrumental-version/IVgmaRJSbwc",
    //         "description": "Little Squaw (Instrumental Version)",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "jayvEJQA",
    //         "title": "Heroes Fall",
    //         "image": "http://c.saavncdn.com/659/The-Show-Tune-Style-Collection-English-2019-20190921093011-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/659/The-Show-Tune-Style-Collection-English-2019-20190921093011-500x500.jpg",
    //         "album": "The Show Tune Style Collection",
    //         "url": "https://www.jiosaavn.com/song/heroes-fall/GgkSRzF6ZnI",
    //         "description": "Heroes Fall",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "ND4zPUr8",
    //         "title": "Rocky Mountain High",
    //         "image": "http://c.saavncdn.com/999/Rocky-Mountain-High-English-2019-20190731103637-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/999/Rocky-Mountain-High-English-2019-20190731103637-500x500.jpg",
    //         "album": "Rocky Mountain High",
    //         "url": "https://www.jiosaavn.com/song/rocky-mountain-high/PixfSyRlRQs",
    //         "description": "Rocky Mountain High",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Mike Taylor",
    //           "John Denver",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "NfZGVyvO",
    //         "title": "Crystal Ball and Chain",
    //         "image": "http://c.saavncdn.com/738/Crystal-Ball-and-Chain-English-2016-20180826153316-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/738/Crystal-Ball-and-Chain-English-2016-20180826153316-500x500.jpg",
    //         "album": "Crystal Ball and Chain",
    //         "url": "https://www.jiosaavn.com/song/crystal-ball-and-chain/Pg4xdiJJQXw",
    //         "description": "Crystal Ball and Chain",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "E8CUtfuP",
    //         "title": "Come to My Island",
    //         "image": "http://c.saavncdn.com/110/The-Best-of-Ed-Verner-and-Lyrics-Logic-and-Lullabies-English-2019-20190331043037-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/110/The-Best-of-Ed-Verner-and-Lyrics-Logic-and-Lullabies-English-2019-20190331043037-500x500.jpg",
    //         "album": "The Best of Ed Verner and Lyrics Logic and Lullabies",
    //         "url": "https://www.jiosaavn.com/song/come-to-my-island/NVAoZABWQmM",
    //         "description": "Come to My Island",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "rt2Vksc6",
    //         "title": "And I Love You",
    //         "image": "http://c.saavncdn.com/110/The-Best-of-Ed-Verner-and-Lyrics-Logic-and-Lullabies-English-2019-20190331043037-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/110/The-Best-of-Ed-Verner-and-Lyrics-Logic-and-Lullabies-English-2019-20190331043037-500x500.jpg",
    //         "album": "The Best of Ed Verner and Lyrics Logic and Lullabies",
    //         "url": "https://www.jiosaavn.com/song/and-i-love-you/AhxZZx9DVAU",
    //         "description": "And I Love You",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "6C1ydyJL",
    //         "title": "Captain with His Ship",
    //         "image": "http://c.saavncdn.com/110/The-Best-of-Ed-Verner-and-Lyrics-Logic-and-Lullabies-English-2019-20190331043037-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/110/The-Best-of-Ed-Verner-and-Lyrics-Logic-and-Lullabies-English-2019-20190331043037-500x500.jpg",
    //         "album": "The Best of Ed Verner and Lyrics Logic and Lullabies",
    //         "url": "https://www.jiosaavn.com/song/captain-with-his-ship/RitaSBBJfX8",
    //         "description": "Captain with His Ship",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "24AD2mak",
    //         "title": "Give to Me Tonight",
    //         "image": "http://c.saavncdn.com/110/The-Best-of-Ed-Verner-and-Lyrics-Logic-and-Lullabies-English-2019-20190331043037-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/110/The-Best-of-Ed-Verner-and-Lyrics-Logic-and-Lullabies-English-2019-20190331043037-500x500.jpg",
    //         "album": "The Best of Ed Verner and Lyrics Logic and Lullabies",
    //         "url": "https://www.jiosaavn.com/song/give-to-me-tonight/QlwqdUZdVlg",
    //         "description": "Give to Me Tonight",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "EPlPnC70",
    //         "title": "It's Enough",
    //         "image": "http://c.saavncdn.com/110/The-Best-of-Ed-Verner-and-Lyrics-Logic-and-Lullabies-English-2019-20190331043037-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/110/The-Best-of-Ed-Verner-and-Lyrics-Logic-and-Lullabies-English-2019-20190331043037-500x500.jpg",
    //         "album": "The Best of Ed Verner and Lyrics Logic and Lullabies",
    //         "url": "https://www.jiosaavn.com/song/its-enough/NTgHYRpzAAM",
    //         "description": "It's Enough",
    //         "primary_artists": "Lyrics Logic and Lullabies",
    //         "singers": [
    //           "Edward Miller Verner",
    //           "Lyrics Logic and Lullabies"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       }
    //     ]
    //   },
    //   {
    //     "artist_id": "7425454",
    //     "token_id": "zgdL9rLq4gg_",
    //     "name": "SinghWithLogic",
    //     "image": "https://static.saavncdn.com/_i/share-image-2.png",
    //     "full_image": "https://static.saavncdn.com/_i/share-image-2.png",
    //     "url": "https://www.jiosaavn.com/artist/singhwithlogic/zgdL9rLq4gg_",
    //     "description": "SinghWithLogic",
    //     "songs": [
    //       {
    //         "song_id": "sKObnC3q",
    //         "title": "Depend On Mood",
    //         "image": "http://c.saavncdn.com/916/Depend-On-Mood-Punjabi-2020-20201127114007-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/916/Depend-On-Mood-Punjabi-2020-20201127114007-500x500.jpg",
    //         "album": "Depend On Mood",
    //         "url": "https://www.jiosaavn.com/song/depend-on-mood/AyMkUxpzBEI",
    //         "description": "Depend On Mood",
    //         "primary_artists": "Ranjit Bawa",
    //         "singers": [
    //           "SinghWithLogic",
    //           "Ranjit Bawa",
    //           "Kahlon"
    //         ],
    //         "language": "punjabi",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "mtPucWeu",
    //         "title": "Jatta Ve",
    //         "image": "http://c.saavncdn.com/093/Jatta-Ve-Punjabi-2022-20220131120516-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/093/Jatta-Ve-Punjabi-2022-20220131120516-500x500.jpg",
    //         "album": "Jatta Ve",
    //         "url": "https://www.jiosaavn.com/song/jatta-ve/HRw7RBdnUkY",
    //         "description": "Jatta Ve",
    //         "primary_artists": "Ranjit Bawa",
    //         "singers": [
    //           "SinghWithLogic",
    //           "Ranjit Bawa",
    //           "Kahlon"
    //         ],
    //         "language": "punjabi",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": "https://jiotunepreview.jio.com/content/Converted/010912261464681.mp3"
    //       },
    //       {
    //         "song_id": "X46V37lN",
    //         "title": "Mistaken",
    //         "image": "http://c.saavncdn.com/775/Mistaken-Punjabi-2020-20201124173448-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/775/Mistaken-Punjabi-2020-20201124173448-500x500.jpg",
    //         "album": "Mistaken",
    //         "url": "https://www.jiosaavn.com/song/mistaken/KFxdZ0cHW30",
    //         "description": "Mistaken",
    //         "primary_artists": "Dilraj Grewal",
    //         "singers": [
    //           "SinghWithLogic",
    //           "Dilraj Grewal",
    //           "Dilraj Grewal"
    //         ],
    //         "language": "punjabi",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": "https://jiotunepreview.jio.com/content/Converted/010910391157139.mp3"
    //       },
    //       {
    //         "song_id": "NUYDhRpC",
    //         "title": "Hustle",
    //         "image": "http://c.saavncdn.com/586/Bottles-Guns-Punjabi-2021-20210605101334-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/586/Bottles-Guns-Punjabi-2021-20210605101334-500x500.jpg",
    //         "album": "Bottles & Guns",
    //         "url": "https://www.jiosaavn.com/song/hustle/Pj0ydRxiR3A",
    //         "description": "Hustle",
    //         "primary_artists": "Dilraj Grewal",
    //         "singers": [
    //           "SinghWithLogic",
    //           "Dilraj Grewal",
    //           "Dilraj Grewal"
    //         ],
    //         "language": "punjabi",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": "https://jiotunepreview.jio.com/content/Converted/010910391152117.mp3"
    //       },
    //       {
    //         "song_id": "yKkdxoWa",
    //         "title": "Udeek",
    //         "image": "http://c.saavncdn.com/011/Udeek-Punjabi-2021-20210416133158-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/011/Udeek-Punjabi-2021-20210416133158-500x500.jpg",
    //         "album": "Udeek",
    //         "url": "https://www.jiosaavn.com/song/udeek/CSMAVQxfYFI",
    //         "description": "Udeek",
    //         "primary_artists": "Dilraj Grewal",
    //         "singers": [
    //           "SinghWithLogic",
    //           "Dilraj Grewal",
    //           "Sabdil Sandhu"
    //         ],
    //         "language": "punjabi",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": "https://jiotunepreview.jio.com/content/Converted/010910391213665.mp3"
    //       },
    //       {
    //         "song_id": "V_-qLFgG",
    //         "title": "Think About It",
    //         "image": "http://c.saavncdn.com/273/Think-About-It-Punjabi-2022-20220118170918-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/273/Think-About-It-Punjabi-2022-20220118170918-500x500.jpg",
    //         "album": "Think About It",
    //         "url": "https://www.jiosaavn.com/song/think-about-it/JjdGQDh2UHQ",
    //         "description": "Think About It",
    //         "primary_artists": "SinghWithLogic",
    //         "singers": [
    //           "SinghWithLogic"
    //         ],
    //         "language": "punjabi",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "3oHcb5pr",
    //         "title": "Hoya Tere Nal",
    //         "image": "http://c.saavncdn.com/497/Hoya-Tere-Nal-Punjabi-2021-20211115200954-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/497/Hoya-Tere-Nal-Punjabi-2021-20211115200954-500x500.jpg",
    //         "album": "Hoya Tere Nal",
    //         "url": "https://www.jiosaavn.com/song/hoya-tere-nal/QwcjUhYFR0E",
    //         "description": "Hoya Tere Nal",
    //         "primary_artists": "SinghWithLogic",
    //         "singers": [
    //           "SinghWithLogic"
    //         ],
    //         "language": "punjabi",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "BNPANUvy",
    //         "title": "Harley",
    //         "image": "http://c.saavncdn.com/586/Bottles-Guns-Punjabi-2021-20210605101334-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/586/Bottles-Guns-Punjabi-2021-20210605101334-500x500.jpg",
    //         "album": "Bottles & Guns",
    //         "url": "https://www.jiosaavn.com/song/harley/MiY7cDplQUo",
    //         "description": "Harley",
    //         "primary_artists": "Dilraj Grewal",
    //         "singers": [
    //           "SinghWithLogic",
    //           "Dilraj Grewal",
    //           "Dilraj Grewal"
    //         ],
    //         "language": "punjabi",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": "https://jiotunepreview.jio.com/content/Converted/010910391274584.mp3"
    //       },
    //       {
    //         "song_id": "Um4oS-ew",
    //         "title": "Taare",
    //         "image": "http://c.saavncdn.com/531/Taare-Bengali-2021-20211206180310-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/531/Taare-Bengali-2021-20211206180310-500x500.jpg",
    //         "album": "Taare",
    //         "url": "https://www.jiosaavn.com/song/taare/JQVfXicdUkQ",
    //         "description": "Taare",
    //         "primary_artists": "SinghWithLogic",
    //         "singers": [
    //           "SinghWithLogic"
    //         ],
    //         "language": "bengali",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "swyvfNb6",
    //         "title": "SUBA (Singh Upon the Beat Again)",
    //         "image": "http://c.saavncdn.com/282/SUBA-Singh-Upon-the-Beat-Again--English-2021-20211105181245-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/282/SUBA-Singh-Upon-the-Beat-Again--English-2021-20211105181245-500x500.jpg",
    //         "album": "SUBA (Singh Upon the Beat Again)",
    //         "url": "https://www.jiosaavn.com/song/suba-singh-upon-the-beat-again/Ax8SRxJ,VQU",
    //         "description": "SUBA (Singh Upon the Beat Again)",
    //         "primary_artists": "SinghWithLogic",
    //         "singers": [
    //           "SinghWithLogic"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "bgrItx7E",
    //         "title": "Day & Nite",
    //         "image": "http://c.saavncdn.com/243/Day-Nite-English-2021-20211122170448-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/243/Day-Nite-English-2021-20211122170448-500x500.jpg",
    //         "album": "Day & Nite",
    //         "url": "https://www.jiosaavn.com/song/day--nite/Eg8ZeABIAHY",
    //         "description": "Day & Nite",
    //         "primary_artists": "SinghWithLogic",
    //         "singers": [
    //           "SinghWithLogic"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "Kiv5b63O",
    //         "title": "Godfather",
    //         "image": "http://c.saavncdn.com/586/Bottles-Guns-Punjabi-2021-20210605101334-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/586/Bottles-Guns-Punjabi-2021-20210605101334-500x500.jpg",
    //         "album": "Bottles & Guns",
    //         "url": "https://www.jiosaavn.com/song/godfather/OwEdBBYGBHw",
    //         "description": "Godfather",
    //         "primary_artists": "Dilraj Grewal",
    //         "singers": [
    //           "SinghWithLogic",
    //           "Dilraj Grewal",
    //           "Dilraj Grewal"
    //         ],
    //         "language": "punjabi",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": "https://jiotunepreview.jio.com/content/Converted/010910391173735.mp3"
    //       },
    //       {
    //         "song_id": "6L7KaQeJ",
    //         "title": "Bagge Jatt",
    //         "image": "http://c.saavncdn.com/586/Bottles-Guns-Punjabi-2021-20210605101334-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/586/Bottles-Guns-Punjabi-2021-20210605101334-500x500.jpg",
    //         "album": "Bottles & Guns",
    //         "url": "https://www.jiosaavn.com/song/bagge-jatt/RiRcehVhUnk",
    //         "description": "Bagge Jatt",
    //         "primary_artists": "Dilraj Grewal",
    //         "singers": [
    //           "SinghWithLogic",
    //           "Dilraj Grewal",
    //           "Dilraj Grewal"
    //         ],
    //         "language": "punjabi",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": "https://jiotunepreview.jio.com/content/Converted/010910391274586.mp3"
    //       },
    //       {
    //         "song_id": "o51LDo7a",
    //         "title": "Bapu",
    //         "image": "http://c.saavncdn.com/586/Bottles-Guns-Punjabi-2021-20210605101334-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/586/Bottles-Guns-Punjabi-2021-20210605101334-500x500.jpg",
    //         "album": "Bottles & Guns",
    //         "url": "https://www.jiosaavn.com/song/bapu/H11afTBfAFI",
    //         "description": "Bapu",
    //         "primary_artists": "Dilraj Grewal",
    //         "singers": [
    //           "SinghWithLogic",
    //           "Dilraj Grewal",
    //           "Dilraj Grewal"
    //         ],
    //         "language": "punjabi",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": "https://jiotunepreview.jio.com/content/Converted/010910391274582.mp3"
    //       },
    //       {
    //         "song_id": "9j8UBU_U",
    //         "title": "Overflow",
    //         "image": "http://c.saavncdn.com/738/Overflow-Punjabi-2020-20220803041906-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/738/Overflow-Punjabi-2020-20220803041906-500x500.jpg",
    //         "album": "Overflow",
    //         "url": "https://www.jiosaavn.com/song/overflow/SQJTZDZlaGY",
    //         "description": "Overflow",
    //         "primary_artists": "Hairat Aulakh",
    //         "singers": [
    //           "SinghWithLogic",
    //           "Hairat Aulakh",
    //           "Navi Dhaliwal"
    //         ],
    //         "language": "punjabi",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": null
    //       },
    //       {
    //         "song_id": "EpE1gFio",
    //         "title": "Club",
    //         "image": "http://c.saavncdn.com/586/Bottles-Guns-Punjabi-2021-20210605101334-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/586/Bottles-Guns-Punjabi-2021-20210605101334-500x500.jpg",
    //         "album": "Bottles & Guns",
    //         "url": "https://www.jiosaavn.com/song/club/NRguABN2Xlw",
    //         "description": "Club",
    //         "primary_artists": "Dilraj Grewal",
    //         "singers": [
    //           "SinghWithLogic",
    //           "Dilraj Grewal",
    //           "Dilraj Grewal"
    //         ],
    //         "language": "punjabi",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": null,
    //         "genre": null,
    //         "preview_url": "https://jiotunepreview.jio.com/content/Converted/010910391274585.mp3"
    //       }
    //     ]
    //   },
    //   {
    //     "album_id": "15972008",
    //     "token_id": "U9CcDlES9wI_",
    //     "title": "Isis",
    //     "image": "http://c.saavncdn.com/593/Isis-English-2019-20190522171557-50x50.jpg",
    //     "full_image": "http://c.saavncdn.com/593/Isis-English-2019-20190522171557-500x500.jpg",
    //     "album": null,
    //     "url": "https://www.jiosaavn.com/album/isis/U9CcDlES9wI_",
    //     "description": "2019 · English Album · Joyner Lucas",
    //     "artist": "Joyner Lucas",
    //     "language": null,
    //     "year": 2019,
    //     "genre": null,
    //     "preview_url": null,
    //     "song_pids": [
    //       "b2LWOt7S"
    //     ],
    //     "songs": [
    //       {
    //         "song_id": "b2LWOt7S",
    //         "title": "Isis",
    //         "image": "http://c.saavncdn.com/593/Isis-English-2019-20190522171557-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/593/Isis-English-2019-20190522171557-500x500.jpg",
    //         "album": "Isis",
    //         "url": "https://www.jiosaavn.com/song/isis/ElonZjtEAGA",
    //         "description": "Isis",
    //         "primary_artists": "Joyner Lucas",
    //         "singers": [
    //           "Joyner Lucas",
    //           "Logic"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2019-05-23T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       }
    //     ]
    //   },
    //   {
    //     "album_id": "12359398",
    //     "token_id": "JW5qCNMHkrQ_",
    //     "title": "Everyday",
    //     "image": "http://c.saavncdn.com/879/Everyday-English-2018-20180302041506-50x50.jpg",
    //     "full_image": "http://c.saavncdn.com/879/Everyday-English-2018-20180302041506-500x500.jpg",
    //     "album": null,
    //     "url": "https://www.jiosaavn.com/album/everyday/JW5qCNMHkrQ_",
    //     "description": "2018 · English Album · Logic, Marshmello",
    //     "artist": "Logic, Marshmello",
    //     "language": null,
    //     "year": 2018,
    //     "genre": null,
    //     "preview_url": null,
    //     "song_pids": [
    //       "C2qFBxhC"
    //     ],
    //     "songs": [
    //       {
    //         "song_id": "C2qFBxhC",
    //         "title": "Everyday",
    //         "image": "http://c.saavncdn.com/879/Everyday-English-2018-20180302041506-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/879/Everyday-English-2018-20180302041506-500x500.jpg",
    //         "album": "Everyday",
    //         "url": "https://www.jiosaavn.com/song/everyday/M1oadzZIX3A",
    //         "description": "Everyday",
    //         "primary_artists": "Logic",
    //         "singers": [
    //           "Marshmello",
    //           "Sir Robert Bryson Hall II",
    //           "Logic",
    //           "Marshmello",
    //           "Marshmello",
    //           "Sir Robert Bryson Hall II"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2018-03-02T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       }
    //     ]
    //   },
    //   {
    //     "album_id": "12531648",
    //     "token_id": "5vj1lwPaNGY_",
    //     "title": "Pray",
    //     "image": "http://c.saavncdn.com/022/Pray-English-2018-20180328130238-50x50.jpg",
    //     "full_image": "http://c.saavncdn.com/022/Pray-English-2018-20180328130238-500x500.jpg",
    //     "album": null,
    //     "url": "https://www.jiosaavn.com/album/pray/5vj1lwPaNGY_",
    //     "description": "2018 · English Album · Sam Smith",
    //     "artist": "Sam Smith",
    //     "language": null,
    //     "year": 2018,
    //     "genre": null,
    //     "preview_url": null,
    //     "song_pids": [
    //       "w-3zlGpa"
    //     ],
    //     "songs": [
    //       {
    //         "song_id": "w-3zlGpa",
    //         "title": "Pray",
    //         "image": "http://c.saavncdn.com/022/Pray-English-2018-20180328130238-150x150.jpg",
    //         "full_image": "http://c.saavncdn.com/022/Pray-English-2018-20180328130238-500x500.jpg",
    //         "album": "Pray",
    //         "url": "https://www.jiosaavn.com/song/pray/B0VYSxh3R1I",
    //         "description": "Pray",
    //         "primary_artists": "Sam Smith",
    //         "singers": [
    //           "Sam Smith",
    //           "Darryl Pearson",
    //           "James Napier",
    //           "Timothy Mosley",
    //           "Larrance Dopson",
    //           "Jose Valasquez",
    //           "Robert Hall",
    //           "Sam Smith",
    //           "Sam Smith",
    //           "Darryl Pearson",
    //           "James Napier",
    //           "Timothy Mosley",
    //           "Larrance Dopson",
    //           "Jose Valasquez",
    //           "Robert Hall"
    //         ],
    //         "language": "english",
    //         "encrypted_media_url": null,
    //         "duration": null,
    //         "release_date": "2018-03-29T00:00:00",
    //         "genre": null,
    //         "preview_url": null
    //       }
    //     ]
    //   },
    //   {
    //     "song_id": "vostbtmZ",
    //     "title": "Sucker for Pain (with Logic, Ty Dolla $ign & X Ambassadors)",
    //     "image": "http://c.saavncdn.com/462/Suicide-Squad-The-Album-English-2016-20190607043708-50x50.jpg",
    //     "full_image": "http://c.saavncdn.com/462/Suicide-Squad-The-Album-English-2016-20190607043708-500x500.jpg",
    //     "album": "Suicide Squad: The Album",
    //     "url": "https://www.jiosaavn.com/song/sucker-for-pain-with-logic-ty-dolla-%24ign--x-ambassadors/BgcYRRZEWmk",
    //     "description": "Lil Wayne, Wiz Khalifa, Imagine Dragons · Suicide Squad: The Album",
    //     "primary_artists": "Lil Wayne, Wiz Khalifa, Imagine Dragons",
    //     "singers": [
    //       "Lil Wayne",
    //       "Wiz Khalifa",
    //       "Imagine Dragons"
    //     ],
    //     "language": "english",
    //     "encrypted_media_url": null,
    //     "duration": null,
    //     "release_date": null,
    //     "genre": null,
    //     "preview_url": "https://jiotunepreview.jio.com/content/Converted/010910140250682.mp3"
    //   },
    //   {
    //     "song_id": "nuxmeh6Q",
    //     "title": "1-800-273-8255",
    //     "image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-50x50.jpg",
    //     "full_image": "http://c.saavncdn.com/685/Everybody-English-2017-20200429001200-500x500.jpg",
    //     "album": "Everybody",
    //     "url": "https://www.jiosaavn.com/song/1-800-273-8255/Hh0TXBFYAWI",
    //     "description": "Logic · Everybody",
    //     "primary_artists": "Logic",
    //     "singers": [
    //       "Logic"
    //     ],
    //     "language": "english",
    //     "encrypted_media_url": null,
    //     "duration": null,
    //     "release_date": null,
    //     "genre": null,
    //     "preview_url": "https://jiotunepreview.jio.com/content/Converted/010912291568585.mp3"
    //   },
    //   {
    //     "song_id": "NyZ5QxmL",
    //     "title": "Homicide",
    //     "image": "http://c.saavncdn.com/898/Confessions-of-a-Dangerous-Mind-English-2019-20190707230505-50x50.jpg",
    //     "full_image": "http://c.saavncdn.com/898/Confessions-of-a-Dangerous-Mind-English-2019-20190707230505-500x500.jpg",
    //     "album": "Confessions of a Dangerous Mind",
    //     "url": "https://www.jiosaavn.com/song/homicide/PhExBCVIWn8",
    //     "description": "Logic · Confessions of a Dangerous Mind",
    //     "primary_artists": "Logic",
    //     "singers": [
    //       "Logic"
    //     ],
    //     "language": "english",
    //     "encrypted_media_url": null,
    //     "duration": null,
    //     "release_date": null,
    //     "genre": null,
    //     "preview_url": null
    //   }
    // ];

    useEffect(() => {
      props.setResultData(data);

      if (data.length == 0) {
        props.setResultPresent(false);
      } else {
        props.setResultPresent(true);
      }
    }, []);
    
  };

  if (!props.resultPresent) {
    modifySearch('a');
  }

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