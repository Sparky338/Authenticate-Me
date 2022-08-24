import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSongById } from "../../store/songs";

const SongById = () => {
    const dispatch = useDispatch();
    const {songId} = useParams();
    const songById = [useSelector(state => state.songs[songId])].flat();

    useEffect(() => {
        dispatch(getSongById(songId));
    }, [dispatch])


    if (!songById) {
        return null
    }
console.log('print', songById)
    return (
        <div>
            {songById.map((song) => {
                return (
                    <li key={song.id}>
                        Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId}
                    </li>
                )
            })}
        </div>
    );

}

export default SongById;
