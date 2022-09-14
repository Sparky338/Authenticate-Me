import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch/*, useSelector*/ } from "react-redux";
import { createComment, editComment } from "../../store/comments";

const CommentForm = ({ comment, formType }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { songId } = useParams();

    const [comment, setComment] = useState(comment.body || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = { ...comment, body };
        if (formType === "Write a comment") {
            const awaitedComment = await dispatch(createComment(songId, newComment))
            history.push(`/songs/${awaitedComment.songId}`)
        } else
            if (formType === "Edit comment") {
                const awaitedComment = await dispatch(editComment(comment.id, newComment))
                history.push(`/songs/${awaitedComment.songId}`)
            }
    };

    return (
        <div className="commentsForm form">
            <form onSubmit={handleSubmit}>
                <h2>{formType}</h2>
                <label>
                    Comment:
                    <textarea
                        // type="text"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                </label>
            </form>
        </div>
    )
}

export default CommentForm
