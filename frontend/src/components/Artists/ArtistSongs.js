// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const ArtistSongs = () => {
    // const dispatch = useDispatch();
    const songsObj = useSelector((state) => (state.songs));
    const songs = Object.values(songsObj)
    const {userId} = useParams();

    const artistSongs = songs.userId;
    // useEffect(() => {
    //     dispatch(getArtistSongs(userId));
    // }, [dispatch])

    if (!songs) {
        return null
    }

    return (
        <div>
            {artistSongs.map((song) => {
                return (
                    <li key={song.id}>
                        Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId}
                    </li>
                )
            })}
        </div>
    );

}

export default ArtistSongs;
