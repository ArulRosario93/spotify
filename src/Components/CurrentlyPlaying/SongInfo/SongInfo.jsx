import React, { useState, useEffect } from "react";
import "./SongInfo.css"
import { useDataLayerValue } from "../../DataLayer";
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LinearProgress from '@mui/material/LinearProgress';
import SpotifyWebApi from "spotify-web-api-js";

const SongInfo = ({ name, artist }) => {

    const [progress, setProgress] = useState(69);
    const spotify = new SpotifyWebApi();
    const [{get_artist, renderCurrentlyPlaying, top_songs_for_artist}, dispatch] = useDataLayerValue();

    const handleClick = (e) => {
        spotify.searchTracks(e?.target?.innerHTML, { limit:5 }).then(data => {
            dispatch({
                type: "SET_TOP_SONGS_FOR_ARTIST",
                top_songs_for_artist: data,
            })
        })
        console.log(e);
        dispatch({
            type: 'GET_ARTIST',
            get_artist: true,
        })
        dispatch({
            type: 'RENDERCURRENTLYPLAYING',
            renderCurrentlyPlaying: false,
        })
        dispatch({
            type: 'RENDERPLAYLIST',
            renderPlaylist: false,
        })
        spotify.searchArtists(e?.target?.innerHTML, { limit:1 }).then(data => {
            console.log(data, "data here from artist");
            dispatch({
                type: 'SET_ARTIST_IMAGE',
                artist_image: data,
            })
        })
        spotify.getArtistAlbums(e?.target?.parentElement?.childNodes?.[2]?.innerHTML).then(data => {
            console.log(data, "data here from artist");
            dispatch({
                type: 'ARTIST_PAGE',
                artist_page: data,
            })
        })
    }

    const msTime = name?.duration_ms;

    const endTime = msTime/60000;

    const midTime = (endTime/100)*69;

    let [finalEndMainTime, finalEndDecTime] = String(endTime).split('.');
    let [finalMidMainTime, finalMidDecTime] = String(midTime).split('.');

    if(Number(finalEndDecTime?.slice(0, 1)) >= 6){
        finalEndMainTime = String(Number(finalEndMainTime) + 1);
        finalEndDecTime= "01";
    }

    if(Number(finalMidDecTime?.slice(0, 1)) >= 6){
        finalMidMainTime = String(Number(finalMidMainTime) + 1);
        finalMidDecTime= "02";
    }
    console.log(name, "name here");
    console.log(artist, "artist here");


    useEffect(() => {
        console.log(top_songs_for_artist);
        console.log(renderCurrentlyPlaying);
        console.log(get_artist, top_songs_for_artist);
    }, [dispatch])

    return(
        <div className="playingInfo">
            <div className="topRow">
                <div className="playingTracknArtist">
                    <div className="tracknArtist">
                        <h5>{name?.name}</h5>
                        <p onClick={handleClick}>{artist?.artists[0]?.name}</p>
                        <p style={{display: "none"}}>{name?.artists[0]?.id}</p>
                    </div>
                </div>
                <div className="like"><FavoriteIcon /></div>
            </div>
            <div className="timeCount">
                <div style={{color: 'green'}}><LinearProgress variant="determinate" value={69} /></div>
                <div className="timeNownEnd">
                    <div><p>{finalMidMainTime}:{finalMidDecTime?.slice(0, 2)}</p></div>
                    <div><p>{finalEndMainTime}:{finalEndDecTime?.slice(0, 2)}</p></div>
                </div>
            </div>
            <div className="trackManuplicate">
                <div style={{fontSize: 'small'}}><ShuffleOutlinedIcon /></div>
                <div style={{fontSize: 'small'}}><SkipPreviousOutlinedIcon /></div>
                <div style={{fontSize: 'large'}}><PlayCircleFilledOutlinedIcon /></div>
                <div style={{fontSize: 'small'}}><SkipNextOutlinedIcon /></div>
                <div style={{fontSize: 'small'}}><RepeatIcon /></div>
            </div>
        </div>
    )
}

export default SongInfo;