import React from "react";
import "./Profile.css";
import { useDataLayerValue } from "../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js"

const Profile = () => {

    const spotify = new SpotifyWebApi();
    // spotify.areFollowingPlaylist()
    const [{artist_image}, dispatch] = useDataLayerValue();

    return(
        <div className="artistProfile">
        <div className="imageHere">
            <img className="artistProfileImg" loading="eager" src={artist_image?.artists?.items?.[0]?.images?.[0]?.url}/>
            <div className="renderDoom">
                <h5>{artist_image?.artists?.items?.[0]?.type === "artist" ? "Artist" : null}</h5>
                <div className="artistInfo">
                    <div className="renderLeft">
                        <h3>{artist_image?.artists?.items?.[0]?.name}</h3>
                        <h5>{artist_image?.artists?.items?.[0]?.followers?.total} followers</h5>
                    </div>
                    <div>
                        {/* <div className="followKaro">
                            Follow
                        </div> */}
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Profile;