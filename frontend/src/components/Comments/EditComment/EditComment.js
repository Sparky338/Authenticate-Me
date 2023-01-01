import { useSelector } from "react-redux";
import CommentForm from "../CommentForm";

const EditComment = ({comment}) => {
    const currentUser = useSelector(state => state.session.user)

    if (currentUser === comment.userId) {
        <CommentForm comment={comment} formType="Edit comment" />
    }
}

export default EditComment;
