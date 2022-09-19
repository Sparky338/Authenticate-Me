import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import SongForm from '../SongForm'

const EditSongForm = () => {
    const history = useHistory();
    const { songId } = useParams();
    const songsState = useSelector(state => state.songs);
    const sessionState = useSelector(state => state.session);
    const currentUser = sessionState.user.id;

    const artist = songsState[songId].userId;
    const song = songsState[songId];

    if (currentUser === artist) {
        return (
            <SongForm song={song} formType="Update song" />
        );
    } else return (
        <div>
            {history.push(`/songs/${songId}`)}
            {window.alert("You must be the artist to edit this song!")}
        </div>
    )
}


export default EditSongForm;
