import React, { useEffect, useState } from "react";
import Login, { getAccessToken } from "./Components/Login/Login";
import SpotifyWebApi from "spotify-web-api-js";
import Get_playlist from "./Components/Get_playlist/Get_Playlist";
import { useDataLayerValue } from "./Components/DataLayer";
import "./App.css";
import CurrentlyPlaying from "./Components/CurrentlyPlaying/CurrentlyPlaying"
import Home from "./Components/Home/Home";
import AbouttheDeveloper from "./Components/AbouttheDeveloper/AbouttheDeveloper";
import Setting from "./Components/Home/Setting/Setting";
import Get_Artist from "./Components/Get_Artist/Get_Artist";

function App() {
  const spotify = new SpotifyWebApi();

  const [{ user, searched_track, dailyMix, renderCurrentlyPlaying, token, renderPlaylist, get_artist, user_playlists, setting, show_playing, playlist, about_dev, searched_id, searched_album, searched_artists, artist}, dispatch] = useDataLayerValue();

  const [say, setSay] = useState(false);
  const [selected, setSelected] = useState(false);

  const data = [
      {
          name: `Welcome Back, `,
          sayName: true,
          title: "LIVE, LET LIVE",
          type: 'playlist',
          id: '11crkMBuXKIKthYDEUKQc1'
      },{
          name: `Welcome Home, Daddy`,
          title: 'Be Strong, Be A Dad for All.',
          type: 'song',
          id: "4wCy7erulqUfFQNVaZBD9b",
      },{
          name: `Missed you `,
          sayName: true,
          title: "I guess she'll miss you too",
          type: 'song',
          id: "6PJ8FF6UR8FZXfEvpHkIVN",
      }, {
          name: `Lemme tell you one truth `,
          sayName: false,
          title: 'Ne um Nanu vera ila da, Redu perum Joker p**da da',
          type: 'playlist',
          id: "7Bm4RkvxPlmoDyxH1Q5hZG",
      }, {
          name: `Chill `,
          sayName: true,
          title: "She's falling for you",
          type: 'song',
          id: "1aEsTgCsv8nOjEgyEoRCpS",
      }, 
      // {
      //     name : 'Hoolaaaa',
      //     sayName: true,
      //     title: 'Atleast you have this playlist to call it mine <3',
      //     type: 'playlist',
      //     id: `${playlist?.id}`
      // }
  ]

  useEffect(() => {
    const random = Math.floor(Math.random() * data.length);
    setSelected(data[random]);
  }, [token])


  useEffect(() => {
    const taki = getAccessToken().access_token;
    window.location.hash = "";

    if(selected){
      console.log(selected);
      dispatch({
        type: 'SET_GREETINGS',
        greetings: selected,
      })
    }

    if(taki){
      spotify.setAccessToken(taki);
      spotify.getMe().then(data => {
        console.log(data, "its here")
        dispatch({
          type: 'SET_USER',
          user: data,
        })
      })
      dispatch({
        type: "SET_TOKEN",
        token: taki,
      })
      spotify.getUserPlaylists(user).then(data => {
        dispatch({
          type: 'USER_PLAYLISTS',
          user_playlists: data,
        })
      })
      spotify.searchPlaylists("broken", { limit: 7 }).then(data => {
        dispatch({
          type: 'SET_SAD_FEATURED_FOR_USERS',
          sad_featured_for_users: data,
        })
      })
      spotify.searchPlaylists("lonely", { limit: 7 }).then(data => {
        console.log(data, "love love");
        dispatch({
          type: 'SET_LONELY_FEATURED_FOR_USERS',
          lonely_featured_for_users: data,
        })
      })
      spotify.searchPlaylists("country charts", {limit : 5}).then(data => {
        dispatch({
          type: 'DAILY_MIX',
          dailyMix: data,
        })
      })
      spotify.searchPlaylists("love", { limit: 7 }).then(data => {
        dispatch({
          type: 'SET_HAPPY_FEATURED_FOR_USERS',
          happy_featured_for_users: data,
        })
      })
      spotify.getNewReleases({ limit: 7 }).then(data => {
        console.log(data, 'new release data');
        dispatch({
          type: 'SET_NEW_RELEASE',
          new_release: data,
        })
      })
      spotify.getUser("4f3qbs9y4cz5an8ldyf27l7es").then(data => {
        console.log(data, "user var");
        dispatch({
          type: 'SET_DEVELOPER',
          set_developer: data,
        })
      })
    }
  }, [token])

  return (
    // token ? <Get_Artist/> : <Login />
    token ? renderCurrentlyPlaying ? <CurrentlyPlaying /> :  renderPlaylist ? <Get_playlist /> : get_artist ? <Get_Artist/> : about_dev ? <AbouttheDeveloper /> : setting ? <Setting /> : <Home /> : <Login />
  )
}

export default App;