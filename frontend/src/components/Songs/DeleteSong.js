import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSong } from "../../store/songs";

const DeleteSongButton = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const songObj = useSelector(state => state.songs)
    const songs = Object.values(songObj);

    const handleClick = () => {
        dispatch(deleteSong(songs[0].id))
        history.push('/songs');
    }

    return (
        <button onClick={handleClick}>Delete</button>
    )
}

export default DeleteSongButton;
