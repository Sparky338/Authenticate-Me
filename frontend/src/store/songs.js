import { csrfFetch } from "./csrf";

// Types
const GET_SONGS = 'songs/GET_SONGS';
// const GET_ONE_SONG = 'songs/GET_ONE_SONG';
const CREATE_SONG = 'songs/CREATE_SONG';
const EDIT_SONG = 'songs/EDIT_SONG';
const DELETE_SONG = 'songs/DELETE_SONG';

// Action Creators
const getSongsAction = (songs) => {
    console.log('getSongsAction array?', songs)
    return {
        type: GET_SONGS,
        songs
    }
}

// const getOneSongAction = (song) => {
//     return {
//         type: GET_ONE_SONG,
//         song
//     }
// }

const createSongAction = (song) => {
    return {
        type: CREATE_SONG,
        song
    }
}

const editSongAction = (songId) => {
    return {
        type: EDIT_SONG,
        songId
    }
}

const deleteSongAction = (songId) => {
    return {
        type: DELETE_SONG,
        songId
    }
}

// Thunks
console.log('right before getAllSong thunk')
export const getAllSongs = () => async dispatch => {
    const res = await csrfFetch('/api/songs'); //CSRF FETCH?
    console.log('res from thunk', res)
    if (res.ok) {
        const songs = await res.json();
        console.log('res.json of thunk', songs)
        dispatch(getSongsAction(songs.songs));
    }
};


export const getSongsCurrentUser = () => async dispatch => {
    const res = await csrfFetch(`/api/songs/current`);

    if (res.ok) {
        const songs = await res.json();
        dispatch(getSongsAction(songs.songs));
    }
};

export const getArtistSongs = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/songs`);

    if (res.ok) {
        const songs = await res.json();
        dispatch(getSongsAction(songs));
    }
};

export const createSong = (songData) => async dispatch => {
    const res = await csrfFetch(`/api/songs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(songData)
    });

    if (res.ok) {
        const song = await res.json();
        dispatch(createSongAction(song));
        return song;
    }
};

export const editSong = (songId, editSongData) => async dispatch => {
    const res = await csrfFetch(`/api/songs/${songId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editSongData)
    });

    if (res.ok) {
        const song = await res.json();
        dispatch(editSongAction(song));
        return song;
    }
};

const initialState = {}
//fetch to get data for state?
// await fetch('/api/songs')

// Reducer
export default function songsReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) { //newstate =action.payload
        case GET_SONGS:
            console.log('the action.songs is', action.songs)
            newState = action.songs
            console.log('the new state is: ', newState)
            return newState
        case DELETE_SONG:
            delete { ...state[action.songId] }
            return state;
        default:
            return state;
    }
}
