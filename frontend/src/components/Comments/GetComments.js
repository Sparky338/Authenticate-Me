import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CommentsBySongId = () => {
    const songsObj = useSelector((state) => (state.songs));
    const songId = useParams()
    // const comments =

    return (
        <div>

        </div>
    );
};

export default CommentsBySongId
