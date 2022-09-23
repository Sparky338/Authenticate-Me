import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import SongCard from "../SongCard";

const AllSongs = () => {
    const songsSession = useSelector((state) => (state.songs));

    if (!songsSession) return null

    const songs = Object.values(songsSession)
    // if (!songs)
    return (
        <div className="outer-div">
            <div className="all-songs">
                <ul className="songs-ul">
                    {songs.map((song) => {
                        return (
                            // <div className="allSongs" key={song.id}>
                            //     <Link to={`/songs/${song.id}`}>Artist Id:{song.userId}, Song Title:{song.title}</Link>
                            // </div>
                            <SongCard className="allSongs" key={song.id} {...song} />
                        )
                    })}
                </ul>
            </div>
        </div>
    );

}

export default AllSongs;
