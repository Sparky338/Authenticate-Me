import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import DeleteSong from "../DeleteSongs/DeleteSong";

const SongById = () => {
    const {songId} = useParams();
    const songObj = useSelector(state => state.songs);
    // const songs = Object.values(songObj)
    const songByIdObj = songObj[songId].id //maybe songs[songId]
    const songById = Object.values(songByIdObj);
    const session = useSelector(state => state.session);

    const currentUserId = session.user.id;
    const artistId = songObj[songId].userId;
    console.log('song by Id', songById);

    // if (!songById[0]) {
    //     return null
    // }

    // if (currentUserId === artistId){
    //     return (
    //         <div>
    //             {songById.map((song) => {
    //                 return (
    //                     <li key={song.id}>
    //                         Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId}
    //                         <Link to={`/songs/${song.id}/edit`}>Edit</Link>
    //                         <DeleteSong />
    //                     </li>
    //                 )
    //             })}
    //         </div>
    //     );
    // } else {
        return (
            <div>
                {songById.map((song) => {
                    return (
                        <li key={song.id}>
                            Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId}
                        </li>
                    )
                })}
            </div>
        );
    // }

}

export default SongById;
