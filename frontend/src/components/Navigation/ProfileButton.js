import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, Link } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const userIcon = <i class="fa-solid fa-user"></i>;
  const songIcon = <i class="fa-solid fa-music"></i>
  const logoutIcon = <i class="fa-solid fa-door-open"></i>;

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

  const linkStyling = {
    textDecoration: 'none',
    color: '#333',
    padding: '5px',
  }

  return (
    <div className="profile">
      <button className="button profile-menu-button" onClick={openMenu}>
        <i className="fa-solid fa-user-astronaut"></i>
      </button>
      {showMenu && (
        <div className="dropdown navbar-Link">
          <div className="profile-dropdown">
            <div className="username">{userIcon} {user.username}</div>
            {/* <div className="email">{user.email}</div> */}
            <Link to={`/songs/current`} style={linkStyling}>{songIcon} {user.username}'s songs</Link>
            <div className="logout-link">
              <Link className="Link logout-button" style={linkStyling} onClick={logout}>{logoutIcon} Log Out</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
