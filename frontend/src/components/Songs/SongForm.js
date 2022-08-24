import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSong, editSong } from "../../store/songs";

const SongForm = ({song, formType}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [title, setTitle] = useState(song.title || '');
    const [description, setDescription] = useState(song.description || '');
    const [url, setUrl] = useState(song.url || '');
    const [imageUrl, setImageUrl] = useState(song.imageUrl || '');
    const [albumId, setAlbumId] = useState(song.albumId || null);


    const handleSubmit = (e) => {
        e.preventDefault();
        const newSong = {...song, title, description, url, imageUrl, albumId};
        if (formType === 'Upload a song'){
            dispatch(createSong(newSong))
        } else if (formType === "Update song"){
            dispatch(editSong(song.id, newSong))
        }
        history.push(`/songs/${song.id}`)
    };

    return (
        <form onSubmit={handleSubmit} >
            <h2>{formType}</h2>
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </label>
            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </label>
            <label>
                URL:
                <input
                    type="text"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                />
            </label>
            <label>
                Image URL:
                <input
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
    )
}

export default SongForm;