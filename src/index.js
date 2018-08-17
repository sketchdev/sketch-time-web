import React from 'react';
import ReactDOM from 'react-dom';
import 'basscss/css/basscss-cp.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import AuthHelper from './services/AuthHelper';

if (!AuthHelper.isSessionValidForMinutes(15)) {
  // Force new sessions if there is not at least 15 minutes left for the token
  // makes it less likely that they will have to log in in the middle of their session
  console.log('no token, or token is too old for a new session');
  AuthHelper.clearSession();
} else {
  console.log('session is still good');
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
