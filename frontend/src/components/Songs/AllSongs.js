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
console.log('before the return', songs)
    return (
        <div>
            <ul>
                {songs.map(song => {
                    return song
                })}
            </ul>
        </div>
    );

}

export default AllSongs;
