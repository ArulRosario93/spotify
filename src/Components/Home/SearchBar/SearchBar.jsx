import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "./SearchBar.css";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../../DataLayer";
import { FadeIn } from "react-slide-fade-in";



const SearchBar = () => {

    const spotify = new SpotifyWebApi();

    const [{searched_tracks, searched_track, searched_id, searched_albums, searched_album, playlist, show_playing, featured_playlist}, dispatch] = useDataLayerValue();

    const [inputText, setInputText] = useState("");
    const [sayTrue, setSayTrue] = useState(false);
    const [saySearch, setSaySearch] = useState(null);
    
    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
        setSaySearch(false)
    };

    const Handler = (e) => {

        console.log(e)
        if(e?.target?.previousSibling?.innerHTML === "Song" || e?.target?.innerHTML === "Song" || e?.target?.parentElement?.childNodes[1]?.childNodes[0]?.innerHTML === "Song"){
            spotify.getTrack(e?.target?.parentElement?.childNodes[2]?.innerHTML).then(data => {
                console.log(data, "datatata");
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
        else if(e?.target?.previousSibling?.innerHTML === "playlist" || e?.target?.innerHTML === "playlist" || e?.target?.parentElement?.childNodes[1]?.childNodes[0]?.innerHTML === "playlist"){
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
        else{
            spotify.getAlbum(e?.target?.parentElement?.childNodes[2]?.childNodes[0]?.data).then(data => {
                console.log(data, "nothing here");
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
    }
    useEffect(() => {
        

        spotify.searchTracks(inputText, {limit: 5}).then(data => {
            console.log(data?.tracks?.items?.[0]?.name, "tracks")
            dispatch({
              type: 'SEARCHED_TRACKS',
              searched_tracks: data,
            })
          })

          spotify.searchPlaylists(inputText, {limit: 5}).then(data => {
            console.log(data?.playlists?.items?.[0]?.name, "playlist")
            dispatch({
                type: 'FEATURED_PLAYLIST',
                featured_playlist: data,
            })
          })

          spotify.searchAlbums(inputText, {limit: 5}).then(data => {
            console.log(data?.albums?.items?.[0]?.name, "Album");
            dispatch({
                type: 'SEARCHED_ALBUMS',
                searched_albums: data,
            })
        })

        if(inputText?.length > 0){
            dispatch({
                type:'BLOCKORWHAT',
                blockORwhat: true,
            })
        }else{
            dispatch({
                type:'BLOCKORWHAT',
                blockORwhat: false,
            })
        }

        console.log(inputText);
    }, [inputText]);

    const onFocusHere = () => {
        if(inputText?.length < 1){
            setSaySearch(true);
        }
        dispatch({
            type:'BLOCKORWHAT',
            blockORwhat: true,
        })
    }

    const onBlurHere = () => {
        setSaySearch(false);
    }

    const mainList = [
        searched_tracks?.tracks?.items?.[0],searched_tracks?.tracks?.items?.[1],searched_albums?.albums?.items?.[0],featured_playlist?.playlists?.items?.[0], searched_tracks?.tracks?.items?.[2], featured_playlist?.playlists?.items?.[1], searched_albums?.albums?.items?.[1], featured_playlist?.playlists?.items?.[2], featured_playlist?.playlists?.items?.[3]
    ]

    return(
        <div>
            <input className="textField" style={{position: 'relative'}} placeholder="Search query" autoComplete="off" onChange={inputHandler} onBlur={onBlurHere} onFocus={onFocusHere}/>
            {
                inputText?.length > 0 ? <div className="SeachedTrackdiv">
                {
                    mainList?.map((item, i) => (
                        <FadeIn
                            from="bottom"
                            positionOffset={i}
                            triggerOffset={0}
                            delayInMilliseconds={100}
                        >
                            <div className="searchedTracks" key={i} onClick={Handler}>
                                <div className="containBruh">
                                    <img style={{height: '13%', width: '13%', objectFit: 'cover'}} src={item?.album?.images?.[0]?.url ? item?.album?.images?.[0]?.url : item?.images?.[0]?.url}/>
                                    <div style={{width: '100%'}}>
                                        <h4 style={{margin: '0%', width: '100%', padding: '2% 3% 2% 0%'}}>{item?.name}</h4>
                                        <div className="heyyy" style={{margin: '0%', width: "100%"}}>
                                            <p style={{padding: '0% 2% 0% 0%'}}>{item?.type === "track" ? "Song" : item?.type}</p>
                                            <p style={{ width: '100%', padding: '0% 2% 0% 0%'}}>{item?.artists?.[0]?.name}</p>
                                        </div>
                                        <p style={{display: 'none'}}>{item?.id}</p>
                                    </div>
                                </div>
                                <div><MoreHorizIcon /></div>
                            </div>
                        </FadeIn>
                    ))
                }</div> : saySearch ? <div className="searchWhtyouLove">
                    <div className="mainaiai">
                        <h3>Search what you love</h3>
                    </div>
                </div> : null
            }
        </div>
    )

}

export default SearchBar;