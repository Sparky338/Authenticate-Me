import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UploadSong = () => {
    const user = useSelector(state => state.session.user)
    
    if (!user){
        return null
    } else return (
        <Link to={`/songs/upload`}>Upload</Link>
    )

}

export default UploadSong;
