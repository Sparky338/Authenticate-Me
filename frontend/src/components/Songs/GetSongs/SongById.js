import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import CreateCommentForm from "../../Comments/CreateComments/CreateCommentForm";
import CommentsBySongId from "../../Comments/GetComments/GetComments";
import DeleteSong from "../DeleteSongs/DeleteSong";

import './Songs.css'

const SongById = () => {
    const { songId } = useParams();
    const session = useSelector(state => state.session);
    const commentsState = useSelector(state => state.comments);
    const songObj = useSelector(state => state.songs);
    const songs = Object.values(songObj)
    const currentUserId = session.user?.id;
    const linkStyling = {
        textDecoration: 'none',
        color: '#f50',
        paddingRight: '10px',
        paddingLeft: '10px',
        fontSize: '18px'
    }

    const playIcon = <i class="fa-solid fa-circle-play fa-5x"></i>
    const handlePlay = () => {

    }

    if (!songId) return null;
    if (!commentsState) return null;


    const artistId = songObj[songId]?.userId;
    const filteredSong = songs.filter(song => song.id === +songId);

    return (
        <div className="outer-div">
            <div className="songs">
                {filteredSong.map((song) => {
                    return (
                        <div className="songById" key={song.id}>
                            <div className="song-player">
                                <div className="upper-left">
                                    <button className="individual-play-button" onClick={() => handlePlay}>{playIcon}</button>
                                    <div className="song-details">
                                        <div className="song-title"><span>{song.title}</span></div>
                                        <div className="artist-name"><span>{song.User.username}</span></div> {/*convert to link after artist component*/}
                                        {/* <div className="album-name">{song.Album.title}</div>  Add when albums component exists*/}
                                    </div>
                                </div>
                                <div className="lower-left">{/*waveform?*/}</div>
                                <div className="song-image">
                                    <img src={song.imageUrl} alt='Song Artwork' />
                                </div>
                            </div>
                            <div className="owner-options">
                                {currentUserId === artistId ? [
                                    <Link to={`/songs/${song.id}/edit`} style={linkStyling}>Edit</Link>,
                                    <DeleteSong />
                                ] : ""}
                            </div>
                            <div className="song-comment-form">
                                <CreateCommentForm />
                            </div>
                            <div className="song-description">Song Description: {song.description}</div>
                            <div className="comments song-comments">Comments: <CommentsBySongId /></div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default SongById;
