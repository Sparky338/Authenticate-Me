import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
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
                        <ul key={song.id}>
                            Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId},
                            <div>Description: {song.description}</div>
                            <Link to={`/songs/${song.id}/edit`}>Edit</Link>
                            <DeleteSong />
                            <div>Comments: <CommentsBySongId /></div>
                        </ul>
                    )
                })}
            </div>
        );
    } else {
        return (
            <div>
                {filteredSong.map((song) => {
                    return (
                        <li key={song.id}>
                            Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId}
                            <div>Description: {song.description}</div>
                            <div>Comments: <CommentsBySongId /></div>
                        </li>
                    )
                })}
            </div>
        );
    }

}

export default SongById;
