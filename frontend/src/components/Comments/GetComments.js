import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSongComments } from "../../store/comments";


const CommentsBySongId = () => {
    const dispatch = useDispatch();
    const songsSession = useSelector((state) => (state.songs));
    const { songId } = useParams();
    const commentsSession = useSelector((state) => (state.comments));
    // let comments; //= dispatch(getSongComments(songId));

    useEffect(() => {
        dispatch(getSongComments(songId));
    }, [dispatch])

    if (!commentsSession) return null

    const comments = Object.values(commentsSession);

    return (
        <div>
            {comments.map((comment) => {
                return (
                    <div className='comments' key={comment.id}>
                        {/* <div>{User.username}</div> */}
                        <p>{comment.body}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default CommentsBySongId
