import { useSelector } from "react-redux";
import CommentForm from "../CommentForm";

const EditComment = () => {
    const currentUser = useSelector(state => state.session.user)
    

}

export default EditComment;
