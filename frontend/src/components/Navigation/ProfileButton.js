import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const userSession = useSelector(state => state.session.user.id)
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = async (e) => {
    e.preventDefault();
    // const loggedOut = await
    dispatch(sessionActions.logout());
    // console.log("logged", loggedOut)
    // if (loggedOut && !userSession){
    history.push('/');
    //  } // need to wait for user to be logged out, await doesn't work for this.
  };

  return (
    <>
      <button onClick={openMenu}>
      <i className="fa-solid fa-user-astronaut"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
