import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSongs } from "../../store/songs";

const AllSongs = () => {
    const dispatch = useDispatch();
    console.log('useSelector is selecting')
    const songs = useSelector((state) => Object.values(state.songs));
    console.log('this is the selection from useSelector', songs)

    console.log('UseEffect is running in AllSongs')
    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch])

    if (!songs) {
        return null
    }

    return (
        <div>
            <ul>
                {songs.map(song => {
                    return (
                        <>
                            <li>Artist Id:{song.userId}, Song Title:{song.title}, Album Id: {song.albumId}</li>
                        </>
                    )
                })}
            </ul>
        </div>
    );

}

export default AllSongs;
