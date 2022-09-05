import React, { useEffect } from 'react';
import Setting from "./Setting.css";
import { useDataLayerValue } from '../../DataLayer';
import SpotifyWebApi from 'spotify-web-api-js';
import Header from './Header/Header';
import "./Setting.css";

const Settings = () => {

    const [{user, top_tracks, user_playlists, about_dev}, dispatch] = useDataLayerValue();

    const spotify = new SpotifyWebApi();

    const handleClick = () => {
        dispatch({
            type: 'ABOUT_DEV',
            about_dev: true,
        })
    }

    const Handler = (e) => {
        spotify.getPlaylist(e?.target?.parentElement?.childNodes[2]?.childNodes[0]?.data).then(data => {
            console.log(data, "nothing here")
            dispatch({
                type: 'RENDERPLAYLIST',
                renderPlaylist: true,
            })
            dispatch({
                type: 'PLAYLIST',
                playlist: data,
            })
        })
    }

    return(
        <div className="settings">
        <Header />
            <div className="topLayer">
                <div className='userProfile'>
                    <img src={user?.images?.[0]?.url}/>
                    <p>{user?.display_name}</p>
                </div>
            </div>
            <div className="zzooooommmIN">
                <h1>Playlists</h1>
                <div classname="containitall">
                {
                    user_playlists?.items?.map((item, i) => {
                        return(
                            <div className="LibrariesContent" key={i} onClick={Handler}>
                                <img loading="eager" src={item?.images[0]?.url}/>
                                <p>{item?.name}</p>
                                <p style={{display: 'none', className: 'child'}}>{item?.id}</p>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            <br />
            <br />
            <div className='bottom'>
                    <div>
                        <span>View on Spotify - </span>
                        <a href={`https://open.spotify.com/user/${user?.id}`}>{user?.display_name}</a>
                    </div>
                <h3 onClick={handleClick}>About Developer</h3>
            </div>
        </div>
    )
}

export default Settings;