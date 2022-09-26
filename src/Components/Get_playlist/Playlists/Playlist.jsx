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

    const youShallDoThis = (e, name) => {
        console.log("whta now BUDDY", name)
        spotify.getTrack(name).then(data => {
            console.log(data, "whta now BUDDY")
            dispatch({
                type: 'SEARCHED_ID',
                searched_id: data,
            })
        })
    }

    const HandlerShuffle = () => {
        dispatch({
            type: 'SEARCHED_ID',
            searched_id: playlist,
        })
    }
    const HandlerPlay = () => {
        dispatch({
            type: 'SEARCHED_ID',
            searched_id: playlist,
        })
    }

    const white = "white";
    const green = "greenyellow";

    useEffect(() => {
        console.log(searched_id, "what is this");
        color = null;
    }, [searched_id])

    let color;

    return(
        <div className="Songs" style={{backgroundImage: `url(${playlist?.images?.[0]?.url ? playlist?.images?.[0]?.url : playlist?.albums?.items?.[0]?.images?.[0]?.url})`, zIndex: '8'}}>
        <div style={{backdropFilter: 'blur(80px)', minHeight: '100vh', paddingBottom: "10%,", boxSizing: 'border-box'}}>
            {console.log(playlist, "bai playlist rah")}
            <div className="playingMethod">
                <div className="play">
                    <div><PlayArrowRoundedIcon/></div>
                    <div style={{paddingLeft: '1%'}}><a href={`https://embed.spotify.com/?uri=${playlist?.uri ? playlist?.uri : playlist?.albums?.uri}&view=list&theme=light`} target="_blank"><p>Play</p></a></div>
                </div>
                <div className="shuffle" onClick={HandlerShuffle}>
                    <div><ShuffleOutlinedIcon/></div>
                    <div style={{paddingLeft: '1%'}}><p>Shuffle</p></div>
                </div>
            </div>
            <div className="tracks">
                {
                    playlist?.tracks?.items.map((item, i) => {

                        if(searched_id?.id === item?.track?.id){
                            color = 'greenyellow'
                        }
                        return(
                            <FadeIn
                                from="bottom"
                                positionOffset={0}
                                triggerOffset={0}
                                delayInMilliseconds={0}
                            >
                            <div className="singleTrack">
                                <div className="noName">
                                {
                                    searched_id?.id ? searched_id?.id === item?.track?.id  ? <div style={{color: 'greenyellow'}}>{i+1}</div> : searched_id?.id === item?.id ? <div style={{color: 'greenyellow'}}>{i+1}</div> : <div>{i+1}</div> : <div>{i+1}</div>
                                }
                                    {
                                        searched_id?.id === item?.track?.id  ? 
                                            <div className="innerDiv" style={{color: `${searched_id?.id ? searched_id?.id === item?.track?.id ? green : searched_id?.id === item?.id ? green : null : null}`}}>
                                                <a onClick={(e) => youShallDoThis(e, `${item?.track?.id ? item?.track?.id : item?.id}`)} href={`https://embed.spotify.com/?uri=${item?.track?.uri ? item?.track?.uri : item?.uri}&view=list&theme=light`} target="_blank">
                                                    <p style={{fontWeight: '300'}}>{item?.track?.name ? item?.track?.name : item?.name}</p>
                                                </a>
                                                <p style={{display: 'none'}}>{item?.id ? item?.id : item?.track?.id}</p>
                                            </div> : searched_id?.id === item?.id ? 
                                            <div className="innerDiv" style={{color: `${searched_id?.id ? searched_id?.id === item?.track?.id ? green : searched_id?.id === item?.id ? green : null : null}`}}>
                                                <a onClick={(e) => youShallDoThis(e, `${item?.track?.id ? item?.track?.id : item?.id}`)} href={`https://embed.spotify.com/?uri=${item?.track?.uri ? item?.track?.uri : item?.uri}&view=list&theme=light`} target="_blank">
                                                    <p style={{fontWeight: '300'}}>{item?.track?.name ? item?.track?.name : item?.name}</p>
                                                </a>
                                                <p style={{display: 'none'}}>{item?.id ? item?.id : item?.track?.id}</p>
                                                </div> : <div className="innerDiv" ><a onClick={(e) => youShallDoThis(e, `${item?.track?.id ? item?.track?.id : item?.id}`)} href={`https://embed.spotify.com/?uri=${item?.track?.uri ? item?.track?.uri : item?.uri}&view=list&theme=light`} target="_blank"><p style={{fontWeight: '300'}}>{item?.track?.name ? item?.track?.name : item?.name}</p></a><p style={{display: 'none'}}>{item?.id ? item?.id : item?.track?.id}</p>
                                            
                                            </div>
                                    }
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
