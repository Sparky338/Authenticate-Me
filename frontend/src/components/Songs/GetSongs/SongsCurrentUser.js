import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import { getSongsCurrentUser } from "../../../store/songs";
// import DeleteSong from "./DeleteSongs/DeleteSong";


const SongsCurrentUser = () => {
    const dispatch = useDispatch();
    const songsObj = useSelector((state) => (state.songs));
    const songs = Object.values(songsObj);
    // const currentUser = useSelector(state => state.session.user.id);
    const session = useSelector(state => state.session)

    const currentUser = session.user.id
    const currentUserSongs = songs.filter(song => song.userId === currentUser)

    // useEffect(() => {
    //     dispatch(getSongsCurrentUser());
    // }, [dispatch])

    // if (!songs[0]) return null

    // const artist = songs[0].userId;

    if (currentUser/* === artist*/){
        return (
            <div>
                {currentUserSongs.map((song) => {
                    return (
                        <li key={song.id}>
                            Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId}
                            {/* <Link to={`/songs/${song.id}/edit`}>Edit</Link> */}
                            {/* <DeleteSong /> */}
                        </li>
                    )
                })}
            </div>
        );
    } else return null
}

export default SongsCurrentUser
