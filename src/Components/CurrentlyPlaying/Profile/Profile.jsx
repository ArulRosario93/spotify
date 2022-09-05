import React, { useEffect } from "react"
import "./Profile.css"
import { useDataLayerValue } from "../../DataLayer"

const Profile = ({img}) => {

    const [{image}, dispatch] = useDataLayerValue();

    useEffect(() => {

        if(img?.album?.images[0]?.url){
            dispatch({
                type: 'IMAGE',
                image: true,
            })
        }

    }, [image, dispatch, img])
    
    return(
        <div className="CurrentlyPlayingProfile">
            {/* <img src={ image ? img?.album?.images[0]?.url : null } alt="ProfileCurrentlyPlaying"/> */}
            <img src={ img?.images?.[0]?.url ? img?.images?.[0]?.url : img?.album?.images[0]?.url } alt="ProfileCurrentlyPlaying"/>
        </div>
    )
}

export default Profile;