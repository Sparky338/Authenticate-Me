import SongForm from '../SongForm'

const CreateSongForm = () => {
    const song = {
        title: '',
        description: '',
        url: '',
        imageUrl: '',
        albumId: null
    };

    // if (!song) return null;

    return (
        <SongForm song={song} formType="Upload a song" />
    )
}

export default CreateSongForm;
