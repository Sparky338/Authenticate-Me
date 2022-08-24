import { csrfFetch } from "./csrf";

// Types
const GET_SONGS = 'songs/GET_SONGS';
// const GET_ONE_SONG = 'songs/GET_ONE_SONG';
const CREATE_SONG = 'songs/CREATE_SONG';
const EDIT_SONG = 'songs/EDIT_SONG';
const DELETE_SONG = 'songs/DELETE_SONG';

// Action Creators
const getSongsAction = (songs) => {
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
export const getAllSongs = () => async dispatch => {
    const res = await csrfFetch('/api/songs');

    if (res.ok) {
        const songs = await res.json();
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
        dispatch(getSongsAction(songs.songs));
    }
};

export const getSongById = (songId) => async dispatch => {
    const res = await csrfFetch(`/api/songs/${songId}`);

    if (res.ok) {
        const song = await res.json();
        console.log('res.json', song)
        const songArr = [song].flat()
        dispatch(getSongsAction(songArr));
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

// Reducer
export default function songsReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        //normalize data: businessArr.forEach(business => newState[business.id] = business)
        case GET_SONGS:
            console.log('action.songs', action.songs)
            action.songs.forEach(song => newState[song.id] = song)
            // newState = action.songs
            return newState
        case CREATE_SONG:
            break
        case DELETE_SONG:
            delete { ...state[action.songId] }
            return state;
        default:
            return state;
    }
}
