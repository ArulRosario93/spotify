import React from "react";
import "./Here_album.css";
import { useDataLayerValue } from "../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js"

const Here_Album = () => {

    const spotify = new SpotifyWebApi();
    const [{artist_page}, dispatch] = useDataLayerValue();

    const Handler = (e) => {
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
    
    return(
        artist_page?.items?.[0]?.album_group === "album" ?
            <div className="artistAlbum">
                <h4>Albums</h4>
                <div className="whereNow">
                {
                    artist_page?.items.map((item, i) => {
                            {
                                if(item?.album_group === "album"){  
                                    return(
                                        <div className="AlbumHere" key={i} onClick={Handler}>
                                            <img loading="eager" src={item?.images?.[0]?.url}/>
                                            <p>{item?.name}</p>
                                            <p style={{display: "none"}}>{item?.id}</p>
                                        </div>
                                    )
                                }
                            }
                    })
                }
                </div>
            </div> : null
    )
}

export default Here_Album;