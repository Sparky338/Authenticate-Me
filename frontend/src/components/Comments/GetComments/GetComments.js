import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSongComments } from "../../../store/comments";
import DeleteCommentButton from "../DeleteComments/DeleteComment";
import EditComment from "../EditComment/EditComment";
import './Comments.css'

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
                        <div className="comments comment-username">{comment.User?.username}</div>
                        <div className="hover-delete">
                            <div className="comment-and-delete">
                                <div className="comments comment-body">{comment.body}</div>
                                <div className="comment-edit-button">
                                    <EditComment comment={comment} />
                                </div>
                                <div className="comment-delete-button">
                                    <DeleteCommentButton comment={comment} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default CommentsBySongId
