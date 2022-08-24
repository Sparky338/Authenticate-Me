import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SongForm from './SongForm'

const EditSongForm = () => {
    const {songId} = useParams();
    const song = useSelector(state => state.songs[songId])

    if (!song) return null;
    
    return (
        <SongForm song={song} formType="Update song" />
    );
}

export default EditSongForm;
