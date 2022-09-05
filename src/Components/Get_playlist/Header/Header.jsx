import React, { useEffect } from "react";
import "./Headerr.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../../DataLayer";

const Header = ({artist, album}) => {

    const [{playlist}, dispatch] = useDataLayerValue();
    const spotify = new SpotifyWebApi();

    const Handler = () => {
        dispatch({
            type: 'RENDERPLAYLIST',
            renderPlaylist: false,
        })
        dispatch({
            type: 'PLAYLIST',
            playlist: null,
        })
    }

    const HandleClick = (e) => {
        console.log(e);
        if(artist?.artists?.[0]?.name){
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
            spotify.getArtistAlbums(artist?.artists?.[0]?.id).then(data => {
                console.log(data, "data here from artist");
                dispatch({
                    type: 'ARTIST_PAGE',
                    artist_page: data,
                })
            })
        }
    }
    return(
        <div className="Header" style={{zIndex: '8'}}>
            <div onClick={Handler}><ArrowBackIosNewIcon/></div>
            <div>
                <h5>{album?.name}</h5>
                {artist?.description || artist?.artists?.[0]?.name || artist?.owner?.display_name ? <p onClick={HandleClick}>{artist?.description?.length > 0 ? artist?.description : artist?.artists?.[0]?.name ? artist?.artists?.[0]?.name : artist?.owner?.display_name}</p> : null}
                {/* {artist?.description || artist?.artists?.[0]?.name || artist?.owner?.display_name ? <p>{artist?.description == "" ? artist?.artists?.[0]?.name ? artist?.artists?.[0]?.name : artist?.owner?.display_name : artist?.description}</p> : null} */}
            </div>
            <div><MoreHorizIcon /></div>
        </div>
    )
}

export default Header;