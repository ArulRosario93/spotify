import React,{ useEffect, useState } from "react";
import "./Headere.css"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import stripIndent from "strip-indent";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDataLayerValue } from "../../DataLayer";

const Header = ({ songName, artist, sayItBUDDY }) => {

    const [In, setIN] = useState(false);
    const [finalMayBe, setFinalMayBe] = useState(null);

    const [{searched_track, single_track, image, get_artist, lyric}, dispatch] = useDataLayerValue();

    const Handler = () => {
        dispatch({
            type: 'RENDERCURRENTLYPLAYING',
            renderCurrentlyPlaying: false,
        })
        dispatch({
            type: 'SEARCHED_TRACK',
            searched_track: false,
        })
        dispatch({
            type: "SET_LYRIC",
            lyric: null,
        })
    }

    const showHandler = () => {
        setIN(true)
        dispatch({
            type: "SET_LYRIC",
            lyric: true,
        })
        const yup = JSON.stringify(lyric);
        const jgiadg = yup.replace(/\\n/g, "<br />");
        setFinalMayBe(jgiadg.replace(/['"]/g, ""));
    }

    const showPlaying = () => {
        setIN(null)
        dispatch({
            type: "SET_LYRIC",
            lyric: null,
        })
        setFinalMayBe(null)
    }

    useEffect(() => {
        console.log(finalMayBe);
        document.getElementById("lyricHere").innerHTML = finalMayBe;
    }, [In])

    return(
        <div className="Header">
            <div style={{flex: '1'}} onClick={Handler}><ArrowBackIosNewIcon/></div>
            <div style={{flex: '7'}}>
                <p>{artist?.album?.name}</p>
            </div>
            <div style={{flex: '1', paddingTop: '2%', boxSizing: 'border-box'}}>
                {
                    sayItBUDDY == null ? <p onClick={showHandler}>lyric</p> : <p></p>
                }
                {
                    In ? <div className="showcaseLyric">
                        <div className="headHere">
                            <div style={{flex: '1'}} onClick={showPlaying}><ArrowBackIosNewIcon/></div>
                            <div style={{flex: '7'}} ><h3>Lyric</h3></div>
                            <div style={{flex: '1'}} ><p></p></div>
                        </div>
                        <div className="lyricsHere">
                            <p style={{fontWeight: "800", width: '100%', zIndex: "10000", position: "absolute", boxSizing: 'border-box'}} id="lyricHere"></p>
                        </div>
                    </div> : null
                }
            </div>
        </div>
    )
}

export default Header;