import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSongsCurrentUser } from "../../store/songs";
import DeleteSongButton from "./DeleteSong";

const SongsCurrentUser = () => {
    const dispatch = useDispatch();
    const songsObj = useSelector((state) => (state.songs));
    const songs = Object.values(songsObj);
    const currentUser = useSelector(state => state.session.user.id);

    useEffect(() => {
        dispatch(getSongsCurrentUser());
    }, [dispatch])

    if (!songs[0]) return null

    const artist = songs[0].userId;

    if (currentUser === artist){
        return (
            <div>
                {songs.map((song) => {
                    return (
                        <li key={song.id}>
                            Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId}
                            <Link to={`/songs/${song.id}/edit`}>Edit</Link>
                            <DeleteSongButton />
                        </li>
                    )
                })}
            </div>
        );
    } else return null
}

export default SongsCurrentUser
