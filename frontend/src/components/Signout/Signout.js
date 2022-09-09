import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Logout = () => {
    const history = useHistory();

    if (useSelector(state => state.session.user)) {
        history.push('/songs')
    }

    return (
        <div className="signout">
            <h1>You've signed out.</h1>
        </div>
    )
}

export default Logout;
