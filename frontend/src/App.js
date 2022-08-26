import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import { getAllSongs } from "./store/songs";
import * as sessionActions from "./store/session";

import AllSongs from './components/Songs/GetSongs/AllSongs'
import SongsCurrentUser from "./components/Songs/GetSongs/SongsCurrentUser";
import SongById from "./components/Songs/GetSongs/SongById";
import CreateSongForm from "./components/Songs/CreateSong/CreateSongForm";
import EditSongForm from "./components/Songs/EditSong/EditSongForm";

// import ArtistSongs from "./components/Artists/ArtistSongs";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getAllSongs());
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route path='/users/:userId/songs'>
            <ArtistSongs />
          </Route> */}
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
