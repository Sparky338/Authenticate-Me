import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllSongs = () => {
    const dispatch = useDispatch();
    const songsSession = useSelector((state) => (state.songs));

    if (!songsSession) return null

    const songs = Object.values(songsSession)

    return (
        <div>
            {songs.map((song) => {
                return (
                    <li key={song.id}>
                        {/* Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId} */}
                        <Link to={`/songs/${song.id}`}>Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId}</Link>
                    </li>
                )
            })}
            <div><Link to={`/songs/current`}>Current User's songs</Link></div>
        </div>
    );

}

export default AllSongs;
