import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import UploadSong from '../Songs/CreateSong/CreateSongNav';

import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <UploadSong />
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <header className='banner'>
      <div className='top-banner-links'>
        <div className='left-banner'>

          <NavLink exact to="/" activeClassName='selected'>Home</NavLink>
        </div>
        <div className='right-banner'>{isLoaded && sessionLinks}</div>
      </div>
    </header>
  );
}

export default Navigation;
