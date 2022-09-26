// import { csrfFetch } from "./csrf";

// Types
const LOAD_SONG = 'songs/LOAD_SONG';

// Action Creators

export const loadCurrentSong = (url) => {
    return {
        type: LOAD_SONG,
        url
    }
}


const initialState = {currentUrl: null}

// Reducer
export default function currentSongReducer(state = initialState, action) {
    //normalize data example: businessArr.forEach(business => newState[business.id] = business)
    switch (action.type) {
        case LOAD_SONG:
            const newState = { ...state }
            newState.currentUrl = action.url
            return newState;
            // break
        default:
            return state;
    }
}
