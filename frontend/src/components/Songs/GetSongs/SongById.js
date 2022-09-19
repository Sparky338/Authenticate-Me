import { useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import CreateCommentForm from "../../Comments/CreateComments/CreateCommentForm";
import CommentsBySongId from "../../Comments/GetComments/GetComments";
import DeleteSong from "../DeleteSongs/DeleteSong";

const SongById = () => {
    const history = useHistory();
    const { songId } = useParams();
    const session = useSelector(state => state.session);
    const songObj = useSelector(state => state.songs);
    const songs = Object.values(songObj)
    if (!session.user) {
            history.push('/logout')
            // alert('You must be signed in to view a song.')
        }
    const currentUserId = session.user?.id;
    const commentsState = useSelector(state => state.comments);

    if (!songId) return null;
    if (!commentsState) return null;


    const artistId = songObj[songId]?.userId;
    const filteredSong = songs.filter(song => song.id === +songId);

    return (
        <div>
            {filteredSong.map((song) => {
                return (
                    <div className="songById" key={song.id}>
                        Artist Id:{song.userId}, Song Title:{song.title}
                        <div>Description: {song.description}</div>
                        {currentUserId === artistId ? [
                            <Link to={`/songs/${song.id}/edit`}>Edit</Link>,
                            <DeleteSong />
                        ] : ""}
                        <CreateCommentForm />
                        <div>Comments: <CommentsBySongId /></div>
                    </div>
                )
            })}
        </div>
    );
}

export default SongById;
