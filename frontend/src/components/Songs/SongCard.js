import { Link } from "react-router-dom";
import './SongCard.css';

const SongCard = ({ id, userId, albumId, title, description, url, imageUrl, User }) => {
    console.log(User)
    const playIcon = <i class="fa-solid fa-circle-play fa-3x"></i>
    const handlePlay = () => {

    }
    return (
        <div className="song-cards">
            <li className="song-card">
                <div className="card-outer">
                    <img className="image card-image" src={`${imageUrl}`} alt={`Song artwork`} />
                    <div className="play-background"></div>
                    <button className="play-button button-overlap" onClick={() => handlePlay}>{playIcon}</button>
                </div>
                <Link to={`/songs/${id}`} className="title link card-title">{title}</Link>
                <div className="artist card-artist">{User.username}</div>
            </li>
        </div>
    );
};

export default SongCard;
