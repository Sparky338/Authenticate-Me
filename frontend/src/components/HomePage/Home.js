import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import UploadSong from "../Songs/CreateSong/CreateSongNav";

const Home = () => {
    const history = useHistory();

    if (useSelector(state => state.session.user)) {
        history.push('/songs')
    }

    return (
        <div>
            <div>search bar: {/*(search for artist, bands, tracks, podcasts)*/} or upload song button<UploadSong /> {/*(make button, make available when not logged in-redirect to signup?)*/} </div>
            <div className="body">
                <h2 className="body-title"> Hear what's trending for free in the SoundCloud community</h2>
                <Link className="free-music music-cards" to={`/songs`}>Free music: {/* 12 cards(double row)*/}</Link>
            </div>

        </div>

    )
}

export default Home;
