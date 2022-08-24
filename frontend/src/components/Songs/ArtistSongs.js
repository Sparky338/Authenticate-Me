import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getArtistSongs } from "../../store/songs";

const ArtistSongs = () => {
    const dispatch = useDispatch();
    const songs = useSelector((state) => Object.values(state.songs));
    const {userId} = useParams();

    useEffect(() => {
        dispatch(getArtistSongs(userId));
    }, [dispatch])

    if (!songs) {
        return null
    }

    return (
        <div>
            {songs.map((song) => {
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
