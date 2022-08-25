import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSongsCurrentUser } from "../../store/songs";

const SongsCurrentUser = () => {
    const dispatch = useDispatch();
    const songsObj = useSelector((state) => (state.songs));
    const songs = Object.values(songsObj);

    useEffect(() => {
        dispatch(getSongsCurrentUser());
    }, [dispatch])

    

    if (!songs) {
        return null
    }

    return (
        <div>
            {songs.map((song) => {
                    return (
                        <li key={song.id}>
                            Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId}

                            <Link to={`/songs/${song.id}/edit`}>Edit</Link>
                        </li>
                    )
                })}
        </div>

    );
}

export default SongsCurrentUser
