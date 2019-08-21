import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {RoomProvider} from './Context'
// Auth
import { Auth0Provider } from "./react-auth0-wrapper";
import config from "./auth_config.json";


// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
    window.history.replaceState(
      {},
      document.title,
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  };

ReactDOM.render(
    <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={`${window.location.origin}/rooms`}
    onRedirectCallback={onRedirectCallback}
>
<RoomProvider>  
<Router>
<App />

</Router>
</RoomProvider>
</Auth0Provider>,  
 document.getElementById('root')
 );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
