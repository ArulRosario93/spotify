import React from "react";
import "./Login.css";
import { FadeIn } from "react-slide-fade-in";

import image1 from "../../Assets/images (1).jpeg";
import image2 from "../../Assets/images (2).jpeg";
import image3 from "../../Assets/images (3).jpeg";
import image4 from "../../Assets/images (4).jpeg";
import image5 from "../../Assets/images (5).jpeg";
import image6 from "../../Assets/images (6).jpeg";
import image7 from "../../Assets/images.jpeg";
import image8 from "../../Assets/mqdefault.jpg";

import spotify from "../../Assets/spotify-removebg-preview.png";
export const getAccessToken = () => {
    return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
}

const Login = () => {

    const scopes = [
        "ugc-image-upload",
        "user-modify-playback-state",
        "user-read-playback-state",
        "user-read-currently-playing",
        "user-follow-read",
        "user-follow-modify",
        "user-read-recently-played",
        "user-read-playback-position",
        "user-top-read",
        "playlist-read-collaborative",
        "playlist-modify-public",
        "playlist-read-private",
        "playlist-modify-private",
        "app-remote-control",
        "streaming",
        "user-read-email",
        "user-read-private",
        "user-library-modify",
        "user-library-read",
    ]

    const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=ab650387ad9444669ad7fe3a6587f74c&response_type=token&redirect_uri=http://localhost:3000&${scopes.join("%20")}`;

    return(
            spotify ? 
            <FadeIn
                from="bottom"
                positionOffset={1}
                triggerOffset={0}
                delayInMilliseconds={0}
            >
                <div className="loginIt">
                    <FadeIn
                                    from="bottom"
                                    positionOffset={15}
                                    triggerOffset={0}
                                    delayInMilliseconds={500}
                    >
                        <img className="spotify" src={spotify}/>
                    </FadeIn>
                    <FadeIn
                                    from="bottom"
                                    positionOffset={0}
                                    triggerOffset={0}
                                    delayInMilliseconds={0}
                    >
                        <a href={AUTH_URL}>Login</a>
                    </FadeIn>
                </div>
            </FadeIn> : null
    )
}

export default Login;