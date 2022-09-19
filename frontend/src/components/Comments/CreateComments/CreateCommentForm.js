import { useSelector } from 'react-redux';
import CommentForm from '../CommentForm';

const CreateCommentForm = () => {
    const currentUser = useSelector(state => state.session.user)

    const comment = {
        body: ''
    };

    if (currentUser){
        return (
            <CommentForm comment={comment} formType="Comment" />
        );
    }
}

export default CreateCommentForm;
