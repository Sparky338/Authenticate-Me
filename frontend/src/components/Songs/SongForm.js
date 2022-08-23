import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSong } from "../../store/songs";

const SongForm = ({song, formtype}) => {
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
        dispatch(createSong(newSong))
        history.push(`/songs/${song.id}`)
    };

    return (
        <div></div>
    )
}

export default SongForm;
