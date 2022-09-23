import React from 'react';
import { Link } from 'react-router-dom';
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

  const linkStyling = {
    display: 'block',
    textDecoration: 'none',
    color: '#ccc',
    padding: '12px 0',
    height: '46px',
    boxSizing: 'border-box',
    textAlign: 'center',
    width: '104px',
    borderRight: '1px solid #111'
  }

  return (
    <header className='banner'>
      <div className='top-banner-links'>
        <div className='left-banner'>
          <i class="fa-brands fa-soundcloud fa-3x banner-cloud"></i>
          <div className='link home'>
            <Link exact to="/" className='link' style={linkStyling}>Home</Link>
          </div>
          <div className='link library'>
            <Link exact to="/songs" className='link' style={linkStyling}>Library</Link>
          </div>
        </div>
        <div className='middle-banner'></div>
        <div className='right-banner'>{isLoaded && sessionLinks}</div>
      </div>
    </header>
  );
}

export default Navigation;
