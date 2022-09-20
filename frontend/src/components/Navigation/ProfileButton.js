import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, Link } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
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
    //logout and redirect to the logout page
    const loggedOut = await dispatch(sessionActions.logout());
    if (loggedOut) {
      history.push('/logout');
    }
  };

  return (
    <>
      <button className="button profile-menu-button" onClick={openMenu}>
        <i className="fa-solid fa-user-astronaut"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <div className="username">{user.username}</div>
          <div className="email">{user.email}</div>
          <div className="user-songs-link"><Link to={`/songs/current`}>{user.username}'s songs</Link></div>
          <div>
            <button className="button logout-button" onClick={logout}>Log Out</button>
          </div>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
