import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSongsCurrentUser } from "../../store/songs";

const SongsCurrentUser = () => {
    const dispatch = useDispatch();
    const songsObj = useSelector((state) => (state.songs));
    const songs = Object.values(songsObj);
    const { songId } = useParams();

    const currentUser = useSelector(state => state.session.user.id);
    // const artist = useSelector(state => state.songs[songId].userId)


    useEffect(() => {
        dispatch(getSongsCurrentUser());
    }, [dispatch])



    if (!songs) {
        return null
    }

    if (currentUser) {
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
    } else {
        return (
            <div>
                {songs.map((song) => {
                    return (
                        <li key={song.id}>
                            Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId}
                        </li>
                    )
                })}
            </div>
        );
    }


}

export default SongsCurrentUser
