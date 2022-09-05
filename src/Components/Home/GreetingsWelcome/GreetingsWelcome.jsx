import React, { useEffect, useState } from "react";
import "./GreetingsWelcome.css"
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../../DataLayer";
import { FadeIn } from "react-slide-fade-in";

const GreetingsWelcome = () => {

    const spotify = new SpotifyWebApi();
    const [{greeting_item, user, token, greetings, user_playlists}, dispatch] = useDataLayerValue();


        const Handler = (e, name) => {
            if(name === "playlist"){
                dispatch({
                    type: 'PLAYLIST',
                    playlist: greeting_item,
                })
                dispatch({
                    type: 'RENDERPLAYLIST',
                    renderPlaylist: true,
                })
            }else{
                dispatch({
                    type: 'SEARCHED_ID',
                    searched_id: greeting_item,
                })
                dispatch({
                    type: 'RENDERCURRENTLYPLAYING',
                    renderCurrentlyPlaying: true,
                })
            }
        }

        useEffect(() => {

            if(greetings?.type === "playlist"){
                if(greetings?.id){
                    spotify.getPlaylist(greetings?.id).then(data => {
                        dispatch({
                            type: 'SET_GREETINGS_ITEM',
                          greeting_item: data,
                        })
                    })
                }
            }else{
                if(greetings?.id){
                    spotify.getTrack(greetings?.id).then(data => {
                        dispatch({
                            type: 'SET_GREETINGS_ITEM',
                            greeting_item: data,
                        })
                    })
                }
            }

        }, [greetings]);

    return(
            greeting_item ?
                <div className="greetings">
                    <div>
                        <h2 style={{fontSize: 'large', paddingBottom: '13px'}}>{greetings?.name} {greetings?.sayName ? user?.display_name : null}</h2>
                    </div>
                    {
                        greeting_item?.images?.[0]?.url || greeting_item?.album?.images[0]?.url ? 
                            <FadeIn
                                    from="bottom"
                                    positionOffset={1}
                                    triggerOffset={0}
                                    delayInMilliseconds={100}
                                >
                                <div className="greetContent">
                                    <div className="greets" style={{textAlign: 'center'}}>
                                        <h6 style={{fontSize: 'medium'}}>{greetings?.title}</h6>
                                        <p>{greetings?.label ? greetings?.label : null}</p>
                                    </div>
                                    <div onClick={event => Handler(event, greetings.type)} className="greetImg"><img loading="eager" src={greeting_item?.images?.[0]?.url ? greeting_item?.images?.[0]?.url : greeting_item?.album?.images[0]?.url} alt="logo"/><p>{greeting_item?.name}</p></div>
                                </div> 
                            </FadeIn> : null
                    }
                </div>
            : null
    )
}

export default GreetingsWelcome;