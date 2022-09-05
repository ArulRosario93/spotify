import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import Profile from "./Profile/Profile";
import SongInfo from "./SongInfo/SongInfo";
import SpotifyWeb from "spotify-web-api-js";
// import Spotify from "../Home/Spotify/Spotify";
import { find_lyrics } from "@brandond/findthelyrics";
import { useDataLayerValue } from "../DataLayer";
import { FadeIn } from "react-slide-fade-in";

const CurrentlyPlaying = () => {

    const spotify = new SpotifyWeb();
    const [{searched_tracks, searched_track, lyric, single_track, searched_id}, dispatch] = useDataLayerValue();
    const [lyricHere, setLyricHere] = useState(null);

    console.log(searched_id, "aighi hey bbabe")

    useEffect(() => {
        find_lyrics(`${searched_id?.artists[0]?.name} - ${searched_id?.name}`).then((data) => {
                dispatch({
                    type: "SET_LYRIC",
                    lyric: data,
                })
            });

            try{
                setLyricHere(lyric)
            }catch(err){
                setLyricHere(null)
            }

            dispatch({
                type: 'SINGLE_TRACK',
                single_track: searched_id,
            })
        }, [searched_id, lyric]);

    return(
        <FadeIn
            from="bottom"
            positionOffset={0}
            triggerOffset={0}
            delayInMilliseconds={0}
        >
            <div>
                <Header songName={searched_id} artist={searched_id} sayItBUDDY={lyricHere} />
                <Profile img={searched_id} />
                {/* <SongInfo artist={searched_id} name={searched_id}/> */}
            </div>
        </FadeIn>
    )
}

export default CurrentlyPlaying