import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CommentForm from '../CommentForm';

const CreateCommentForm = () => {
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user)

    const comment = {
        body: ''
    };

    if (currentUser){
        return (
            <CommentForm comment={comment} formType="Write a comment" />
        );
    } else return (
        <div>
            {history.push(`/songs`)}
            {window.alert("You must be signed in to write a comment!")}
        </div>
    )
}

export default CreateCommentForm;
