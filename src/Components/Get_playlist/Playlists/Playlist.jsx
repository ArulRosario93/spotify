import React, { useEffect } from "react";
import "./Playlist.css";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDataLayerValue } from "../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";
import { FadeIn } from "react-slide-fade-in";
import Confetti from "../../../Assets/confettti.mp4";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Playlist = () => {

    const spotify = new SpotifyWebApi();

    let sayWhat;

    const [{playlist, get_artist, renderCurrentlyPlaying, searched_id}, dispatch] = useDataLayerValue();

    console.log(playlist?.albums?.items, "herehrerhere");
    console.log(playlist, "herehrerhere");
    const Handler = (e) => {

        if(e?.target?.childNodes?.[1]?.childNodes?.[1]?.innerHTML){
            spotify.getTrack(e?.target?.childNodes?.[1]?.childNodes?.[1]?.innerHTML).then(data => {
                dispatch({
                    type: 'SEARCHED_ID',
                    searched_id: data,
                })
                // dispatch({
                //     type: 'RENDERPLAYLIST',
                //     renderPlaylist: false,
                // })
                dispatch({
                    type: 'RENDERCURRENTLYPLAYING',
                    renderCurrentlyPlaying: true,
                })
            })
        }
        else if(e?.target?.nextSibling?.lastChild?.innerHTML){
            spotify.getTrack(e?.target?.nextSibling?.lastChild?.innerHTML).then(data => {
                dispatch({
                    type: 'SEARCHED_ID',
                    searched_id: data,
                })
                // dispatch({
                //     type: 'RENDERPLAYLIST',
                //     renderPlaylist: false,
                // })
                dispatch({
                    type: 'RENDERCURRENTLYPLAYING',
                    renderCurrentlyPlaying: true,
                })
            })
        }
        else if(e?.target?.nextSibling?.innerHTML){
            spotify.getTrack(e?.target?.nextSibling?.innerHTML).then(data => {
                dispatch({
                    type: 'SEARCHED_ID',
                    searched_id: data,
                })
                // dispatch({
                //     type: 'RENDERPLAYLIST',
                //     renderPlaylist: false,
                // })
                dispatch({
                    type: 'RENDERCURRENTLYPLAYING',
                    renderCurrentlyPlaying: true,
                })
            })
        }else if(e?.target?.parentElement?.parentElement?.childNodes?.[0].childNodes?.[1]?.lastChild?.innerHTML){
            spotify.getTrack(e?.target?.parentElement?.parentElement?.childNodes?.[0].childNodes?.[1]?.lastChild?.innerHTML).then(data => {
                dispatch({
                    type: 'SEARCHED_ID',
                    searched_id: data,
                })
                // dispatch({
                //     type: 'RENDERPLAYLIST',
                //     renderPlaylist: false,
                // })
                dispatch({
                    type: 'RENDERCURRENTLYPLAYING',
                    renderCurrentlyPlaying: true,
                })
            })
        }else{
            console.log("NOthing yet");
        }
    }

    const HandlerShuffle = () => {
        dispatch({
            type: 'SEARCHED_ID',
            searched_id: playlist,
        })
        // dispatch({
        //     type: 'RENDERCURRENTLYPLAYING',
        //     renderCurrentlyPlaying: true,
        // })
    }
    const HandlerPlay = () => {
        dispatch({
            type: 'SEARCHED_ID',
            searched_id: playlist,
        })
        // dispatch({
        //     type: 'RENDERCURRENTLYPLAYING',
        //     renderCurrentlyPlaying: true,
        // })    
    }

    const white = "white";
    const green = "greenyellow";

    return(
        <div className="Songs" style={{backgroundImage: `url(${playlist?.images?.[0]?.url ? playlist?.images?.[0]?.url : playlist?.albums?.items?.[0]?.images?.[0]?.url})`, zIndex: '8'}}>
        <div style={{backdropFilter: 'blur(80px)', minHeight: '100vh', paddingBottom: "10%,", boxSizing: 'border-box'}}>
            <div className="playingMethod">
                <div className="play" onClick={HandlerPlay}>
                    <div><PlayArrowRoundedIcon/></div>
                    <div style={{paddingLeft: '1%'}}><p>Play</p></div>
                </div>
                <div className="shuffle" onClick={HandlerShuffle}>
                    <div><ShuffleOutlinedIcon/></div>
                    <div style={{paddingLeft: '1%'}}><p>Shuffle</p></div>
                </div>
            </div>
            <div className="tracks">
                {
                    playlist?.tracks?.items.map((item, i) => {

                        console.log(searched_id?.id, "algj AOUG");
                        console.log(item?.track?.id," ;DKGPAJGNAE");
                        console.log(item?.id," ;;kgh \agljbwour ub");

                        return(
                            <FadeIn
                                from="bottom"
                                positionOffset={0}
                                triggerOffset={0}
                                delayInMilliseconds={0}
                            >
                            <div className="singleTrack" onClick={Handler}>
                                <div className="noName">
                                    <div style={{color: `${searched_id?.id ? searched_id?.id === item?.track?.id ? green : searched_id?.id === item?.id ? green : null : null}`}}>{i+1}</div>
                                    <div className="innerDiv"><p style={{color: `${searched_id?.id ? searched_id?.id === item?.track?.id ? green : searched_id?.id === item?.id ? green : null : null}`, fontWeight: '300'}}>{item?.track?.name ? item?.track?.name : item?.name}</p><p style={{display: 'none'}}>{item?.id ? item?.id : item?.track?.id}</p></div>
                                </div>
                                <div style={{display: 'flex', padding: '0% 3%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: `${searched_id?.id ? searched_id?.id === item?.track?.id ? green : searched_id?.id === item?.id ? green : null : null}`}}>
                                    {
                                        searched_id?.id  ? searched_id?.id === item?.track?.id  ? <AutoAwesomeIcon /> : searched_id?.id === item?.id ? <AutoAwesomeIcon /> : null : null
                                    }
                                </div>
                            </div>
                            </FadeIn>
                        )
                    })
                }
                </div>
            </div>
            </div>
    )
}

export default Playlist;
