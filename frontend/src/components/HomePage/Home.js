import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './Home.css'

const Home = () => {
    const history = useHistory();

    if (useSelector(state => state.session.user)) {
        history.push('/songs')
    }

    return (
        <div>
            <div className="home trending-text"> Hear what's trending for free in the SoundCloud community</div>

            <div className="button-div">
            <button className="button free-music" onClick={() => history.push('/songs')}>Explore the entire library {/* 12 cards(double row)*/}</button>
            </div>
        </div>

    )
}

export default Home;
