import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";

import AllSongs from './components/Songs/AllSongs'
import SongsCurrentUser from "./components/Songs/SongsCurrentUser.js";
import ArtistSongs from "./components/Songs/ArtistSongs";
import CreateSongForm from "./components/Songs/CreateSongForm";
import EditSongForm from "./components/Songs/EditSongForm";
import SongById from "./components/Songs/SongById";

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
          <Route path='/songs/:songId/edit'>
            <EditSongForm />
          </Route>
          <Route path='/songs/:songId'>
            <SongById />
          </Route>
          <Route path='/songs/new'>
            <CreateSongForm />
          </Route>
          <Route path='/songs/current'>
            <SongsCurrentUser />
          </Route>
          <Route path='/songs'>
            <AllSongs />
          </Route>
          {/* <Route>Page Not Found</Route> */}
        </Switch>
      )}
    </>
  );
}


export default App;
