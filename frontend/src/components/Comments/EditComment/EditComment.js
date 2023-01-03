import { useState } from "react";
import { useSelector } from "react-redux";
import CommentForm from "../CommentForm";

const EditComment = ({ comment }) => {
    const currentUser = useSelector(state => state.session.user);
    const [editMode, setEditMode] = useState(false);

    if ((currentUser.id === comment.userId) && !editMode) {
        const handleClick = () => {
            setEditMode(true);
            <CommentForm comment={comment} formType="Edit comment" />
            setEditMode(false);
        }
        return (
            <button className="edit-button button" onClick={handleClick}>Edit</button>
        )
    }
}

export default EditComment;
