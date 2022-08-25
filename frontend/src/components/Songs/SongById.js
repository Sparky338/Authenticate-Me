import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getSongById } from "../../store/songs";
import DeleteSong from "./DeleteSong";

const SongById = () => {
    const dispatch = useDispatch();
    const {songId} = useParams();
    const songById = [useSelector(state => state.songs[songId])];
    const currentUserId = useSelector(state => state.session.user.id)

    useEffect(() => {
        dispatch(getSongById(songId));
    }, [dispatch])


    if (!songById[0]) {
        return null
    }
    const artistId = songById[0].userId
    console.log('artistId', artistId)

    if (currentUserId === artistId){
        return (
            <div>
                {songById.map((song) => {
                    return (
                        <li key={song.id}>
                            Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId}
                            <Link to={`/songs/${song.id}/edit`}>Edit</Link>
                            <DeleteSong />
                        </li>
                    )
                })}
            </div>
        );
    } else {
        return (
            <div>
                {songById.map((song) => {
                    return (
                        <li key={song.id}>
                            Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId}
                            {/* <Link to={`/songs/${song.id}/edit`}>Edit</Link> */}
                            {/* <DeleteSong /> */}
                        </li>
                    )
                })}
            </div>
        );
    }

}

export default SongById;
