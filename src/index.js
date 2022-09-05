import React from 'react';
import * as ReactDOM from "react-dom/client"
import App from './App';
import DataLayer from "./Components/DataLayer";
import reducer from "./Components/Reducer"
import { initialState } from './Components/Reducer'; 
import Spotify from "./Components/Home/Spotify/Spotify"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
       {
        <>
          <App />
          <Spotify />
        </>
        }
   </DataLayer>
   </React.StrictMode>
);
