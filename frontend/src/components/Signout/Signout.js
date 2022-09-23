import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './Signout.css';

const Logout = () => {
    const history = useHistory();
    const userSession = useSelector(state => state.session.user)

    if (userSession) {
        history.push('/songs')
    }

    return (
        <div className="signout">
            <div className="signout-text">You've signed out.</div>
        </div>
    )
}

export default Logout;
