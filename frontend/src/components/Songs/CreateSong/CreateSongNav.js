import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const UploadSong = () => {
    const user = useSelector(state => state.session.user)
    const linkStyling = {
        textDecoration: 'none',
        color: '#ccc',
        paddingRight: '10px',
        paddingLeft: '10px'
      }

    if (!user){
        return null
    } else return (
        <NavLink className="link upload-link" to={`/songs/upload`} style={linkStyling}>Upload</NavLink>
    )

}

export default UploadSong;
