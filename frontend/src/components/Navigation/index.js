import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import UploadSong from '../Songs/CreateSong/CreateSongNav';
import peridotSoundclodIconTransparent from '../../images/peridotSoundclodIconTransparent.png'

import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const soundClodIcon = peridotSoundclodIconTransparent

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
          <img src={soundClodIcon} alt='SoundClod Icon' />
          <div className='link home'>
            <Link exact to="/" className='navbar-link' style={linkStyling}>Home</Link>
          </div>
          <div className='link library'>
            <Link exact to="/songs" className='navbar-link' style={linkStyling}>Library</Link>
          </div>
        </div>
        <div className='middle-banner'></div>
        <div className='right-banner navbar-link'>{isLoaded && sessionLinks}</div>
      </div>
    </header>
  );
}

export default Navigation;
