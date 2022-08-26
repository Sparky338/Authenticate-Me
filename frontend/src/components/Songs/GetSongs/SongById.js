import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import DeleteSong from "./DeleteSong";

const SongById = () => {
    const dispatch = useDispatch();
    const {songId} = useParams();
    const songObj = useSelector(state => state.songs);
    const songs = Object.values(songObj)
    const songById = songs.songId //maybe songs[songId]
    const session = useSelector(state => state.session)

    const currentUserId = session.user.id
    const artistId = songById[0].userId

    // if (!songById[0]) {
    //     return null
    // }

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
                        </li>
                    )
                })}
            </div>
        );
    }

}

export default SongById;
