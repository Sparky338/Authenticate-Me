import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";

import AllSongs from './components/Songs/GetSongs/AllSongs'
import SongsCurrentUser from "./components/Songs/GetSongs/SongsCurrentUser";
import ArtistSongs from "./components/Songs/GetSongs/ArtistSongs";
import SongById from "./components/Songs/GetSongs/SongById";
import CreateSongForm from "./components/Songs/CreateSong/CreateSongForm";
import EditSongForm from "./components/Songs/EditSong/EditSongForm";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/users/:userId/songs'>
            <ArtistSongs />
          </Route>
          <Route exact path='/songs'>
            <AllSongs />
          </Route>
          <Route exact path='/songs/upload'>
            <CreateSongForm />
          </Route>
          <Route exact path='/songs/current'>
            <SongsCurrentUser />
          </Route>
          <Route path='/songs/new'>
            <CreateSongForm />
          </Route>
          <Route path='/songs/:songId/edit'>
            <EditSongForm />
          </Route>
          <Route path='/songs/:songId'>
            <SongById />
          </Route>
          {/* <Route>Page Not Found</Route> */}
        </Switch>
      )}
    </>
  );
}


export default App;
