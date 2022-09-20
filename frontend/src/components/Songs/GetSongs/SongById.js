import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import CreateCommentForm from "../../Comments/CreateComments/CreateCommentForm";
import CommentsBySongId from "../../Comments/GetComments/GetComments";
import DeleteSong from "../DeleteSongs/DeleteSong";

const SongById = () => {
    const { songId } = useParams();
    const session = useSelector(state => state.session);
    const commentsState = useSelector(state => state.comments);
    const songObj = useSelector(state => state.songs);
    const songs = Object.values(songObj)
    const currentUserId = session.user?.id;

    if (!songId) return null;
    if (!commentsState) return null;


    const artistId = songObj[songId]?.userId;
    const filteredSong = songs.filter(song => song.id === +songId);

    return (
        <div className="songs">
            {filteredSong.map((song) => {
                return (
                    <div className="songById" key={song.id}>
                        Artist Id:{song.userId}, Song Title:{song.title}
                        <div className="description">Description: {song.description}</div>
                        {currentUserId === artistId ? [
                            <Link to={`/songs/${song.id}/edit`}>Edit</Link>,
                            <DeleteSong />
                        ] : ""}
                        <CreateCommentForm />
                        <div className="comments song-comments">Comments: <CommentsBySongId /></div>
                    </div>
                )
            })}
        </div>
    );
}

export default SongById;
