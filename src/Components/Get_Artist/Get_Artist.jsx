import React from "react";
import Header from "./Header/Header";
import Profile from "./Profile/Profile";
import TopSong from "./topSongs/TopSongs";
import Here_Album from "./Here_Album/Here_Album";
import useDataLayerValue from "../DataLayer.js";
import { FadeIn } from "react-slide-fade-in";

const Get_Artist = () => {
    // const [{artist_image, top_songs_for_artist}, dispatch] = useDataLayerValue();

    console.log("came here but")
    return(
        <FadeIn
            from="bottom"
            positionOffset={0}
            triggerOffset={0}
            delayInMilliseconds={700}
        >
                <Header />
                <div style={{color: 'white', zIndex: '100'}}>
                <Profile />
                <TopSong />
                <Here_Album />
            </div>
        </FadeIn>
    )
}

export default Get_Artist;