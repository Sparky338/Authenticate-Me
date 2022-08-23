import SongForm from './SongForm'

const CreateSongForm = () => {
    // make a form with title, description, url, imageUrl, albumId in an object
    const report = {
        title: '',
        description: '',
        url: '',
        imageUrl: '',
        albumId: null
    };

    return (
        <SongForm report={report} formType="Upload a song" />
    )
}

export default CreateSongForm;
