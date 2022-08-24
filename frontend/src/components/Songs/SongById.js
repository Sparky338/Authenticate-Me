import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getSongById } from "../../store/songs";

const SongById = () => {
    const dispatch = useDispatch();
    const {songId} = useParams();
    const songById = [useSelector(state => state.songs[songId])];

    useEffect(() => {
        dispatch(getSongById(songId));
    }, [dispatch])


    if (!songById[0]) {
        return null
    }
console.log('print', songById)
    return (
        <div>
            {songById.map((song) => {
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

export default SongById;
