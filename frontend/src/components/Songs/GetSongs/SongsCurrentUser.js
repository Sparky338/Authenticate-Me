import { useSelector } from "react-redux";
import SongCard from "../SongCard";
import './Songs.css'


const SongsCurrentUser = () => {
    const songsObj = useSelector((state) => (state.songs));
    const songs = Object.values(songsObj);
    const session = useSelector(state => state.session)

    const currentUser = session.user?.id
    const currentUserSongs = songs.filter(song => song.userId === currentUser)

    if (currentUser) {
        return (
            <div className="outer-div">
                <div className="songs current-user-songs">
                    <ul className="songs-ul">
                        {currentUserSongs.map((song) => {
                            return (
                                // <div className="song" key={song.id}>
                                //     <Link to={`/songs/${song.id}`}>
                                //         Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId}
                                //     </Link>
                                // </div>
                                <SongCard className='songs-current-user' key={song.id} {...song} />
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    } //else return null
}

export default SongsCurrentUser
