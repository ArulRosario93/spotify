import React, {useEffect, useState} from "react"
import Header from "./Header/Header";
import Profile from "./Profile/Profile";
import Playlist from "./Playlists/Playlist"
import { useDataLayerValue } from "../DataLayer";
import { FadeIn } from "react-slide-fade-in";

const Get_playlist = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const [{playlist}, dispatch] = useDataLayerValue();

    return(
        <FadeIn
            from="bottom"
            positionOffset={0}
            triggerOffset={0}
            delayInMilliseconds={0}
        >
            <div>
                <Header artist={playlist} album={playlist}/>
                <Profile img={playlist}/>
                <Playlist />
            </div>
        </FadeIn>
    )
}

export default Get_playlist;