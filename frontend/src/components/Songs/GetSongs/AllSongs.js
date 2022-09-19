import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllSongs = () => {
    const songsSession = useSelector((state) => (state.songs));

    if (!songsSession) return null

    const songs = Object.values(songsSession)

    return (
        <div>
            {songs.map((song) => {
                return (
                    <div className="allSongs" key={song.id}>
                        <Link to={`/songs/${song.id}`}>Artist Id:{song.userId}, Song Title:{song.title}</Link>
                    </div>
                )
            })}
            <div><Link to={`/songs/current`}>Current User's songs</Link></div>
        </div>
    );

}

export default AllSongs;
