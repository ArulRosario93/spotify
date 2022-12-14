import React, { useEffect } from "react";
import "./Libraries.css"
import { useDataLayerValue } from "../../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";
import { FadeIn }  from "react-slide-fade-in";

const Libraries = () => {
    const spotify = new SpotifyWebApi();

    const [{lonely_featured_for_users, artists, happy_featured_for_users, dailyMix, sad_featured_for_users, new_release}, dispatch] = useDataLayerValue();

    const playlistAssemble = [lonely_featured_for_users, happy_featured_for_users, new_release, dailyMix, sad_featured_for_users, artists];

    const playlistHereAwesome = [
        {
            name: 'for hearts that never will be broken again',
            playlist: lonely_featured_for_users,
        },
        {
            name: 'when everything you see is love',
            playlist: happy_featured_for_users,
        },{
            name: 'New release',
            playlist: new_release,
        },{
            name: 'uniquely yours',
            playlist: dailyMix,
        },{
            name: 'Nee un nanu vera ila da, redu peru joker p*nda da',
            playlist: sad_featured_for_users,
        },{
            name: 'Top Aritist',
            playlist: ""
        }
    ]

    let Name;
    let namee;
    let nameee;
    let nameeee;
    let nameeeee;

    const Handler = (e, GOTIT) => {
        
        if(e?.target?.parentElement?.childNodes[1]?.childNodes[0]?.data === "playlist"){
            spotify.getPlaylist(e?.target?.parentElement?.childNodes[2]?.childNodes[0]?.data).then(data => {
                console.log(data, "nothing here")
                dispatch({
                    type: 'RENDERPLAYLIST',
                    renderPlaylist: true,
                })
                dispatch({
                    type: 'PLAYLIST',
                    playlist: data,
                })
            })
        }else if(GOTIT){
            console.log(GOTIT, "WHERE IS THIS")
                spotify.searchTracks(GOTIT?.name, { limit:5 }).then(data => {
                    dispatch({
                        type: "SET_TOP_SONGS_FOR_ARTIST",
                        top_songs_for_artist: data,
                    })
                })
                dispatch({
                    type: 'GET_ARTIST',
                    get_artist: true,
                })
                dispatch({
                    type: 'RENDERCURRENTLYPLAYING',
                    renderCurrentlyPlaying: false,
                })
                dispatch({
                    type: 'RENDERPLAYLIST',
                    renderPlaylist: false,
                })
                spotify.searchArtists(GOTIT?.name, { limit:1 }).then(data => {
                    console.log(data, "data here from artist");
                    dispatch({
                        type: 'SET_ARTIST_IMAGE',
                        artist_image: data,
                    })
                })
                spotify.getArtistAlbums(GOTIT?.id).then(data => {
                    console.log(data, "data here from artist");
                    dispatch({
                        type: 'ARTIST_PAGE',
                        artist_page: data,
                    })
                })
        }else{
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
    }

    console.log(artists, "ARTIST");

    return(
        <div className="onWhoManages">
        {
            playlistAssemble?.map((item, i) => {
            return(
                item?.playlists ? item?.playlists?.items ? 
                    <FadeIn
                        from="bottom"
                        positionOffset={2}
                        triggerOffset={0}
                        delayInMilliseconds={5}
                    >
                    <div className="yeayeayea">
                        <h3>{playlistHereAwesome[i]?.name}</h3>
                        <div className="doinnGreat">
                                {
                                    item?.playlists?.items?.map((item, i) => {
                                        if(item?.name?.length > 22){
                                            nameee = item?.name.slice(0, 20) + "...";
                                        }else{
                                            nameee = item?.name;
                                        }
                                        return(
                                            <div className="LibrariesContents" key={i} onClick={Handler}>
                                                <img src={item?.images[0]?.url}/>
                                                <p style={{display: 'none', className: 'child'}}>playlist</p>
                                                <p style={{display: 'none', className: 'child'}}>{item?.id}</p>
                                                <p>{nameee}</p>
                                            </div>
                                        )
                                    })
                                }
                        </div>
                    </div> 
                </FadeIn> : null : item?.albums?.items ? 
                    <FadeIn
                        from="bottom"
                        positionOffset={2}
                        triggerOffset={0}
                        delayInMilliseconds={5}
                    >
                    <div className="yeayeayea">
                        <h3>{playlistHereAwesome[i].name}</h3>
                        <div className="doinnGreat">
                                {
                                    item?.albums?.items?.map((item, i) => {
                                        if(item?.name?.length > 22){
                                            nameee = item?.name.slice(0, 20) + "...";
                                        }else{
                                            nameee = item?.name;
                                        }
                                        {/* console.log(item) */}
                                        return(
                                            <div className="LibrariesContents" key={i} onClick={Handler}>
                                                <img src={item?.images[0]?.url}/>
                                                {item?.playlists ? <p style={{display: 'none', className: 'child'}}>playlist</p> : <p style={{display: 'none', className: 'child'}}>album</p>}
                                                <p style={{display: 'none', className: 'child'}}>{item?.id}</p>
                                                <p>{nameee}</p>
                                            </div>
                                        )
                                    })
                                }
                        </div>
                    </div> 
                </FadeIn> : item?.artists ? <FadeIn
                        from="bottom"
                        positionOffset={2}
                        triggerOffset={0}
                        delayInMilliseconds={5}
                    >
                    <div className="yeayeayea">
                        <h3>{playlistHereAwesome[i].name}</h3>
                        <div className="doinnGreat">
                        {
                                        console.log(item, "paiugpiag BRUH")
                        }
                                {
                                    item?.artists?.items?.map((item, i) => {
                                        if(item?.name?.length > 22){
                                            nameee = item?.name.slice(0, 20) + "...";
                                        }else{
                                            nameee = item?.name;
                                        }
                                        {/* console.log(item) */}
                                        return(
                                            <div className="LibrariesContents" key={i} onClick={(e) => Handler(e, item)}>
                                                <img style={{borderRadius: '75px'}} src={item?.images[0]?.url}/>
                                                {item?.playlists ? <p style={{display: 'none', className: 'child'}}>playlist</p> : <p style={{display: 'none', className: 'child'}}>album</p>}
                                                <p style={{display: 'none', className: 'child'}}>{item?.id}</p>
                                                <p>{nameee}</p>
                                            </div>
                                        )
                                    })
                                }
                        </div>
                    </div> 
                </FadeIn> : null
            )
        })}
        </div>
    )
}

export default Libraries;