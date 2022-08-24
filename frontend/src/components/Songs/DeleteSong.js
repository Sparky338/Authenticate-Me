import { deleteSongAction } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const DeleteSongButton = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const songObj = useSelector(state => state.songs)
    const songs = Object.values(songObj);

    // history.push('/songs');

    return (
        <button onClick={() => dispatch(deleteSongAction(songs.id))}>Delete</button>
    )
}

export default DeleteSongButton;
