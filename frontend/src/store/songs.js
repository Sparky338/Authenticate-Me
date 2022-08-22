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
    const res = await fetch('/api/songs');

    if (res.ok) {
        const songs = await res.json();
        dispatch(getSongsAction(songs));
    }
};

export const getSongsCurrentUser = () => async dispatch => {
    const res = await fetch(`/api/songs/current`);

    if (res.ok) {
        const songs = await res.json();
        dispatch(getSongsAction(songs));
    }
};

export const getArtistSongs = (userId) => async dispatch => {
    const res = await fetch(`/api/users/${userId}/songs`);

    if (res.ok) {
        const songs = await res.json();
        dispatch(getSongsAction(songs));
    }
};

export const createSong = (songData) => async dispatch => {
    const res = await fetch(`/api/songs`, {
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
    const res = await fetch(`/api/songs/${songId}`, {
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
    const newState = {...state}
    switch (action.type) {
        case DELETE_SONG:
            delete newState[action.songId]
            return newState;
        default:
            return state;
    }
}
