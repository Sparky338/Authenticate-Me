import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createComment, editComment, getSongComments } from "../../store/comments";
import './CreateComments/CreateComments.css'

const CommentForm = ({ comment, formType }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { songId } = useParams();
    const [body, setBody] = useState(comment.body || '');
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        const errors = [];

        if (!body) errors.push("Comment body text is required");

        setValidationErrors(errors);
    }, [body])

    // const checkSubmit = (e) => {
    //     if (e && e.keyCode === 13) {
    //         document.forms[0].submit();
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        if (validationErrors.length) return alert(`Can't submit, please fill in the missing information.`)
        const newComment = { ...comment, body };

        if (formType === "Comment") {
            const awaitedComment = await dispatch(createComment(songId, newComment))
            dispatch(getSongComments(awaitedComment.songId))
            setBody('');
            setHasSubmitted(false);
        } else if (formType === "Edit comment") {
            const awaitedComment = await dispatch(editComment(comment.id, newComment))
            setBody('');
            await history.push(`/songs/${awaitedComment.songId}`)
        }
    };

    return (
        <div className="comments-form form">
            <form onSubmit={handleSubmit}>
                {/* <h4>{formType}</h4> */}
                <label>
                    {hasSubmitted && validationErrors.length > 0 && (
                        <div className="error-handling">
                            <ul className="error-handling">
                                {validationErrors.map(error => (
                                    <li className="errors" key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="outer-comment-form">
                        <input
                            className="comment-body"
                            value={body}
                            onChange={e => setBody(e.target.value)}
                            placeholder='Write a comment'
                        />
                    </div>
                    <input className="button submitButton" type="submit" value="Submit" />
                </label>
            </form>
        </div>
    )
}

export default CommentForm
