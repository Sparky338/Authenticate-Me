import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SongForm from '../SongForm'

const EditSongForm = () => {
    const { songId } = useParams();
    const songsState = useSelector(state => state.songs);
    const sessionState = useSelector(state => state.session);
    const currentUser = sessionState.user.id;
    // const song = useSelector(state => state.songs[songId])
    // const currentUser = useSelector(state => state.session.user.id);
    // const artist = useSelector(state => state.songs[songId].userId)

    if (!songId) return null;
    const artist = songsState[songId].userId;
    console.log('artist', artist)
    const song = songsState[songId];

    if (currentUser === artist) {
        return (
            <SongForm song={song} formType="Update song" />
        );
    } else return null
}

export default EditSongForm;
