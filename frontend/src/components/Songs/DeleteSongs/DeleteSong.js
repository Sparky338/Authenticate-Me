import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSong } from '../../../store/songs';

const DeleteSongButton = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();
    const songsState = useSelector(state => state.songs)
    const sessionState = useSelector(state => state.session)
    const currentUser = sessionState.user.id
    // const songs = Object.values(songsState);
    const artist = songsState[songId].userId;
    const song = songsState[songId].id;

    // const artist = useSelector(state => state.songs[songId].userId)

    // if (!songObj[0]) return null

    // const artist = songObj[songId].userId

    // console.log('song', song)

    if (currentUser === artist) {
        const handleClick = async () => {
            const deleted = await dispatch(deleteSong(song))
            if (deleted && !song) history.push('/songs');
        }
        return (
            <button onClick={handleClick}>Delete</button>
        )
    } else return null;

}

export default DeleteSongButton;
