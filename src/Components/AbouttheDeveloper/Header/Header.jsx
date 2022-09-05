import React from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDataLayerValue } from "../../DataLayer";
import "./Header.css";

const Header = () => {

    const [{user, about_dev}, dispatch] = useDataLayerValue();

    const Handler = () => {
        dispatch({
            type: 'ABOUT_DEV',
            about_dev: false,
        })
    }

    return(
        <div className="HeaderforDeveloper">
            <div onClick={Handler}><ArrowBackIosNewIcon/></div>
            <div>
                <h5>About Developer</h5>
            </div>
            <div><MoreHorizIcon /></div>
        </div>
    )
}

export default Header;