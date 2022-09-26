import React from "react";
import "./Header.css";
import { useDataLayerValue } from "../../DataLayer";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Header = () => {

    const [{ playlist }, dispatch] = useDataLayerValue();

    const Handler = () => {
        dispatch({
            type: 'GET_ARTIST',
            get_artist: false,
        })
        dispatch({
            type: 'RENDERCURRENTLYPLAYING',
            renderCurrentlyPlaying: false,
        })
        dispatch({
            type: 'GET_ARTIST',
            get_artist: false,
        })
        if(playlist){
            dispatch({
                type: 'RENDERPLAYLIST',
                renderPlaylist: true,
            })
        }
        dispatch({
                type: "SET_TOP_SONGS_FOR_ARTIST",
                top_songs_for_artist: null,
        })
        dispatch({
            type: 'SET_ARTIST_IMAGE',
            artist_image: null,
        })
        dispatch({
            type: 'ARTIST_PAGE',
            artist_page: null,
        })
    };

    return(
        <div>
            <div className="Header">
                <div onClick={Handler}><ArrowBackIosNewIcon/></div>
                <div>
                    <h5></h5>
                    <p></p>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Header;