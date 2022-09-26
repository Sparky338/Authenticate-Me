import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import '../../Navigation/Navigation.css'

const UploadSong = () => {
    const user = useSelector(state => state.session.user)

    if (!user){
        return null
    } else return (
        <NavLink className="link upload-link navbar-link" to={`/songs/upload`} >Upload</NavLink>
    )

}

export default UploadSong;
