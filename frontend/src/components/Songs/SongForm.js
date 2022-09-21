import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSong, editSong } from "../../store/songs";

const SongForm = ({ song, formType }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [title, setTitle] = useState(song.title || '');
    const [description, setDescription] = useState(song.description || '');
    const [url, setUrl] = useState(song.url || '');
    const [imageUrl, setImageUrl] = useState(song.imageUrl || '');
    const [albumId/*, setAlbumId*/] = useState(song.albumId || null);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        const errors = [];

        if (!title) errors.push("Song title is required");
        if (!url) errors.push("Audio is required");
        if (!url.endsWith('.mp3')) errors.push("Audio file must be an mp3");
        if (!imageUrl) {
            setImageUrl('https://cdn.pixabay.com/photo/2016/04/07/22/09/note-1314939__340.png')
        }
        // if (!imageUrl.endsWith('.jpg') && !imageUrl.endsWith('.jpeg') && !imageUrl.endsWith('.png')) {
        //     errors.push("Image file must be a jpg, jpeg, or png");
        // }

        setValidationErrors(errors);
    }, [title, url, imageUrl])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        if (validationErrors.length) return alert(`Can't submit, please fill in the missing information.`)

        const newSong = { ...song, title, description, url, imageUrl, albumId };

        if (formType === "Upload a song") {
            const awaitedSong = await dispatch(createSong(newSong))
            history.push(`/songs/${awaitedSong.id}`)
        } else if (formType === "Update song") {
            const awaitedSong = await dispatch(editSong(song.id, newSong))
            history.push(`/songs/${awaitedSong.id}`)
        }
    };

    return (
        <div className="song-form">
            <form className="form song-form" onSubmit={handleSubmit} >
                <h2>{formType}</h2>
                {hasSubmitted && validationErrors.length > 0 && (
                    <div className="error-handling">There were errors in your submission:
                        <ul>
                            {validationErrors.map(error => (
                                <li className="errors" key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <label>
                    Title:
                    <input
                        className='input'
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    Description:
                    <input
                        className='input'
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Song URL:
                    <input
                        className='input'
                        type="text"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        className='input'
                        type="text"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                    />
                </label>
                {/* dropdown menu with albums that user owns */}
                {/* https://www.robinwieruch.de/react-dropdown/ good tutorial*/}
                {/* <label>
                Album Id:
                <input
                    type="integer"
                    value={albumId}
                    onChange={e => setAlbumId(e.target.value)}
                />
            </label> */}
                <input type="submit" value={formType} />
            </form>
        </div>
    )
}

export default SongForm;
