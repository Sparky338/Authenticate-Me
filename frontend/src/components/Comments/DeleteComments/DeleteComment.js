import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteComment } from '../../../store/comments';

const DeleteCommentButton = ({comment}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();

    const sessionState = useSelector(state => state.session);
    const currentUser = sessionState.user?.id;

    if (currentUser === comment.userId) {
        const handleClick = async () => {
            const deleted = await dispatch(deleteComment(comment.id))
            if (deleted) history.push(`/songs/${songId}`);
        }
        return (
            <button className="delete-button button" onClick={handleClick}>Delete</button>
        )
    }
}

export default DeleteCommentButton
