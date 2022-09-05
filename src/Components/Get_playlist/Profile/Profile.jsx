import React from "react";
import "./Profile.css";

const Profile = ({ img }) => {
    return(
        <div className="Profile">
            <div className="P_img"><img alt="album_pic" loading="eager" src={img?.images?.[0]?.url ? img?.images?.[0]?.url : img?.albums?.items?.[0]?.images?.[0]?.url}/></div>
            <div className="P_info">
            </div>
        </div>
    )
}

export default Profile;