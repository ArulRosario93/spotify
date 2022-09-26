import React, { useEffect } from "react";
import SearchBar from "./SearchBar/SearchBar";
import GreetingsWelcome from "./GreetingsWelcome/GreetingsWelcome";
import Libraries from "./Libraries/Libraries";
import Spotify from "./Spotify/Spotify";
import Setting from "./Setting/Setting";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useDataLayerValue } from "../DataLayer";
import RowStructured from "./RowStructured/RowStructured";
import { FadeIn } from "react-slide-fade-in";
import "./Home.css";
import Player from "./Player/Player";

const Home = () => {

    const [{user, setting, searched_id, blockORwhat}, dispatch] = useDataLayerValue();

    const Handler = () => {
        dispatch({
            type: 'SET_SETTING',
            setting: true,
        })
    }

    useEffect(() => {
        console.log(user, "user bud");
    }, [user])

    const bl = "block";
    const no = "none";

    return(
            <div className="wholeSpotify">
                <div className="maine">
                    <SearchBar />
                    <Stack direction="row" onClick={Handler} spacing={0}>
                        <Avatar alt="User Img"  sx={{ width: 30, height: 30 }} src={user?.images?.[0]?.url}/>
                    </Stack>
                </div>
                <div style={{display: `${blockORwhat ? no : bl}`, paddingBottom: "80px"}}>
                <FadeIn
                    from="bottom"
                    positionOffset={5}
                    triggerOffset={0}
                    delayInMilliseconds={100}
                >
                    <GreetingsWelcome />
                </FadeIn>
                    {/* <RowStructured /> */}
                <FadeIn
                    from="bottom"
                    positionOffset={0}
                    triggerOffset={0}
                    delayInMilliseconds={300}
                >
                    <Libraries />
                </FadeIn>
                </div>
            </div>
    )
}

export default Home;