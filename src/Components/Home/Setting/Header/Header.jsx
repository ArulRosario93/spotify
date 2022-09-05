import React from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDataLayerValue } from "../../../DataLayer";
import "./Header.css";

const Header = () => {
    const [{user, setting}, dispatch] = useDataLayerValue();

    const Handler = () => {
        dispatch({
            type: 'SET_SETTING',
            setting: false,
        })
    }

    return(
            <div className="Headers">
                <div onClick={Handler}><ArrowBackIosNewIcon/></div>
                <div>
                    <h5>User Profile</h5>
                </div>
                <div><MoreHorizIcon /></div>
            </div>
    )
}

export default Header;