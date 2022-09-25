import { csrfFetch } from "./csrf";

// Types
const GET_SONGS = 'songs/GET_SONGS';
const CREATE_SONG = 'songs/CREATE_SONG';
const EDIT_SONG = 'songs/EDIT_SONG';
const DELETE_SONG = 'songs/DELETE_SONG';
const CLEAR_SONGS = 'songs/CLEAR_SONG';

// Action Creators
const getSongsAction = (songs) => {
    return {
        type: GET_SONGS,
        songs
    }
}

const createSongAction = (song) => {
    return {
        type: CREATE_SONG,
        song
    }
}

const editSongAction = (song) => {
    return {
        type: EDIT_SONG,
        song
    }
}

export const deleteSongAction = (songId) => {
    return {
        type: DELETE_SONG,
        songId
    }
}

export const clearSongAction = () => {
    return {
        type: CLEAR_SONGS
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

export const createSong = (songData) => async dispatch => {
    songData.imageUrl = "https://cdn.pixabay.com/photo/2017/04/19/10/24/vinyl-2241789_960_720.png"

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

export const deleteSong = (songId) => async dispatch => {
    const res = await csrfFetch(`/api/songs/${songId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
        const song = `${songId}`
        dispatch(deleteSongAction(song))
    }
}

const initialState = {}

// Reducer
export default function songsReducer(state = initialState, action) {
    //normalize data example: businessArr.forEach(business => newState[business.id] = business)
    const newState = { ...state }
    switch (action.type) {
        case GET_SONGS:
            action.songs.forEach(song => newState[song.id] = song)
            return newState;
        case CREATE_SONG:
            newState[action.song.id] = action.song
            return newState;
        case EDIT_SONG:
            newState[action.song.id] = action.song
            return newState;
        case DELETE_SONG:
            delete newState[action.songId]
            return newState;
        case CLEAR_SONGS:
            return {}
        default:
            return state;
    }
}
