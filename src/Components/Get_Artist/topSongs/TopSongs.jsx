import React, { useEffect } from "react";
import "./TopSongs.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../../DataLayer";

const TopSongs = () => {

    const [{ top_songs_for_artist }, dispatch] = useDataLayerValue();
    const spotify = new SpotifyWebApi();

    const Handler = (e) => {
        console.log(e?.target?.parentElement?.childNodes?.[3]?.innerHTML);
        console.log(e?.target?.parentElement?.parentElement?.childNodes?.[0]?.childNodes?.[0]?.childNodes?.[3]?.innerHTML);
        console.log(e?.target?.parentElement?.parentElement?.childNodes?.[3]?.innerHTML);
        spotify.getTrack(e?.target?.parentElement?.parentElement?.childNodes?.[3]?.innerHTML).then(data => {
            console.log(data, "what sbhould be given");
            dispatch({
                type: 'SEARCHED_ID',
                searched_id: data,
            })
            dispatch({
                type: 'RENDERCURRENTLYPLAYING',
                renderCurrentlyPlaying: true,
            })
        })
    }

    return(
        <div className="topSongs">
            <h3>Top songs</h3>
            <div className="containTopSong">
            {
                top_songs_for_artist?.tracks?.items?.map((item, i) => {
                    return(
                        <div className="topSongRow" onClick={Handler} key={i}>
                            <div className="leftMaja">
                                <div className="picWithName">
                                    <p>{i+1}</p>
                                    <img src={item?.album?.images?.[0]?.url} className="topSongPic"/>
                                    <div className="rendertheName">
                                        <h5>{item?.name}</h5>
                                    </div>
                                    <p style={{display: 'none'}}>{item.id}</p>
                                    <p style={{display: 'none'}}>whatisit</p>
                                </div>
                            </div>
                            <div className="rightMaja">
                                <MoreHorizIcon />
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default TopSongs;