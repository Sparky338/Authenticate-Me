import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const UploadSong = () => {
    const user = useSelector(state => state.session.user)

    if (!user){
        return null
    } else return (
        <NavLink className="link upload-link" to={`/songs/upload`}>Upload</NavLink>
    )

}

export default UploadSong;
