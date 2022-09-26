export const initialState = {
    user: null,
    token: null,
    playlists: [],
    user_playlists: [],
    playlist: false,
    spotify: null,
    playing: false,
    artists: null,
    searched_tracks: [],
    searched_track: null,
    single_track: false,
    image: false,
    searched_artists:[],
    searched_albums: [],
    searched_album: false,
    searched_id: null,
    about_dev: false,
    top_tracks: null,
    set_developer: false,
    setting:false,
    featured_playlist: null,
    sad_featured_for_users: null,
    happy_featured_for_users: null,
    lonely_featured_for_users: null,
    new_release: null,
    greeting_item: null,
    get_artist: false,
    artist_page: null,
    top_songs_for_artist: null,
    artist_image: null,
    dailyMix: null,
    renderCurrentlyPlaying: false,
    renderPlaylist: false,
    blockORwhat: false,
    lyric: null,
    greetings: null,
}

const reducer = (state, action) => {

    switch(action.type) {

        case "SET_USER":
            return{
                ...state,
                user: action.user,
            }

        case "SET_ARTISTS":
            return{
                ...state,
                artists: action.artists,
            }
        
        case "SET_GREETINGS":
            return{
                ...state,
                greetings: action.greetings,
            }
        
        case "SET_LYRIC":
            return{
                ...state,
                lyric: action.lyric,
            }

        case "BLOCKORWHAT":
            return{
                ...state,
                blockORwhat: action.blockORwhat,
            }

        case "RENDERPLAYLIST":
            return{
                ...state,
                renderPlaylist: action.renderPlaylist,
            }

        case "RENDERCURRENTLYPLAYING":
            return{
                ...state,
                renderCurrentlyPlaying: action.renderCurrentlyPlaying,
            }

        case "DAILY_MIX":
            return{
                ...state,
                dailyMix: action.dailyMix,
            }

        case "SET_LONELY_FEATURED_FOR_USERS":
            return{
                ...state,
                lonely_featured_for_users: action.lonely_featured_for_users,
            }

        case "SET_ARTIST_IMAGE":
            return{
                ...state,
                artist_image: action.artist_image,
            }

        case "SET_TOP_SONGS_FOR_ARTIST":
            return{
                ...state,
                top_songs_for_artist: action.top_songs_for_artist,
            }

        case "ARTIST_PAGE":
            return{
                ...state,
                artist_page: action.artist_page,
            }

        case "SET_SETTING":
            return{
                ...state,
                setting: action.setting,
            }

        case "SET_GREETINGS_ITEM":
            return{
                ...state,
                greeting_item: action.greeting_item,
            }

        case "SET_NEW_RELEASE":
            return{
                ...state,
                new_release: action.new_release,
            }

        case "SET_SAD_FEATURED_FOR_USERS":
            return{
                ...state,
                sad_featured_for_users: action.sad_featured_for_users,
            }
        case "SET_HAPPY_FEATURED_FOR_USERS":
            return{
                ...state,
                happy_featured_for_users: action.happy_featured_for_users,
            }

        case "FEATURED_PLAYLIST":
            return{
                ...state,
                featured_playlist: action.featured_playlist,
            }

            case "SET_DEVELOPER":
                return{
                    ...state,
                    set_developer: action.set_developer,
                }

        case "TOP_TRACKS":
            return{
                ...state,
                top_tracks: action.top_tracks,

            }

        case "ABOUT_DEV":
            return{
                ...state,
                about_dev: action.about_dev,
            }

        case "SEARCHED_ID":
            return{
                ...state,
                searched_id: action.searched_id,
            }

            case "SEARCHED_ALBUM":
            return{
                ...state,
                searched_album: action.searched_album,
            }
        
        case "SEARCHED_ALBUMS":
            return{
                ...state,
                searched_albums: action.searched_albums,
            }
        
        case "IMAGE":
            return{
                ...state,
                image: action.image,
            }
        
        case "SINGLE_TRACK":
            return{
                ...state,
                single_track: action.single_track,
            }

        case "SEARCHED_TRACK":
            return{
                ...state,
                searched_track: action.searched_track,
            }

        case "SHOW_PLAYING":
            return{
                ...state,
                show_playing: action.show_playing,
            }

        case "SET_TOKEN":
            return{
                ...state,
                token: action.token,
            }

        case "GET_ARTIST":
            return{
                ...state,
                get_artist: action.get_artist,
            }
        
        case "SEARCHED_TRACKS":
            return{
                ...state,
                searched_tracks: action.searched_tracks,
            }

        case "SEARCHED_ARTISTS":
            return{
                ...state,
                searched_artists: action.searched_artists,
            }
        
        case "USER_PLAYLISTS":
            return{
                ...state,
                user_playlists: action.user_playlists,
            }

        case "PLAYLIST":
            return{
                ...state,
                playlist: action.playlist,
            }

        default:
            return state;
    }   
}


export default reducer;