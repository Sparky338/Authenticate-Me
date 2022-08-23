import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";

import AllSongs from './components/Songs/AllSongs'
import SongsCurrentUser from "./components/Songs/SongsCurrentUser.js";
import ArtistSongs from "./components/Songs/ArtistSongs";

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
          <Route path='/songs/current'>
            <SongsCurrentUser />
          </Route>
          <Route path='/songs'>
            <AllSongs />
          </Route>
        </Switch>
      )}
    </>
  );
}


export default App;
