

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

const editSongAction = (song) => {
    return {
        type: EDIT_SONG,
        song
    }
}

const deleteSongAction = () => {
    return {
        type: DELETE_SONG
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

export const getOneSong = (songId) => async dispatch => {
    const res = await fetch(`/api/songs/${songId}`);

    if (res.ok) {
        const song = await res.json();
        dispatch(getSongsAction(song));
    }
};


export const getSongs = () => async dispatch => {
    const res = await fetch('/api/songs');

    if (res.ok) {
        const songs = await res.json();
        dispatch(getSongsAction(songs));
    }
};
export const getSongs = () => async dispatch => {
    const res = await fetch('/api/songs');

    if (res.ok) {
        const songs = await res.json();
        dispatch(getSongsAction(songs));
    }
};

// Reducer
