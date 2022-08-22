import { useSelector } from "react-redux";
import { getAllSongs } from "../../store/songs";

const SongIndex = () => {
    const songs = useSelector(getAllSongs());


    return (
        <div>
            <ul>

            </ul>
        </div>
    );
}

export default SongIndex;
