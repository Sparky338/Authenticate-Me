import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import DeleteSong from "../DeleteSongs/DeleteSong";


const SongsCurrentUser = () => {
    const songsObj = useSelector((state) => (state.songs));
    const songs = Object.values(songsObj);
    const session = useSelector(state => state.session)

    const currentUser = session.user.id
    const currentUserSongs = songs.filter(song => song.userId === currentUser)


    // if (!songs[0]) return null

    // const artist = songs[0].userId;

    if (currentUser/* === artist (needed if adding edit and delete buttons)*/){
        return (
            <div>
                {currentUserSongs.map((song) => {
                    return (
                        <li key={song.id}>
                            <Link to={`/songs/${song.id}`}>Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId}</Link>
                            {/* Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId} */}
                            {/* <Link to={`/songs/${song.id}/edit`}>Edit</Link> */}
                            {/* <DeleteSong /> Does not work from outside of SongById*/}
                        </li>
                    )
                })}
            </div>
        );
    } else return null
}

export default SongsCurrentUser
