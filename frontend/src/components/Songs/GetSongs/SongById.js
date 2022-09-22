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
                                <button className="individual-play-button" onClick={() => handlePlay}>{playIcon}</button>
                                <div className="song-title">{song.title}</div>
                                <div className="artist-name">{song.User.username}</div> {/*convert to link after artist component*/}
                                {/* <div className="album-name">{song.Album.title}</div>  Add when albums component exists*/}
                                <div className="song-image">
                                    <img src={song.imageUrl} alt='Song Artwork' />
                                </div>
                            </div>
                            {currentUserId === artistId ? [
                                <Link className="link edit-link" to={`/songs/${song.id}/edit`}>Edit</Link>,
                                <DeleteSong />
                            ] : ""}
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
