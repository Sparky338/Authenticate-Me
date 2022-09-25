import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import SongCard from "../SongCard";

const AllSongs = () => {
    const songsSession = useSelector((state) => (state.songs));
    const userSession = useSelector(state => (state.session.user));

    if (!songsSession) return null;

    const songs = Object.values(songsSession)

    return (
        <div className="outer-div">
            {userSession ? <div className="signed-in-library"> Enjoy the entire library of SoundClod, {userSession.username} </div> : <div className="signed-out-library"> Discover the entire library of SoundClod </div>}
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
