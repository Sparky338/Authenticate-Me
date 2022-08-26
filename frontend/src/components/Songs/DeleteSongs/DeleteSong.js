import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSong } from "../../store/songs";

const DeleteSongButton = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();
    const songObj = useSelector(state => state.songs)
    const songs = Object.values(songObj);
    const currentUser = useSelector(state => state.session.user.id)

    const artist = useSelector(state => state.songs[songId].userId)

    // if (!songObj[0]) return null

    // const artist = songObj[songId].userId

    if (currentUser === artist) {
        const handleClick = async () => {
            dispatch(deleteSong(songs[0].id))
            history.push('/songs');
        }
        return (
            <button onClick={handleClick}>Delete</button>
        )
    } else return null;

}

export default DeleteSongButton;
