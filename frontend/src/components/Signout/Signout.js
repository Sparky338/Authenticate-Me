import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Logout = () => {
    const history = useHistory();
    const userSession = useSelector(state => state.session.user)

    if (userSession) {
        history.push('/songs')
    }

    return (
        <div className="signout">
            <h1 className="signout-text">You've signed out.</h1>
        </div>
    )
}

export default Logout;
