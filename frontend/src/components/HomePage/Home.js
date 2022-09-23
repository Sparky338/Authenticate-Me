import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SongCard from "../Songs/SongCard";
import './Home.css'

const Home = () => {
    const history = useHistory();
    const songsSession = useSelector((state) => (state.songs));

    if (useSelector(state => state.session.user)) {
        history.push('/songs')
    }
    if (!songsSession) return null

    const songs = Object.values(songsSession)


    return (
        <div className="home-outer outer-div">
            <div className="home trending-text"> Hear what's trending for free in the SoundCloud community</div>
            <div className="song-card-outer">
                <ul className="songs-ul">
                    {songs.slice(0,12).map((song) => {
                        return (
                            // <div className="allSongs" key={song.id}>
                            //     <Link to={`/songs/${song.id}`}>Artist Id:{song.userId}, Song Title:{song.title}</Link>
                            // </div>
                            <SongCard className="allSongs" key={song.id} {...song} />
                        )
                    })}
                </ul>
            </div>
            <div className="button-div">
                <button className="button free-music" onClick={() => history.push('/songs')}>Explore the entire library {/* 12 cards(double row)*/}</button>
            </div>
        </div>

    )
}

export default Home;
