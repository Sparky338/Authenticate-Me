import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSongComments } from "../../../store/comments";
import DeleteCommentButton from "../DeleteComments/DeleteComment";

const CommentsBySongId = () => {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const commentsState = useSelector((state) => (state.comments));
    const comments = Object.values(commentsState);

    useEffect(() => {
        dispatch(getSongComments(songId));
    }, [dispatch, songId])

    if (!commentsState) return null

    const filteredComments = comments.filter(comment => comment.songId === +songId);
    return (
        <div>
            {filteredComments.map((comment) => {

                return (
                    <div className='comments' key={comment.id}>
                        <div className="comments username">{comment.User.username}</div>
                        <p className="comments commentBody">{comment.body}</p>
                        <DeleteCommentButton comment={comment} />
                    </div>
                )
            })}
        </div>
    );
};

export default CommentsBySongId
