import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


const Home = () => {
    const history = useHistory();

    if (useSelector(state => state.session.user)) {
        history.push('/songs')
    }

    return (
        <div>
            <div className="home home-body">
                <h2 className="body-title"> Hear what's trending for free in the SoundCloud community</h2>
                <button className="button free-music link-to-songs" onClick={() => history.push('/songs')}>Explore the entire library {/* 12 cards(double row)*/}</button>
            </div>

        </div>

    )
}

export default Home;
