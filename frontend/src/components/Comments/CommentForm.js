import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createComment, editComment, getSongComments } from "../../store/comments";

const CommentForm = ({ comment, formType }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { songId } = useParams();

    const [body, setBody] = useState(comment.body || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = { ...comment, body };

        if (!body) {
            window.alert("Comment body text is required")
        }

        if (formType === "Comment") {
            const awaitedComment = await dispatch(createComment(songId, newComment))
            dispatch(getSongComments(awaitedComment.songId))
            setBody('');
        } else if (formType === "Edit comment") {
                const awaitedComment = await dispatch(editComment(comment.id, newComment))
                setBody('');
                await history.push(`/songs/${awaitedComment.songId}`)
            }
    };

    return (
        <div className="commentsForm form">
            <form onSubmit={handleSubmit}>
                <h4>{formType}</h4>
                <label>
                    Comment:
                    <textarea
                        value={body}
                        onChange={e => setBody(e.target.value)}
                    />
                </label>
                <input className="button submitButton" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CommentForm
