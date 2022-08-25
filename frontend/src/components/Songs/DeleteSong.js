import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { deleteSong } from "../../store/songs";

const DeleteSongButton = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const songObj = useSelector(state => state.songs)
    const songs = Object.values(songObj);

    useEffect(() => {
        dispatch(deleteSong(songs[0].id))
        // history.push('/songs');
    })

    return (
        <button onClick={() => dispatch(deleteSong(songs.id))}>Delete</button>
    )
}

export default DeleteSongButton;
