import React, { useEffect } from "react";
import "./TopSongs.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../../DataLayer";

const TopSongs = () => {

    const [{ top_songs_for_artist, searched_id }, dispatch] = useDataLayerValue();
    const spotify = new SpotifyWebApi();

    const Handler = (e, ID) => {
        spotify.getTrack(ID).then(data => {
            console.log(data, "whta now BUDDY")
            dispatch({
                type: 'SEARCHED_ID',
                searched_id: data,
            })
        })
        console.log(ID, "CAME HERE FINALLY");
    }

    return(
        <div className="topSongs">
            <h3>Top songs</h3>
            <div className="containTopSong">
            {
                top_songs_for_artist?.tracks?.items?.map((item, i) => {
                    return(
                        <div className="topSongRow" key={i}>
                            <div className="leftMaja">
                                <div className="picWithName">
                                    <p>{i+1}</p>
                                    <img src={item?.album?.images?.[0]?.url} className="topSongPic"/>
                                    <div className="rendertheName" style={{color: `${searched_id?.id ? searched_id?.id === item?.track?.id ? "green" : searched_id?.id === item?.id ? "green" : null : null}`}}>
                                        <a  onClick={(e) => Handler(e, item)} href={`https://embed.spotify.com/?uri=${item?.track?.uri ? item?.track?.uri : item?.uri}&view=list&theme=light`} target="_blank">
                                            <h5>{item?.name}</h5>
                                        </a>
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