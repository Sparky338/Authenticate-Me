import { csrfFetch } from "./csrf";

// Types
const GET_COMMENTS = 'comments/GET_COMMENTS';
const CREATE_COMMENT = 'comments/CREATE_COMMENT';
const EDIT_COMMENT = 'comments/EDIT_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

// Action Creators
const getCommentsAction = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}

const createCommentAction = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

const editCommentAction = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

export const deleteCommentAction = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

// Thunks
export const getAllComments = () => async dispatch => {
    const res = await csrfFetch('/api/comments');

    if (res.ok) {
        const comments = await res.json();
        dispatch(getCommentsAction(comments.comments));
    }
};

export const createComment = (commentData) => async dispatch => {
    const res = await csrfFetch(`/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData)
    });

    if (res.ok) {
        const comment = await res.json();
        dispatch(createCommentAction(comment));
        return comment;
    }
};

export const editComment = (commentId, editCommentData) => async dispatch => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCommentData)
    });

    if (res.ok) {
        const comment = await res.json();
        dispatch(editCommentAction(comment));
        return comment;
    }
};

export const deleteComment = (commentId) => async dispatch => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
        const comment = `${commentId}`
        dispatch(deleteCommentAction(comment))
    }
}

const initialState = {}

// Reducer
export default function commentsReducer(state = initialState, action) {
//normalize data example: businessArr.forEach(business => newState[business.id] = business)
    let newState = {...state}
    switch (action.type) {
        case GET_COMMENTS:
            action.comments.forEach(comment => newState[comment.id] = comment)
            return newState;
        case CREATE_COMMENT:
            newState[action.comment.id] = action.comment
            return newState;
        case EDIT_COMMENT:
            newState[action.comment.id] = action.comment
            return newState;
        case DELETE_COMMENT:
            delete newState[action.commentId]
            return newState;
        default:
            return state;
    }
}
