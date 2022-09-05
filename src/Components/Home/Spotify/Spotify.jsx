import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-player";
import { useDataLayerValue } from "../../DataLayer";

const Spotify = () => {

    const [{token, playlist, searched_id}, dispatch] = useDataLayerValue();

    const [play, setPlay] = useState(false);

    const size = {
        width: '100%',
        height: '75'
    }
    const view = 'list';
    const theme = 'light';

    const Handler = (e) => {
        console.log(e)
    }

    useEffect(() => {
        setPlay(true)
        console.log("came true bud we git it");
    }, [searched_id])

    if(!searched_id) return null;
    return(
        <div style={{ position: 'fixed', zIndex: '9', bottom: '0%', width:'100%', left:'0%',background: 'none', color: 'white', height: '80px'}}>
            <SpotifyPlayer 
                uri={ searched_id ? searched_id?.uri : null }
                size={size}
                theme={theme}
                style={{height: '80px'}}
            />

        </div>
    )
}

export default Spotify;