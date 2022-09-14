import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import CreateCommentForm from "../../Comments/CreateComments/CreateCommentForm";
import CommentsBySongId from "../../Comments/GetComments/GetComments";

import DeleteSong from "../DeleteSongs/DeleteSong";

const SongById = () => {
    const {songId} = useParams();
    const session = useSelector(state => state.session);
    const songObj = useSelector(state => state.songs);
    const songs = Object.values(songObj)

    const currentUserId = session.user.id;

    // const songByIdObj = songObj[songId].id //maybe songs[songId]
    // const songById = Object.values(songByIdObj);

    if (!songId) return null
    const artistId = songObj[songId].userId;
    const filteredSong = songs.filter(song => song.id === +songId);

    if (currentUserId === artistId){
        return (
            <div>
                {filteredSong.map((song) => {
                    return (
                        <div key={song.id}>
                            Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId},
                            <div>Description: {song.description}</div>
                            <Link to={`/songs/${song.id}/edit`}>Edit</Link>
                            <DeleteSong />
                            <CreateCommentForm />
                            <div>Comments: <CommentsBySongId /></div>
                        </div>
                    )
                })}
            </div>
        );
    } else {
        return (
            <div>
                {filteredSong.map((song) => {
                    return (
                        <div className="songById" key={song.id}>
                            Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId}
                            <div>Description: {song.description}</div>
                            <CreateCommentForm />
                            <div>Comments: <CommentsBySongId /></div>
                        </div>
                    )
                })}
            </div>
        );
    }

}

export default SongById;
