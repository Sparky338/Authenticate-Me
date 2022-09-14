import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteComment } from '../../../store/comments';

const DeleteCommentButton = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();
    const commentsState = useSelector(state => state.comments);
    const sessionState = useSelector(state => state.session);
    const currentUser = sessionState.user.id;
    const commenter = commentsState[songId].userId;
    const commentId = commentsState[songId].id;

     if (currentUser === commenter) {
        const handleClick = async () => {
            const deleted = await dispatch(deleteComment(commentId))
            if (deleted) history.push(`/songs/${songId}`);
        }
        return (
            <button onClick={handleClick}>Delete</button>
        )
    } else return null;
}

export default DeleteCommentButton
