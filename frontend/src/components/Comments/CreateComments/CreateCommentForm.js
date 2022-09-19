import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import CommentForm from '../CommentForm';

const CreateCommentForm = () => {
    // const history = useHistory();
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
