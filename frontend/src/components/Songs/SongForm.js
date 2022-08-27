import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch/*, useSelector*/ } from "react-redux";
import { createSong, editSong } from "../../store/songs";

const SongForm = ({ song, formType }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { songId } = useParams();
    // const sessionState = useSelector(state => state.session);
    // const songsState = useSelector(state => state.songs)
    // const currentUser = sessionState.user.id;

    // const currentUsername = sessionState.user.username;
    // const currentUsername = useSelector(state => state.session.user.username);
    // const currentUser = useSelector(state => state.session.user.id);
    // const artist = useSelector(state => state.songs[songId].userId)


    const [title, setTitle] = useState(song.title || '');
    const [description, setDescription] = useState(song.description || '');
    const [url, setUrl] = useState(song.url || '');
    const [imageUrl, setImageUrl] = useState(song.imageUrl || '');
    const [albumId, setAlbumId] = useState(song.albumId || null);
    // const [user, setUser] = useState(currentUsername);


    if (!songId) return null
    // const artist = songsState[songId].userId;
    console.log('songs', song)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSong = { ...song, title, description, url, imageUrl, albumId };
        if (formType === "Upload a song") {
            const awaitedSong = await dispatch(createSong(newSong))
            history.push(`/songs/${awaitedSong.id}`)
        } else /*if  (currentUser === artist) { BEING HANDLED IN EDITSONGFORM*/
            if (formType === "Update song") {
                const awaitedSong = await dispatch(editSong(song.id, newSong))
                history.push(`/songs/${awaitedSong.id}`)
            }
        // }
    };

    return (
        <div>
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
        </div>
    )
}

export default SongForm;
