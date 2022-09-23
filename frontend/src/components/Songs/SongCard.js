import { Link } from "react-router-dom";
import './SongCard.css';
import { useDispatch } from "react-redux";
import { loadCurrentSong } from "../../store/currentSong";

const SongCard = ({ id, userId, albumId, title, description, url, imageUrl, User }) => {
    const dispatch = useDispatch();
    const playIcon = <i class="fa-solid fa-circle-play fa-3x"></i>

    const handlePlay = (url) => {
        dispatch(loadCurrentSong(url))
//ternary to either dispatch or pause song. ternary to have a play icon or pause icon.
    }

    return (
        <div className="song-cards">
            <li className="song-card">
                <div className="card-outer">
                    <img className="image card-image" src={`${imageUrl}`} alt={`Song artwork`} />
                    <button className="play-button button-overlap" onClick={() => handlePlay(url)}>{playIcon}</button>
                </div>
                <Link to={`/songs/${id}`} className="title link card-title">{title}</Link>
                <div className="artist card-artist">{User.username}</div> {/*Can change to Link in future when Artist page is setup*/}
            </li>
        </div>
    );
};

export default SongCard;
