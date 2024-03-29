import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import "bootstrap/dist/css/bootstrap.css";

import App from './App';

import "./styles/index.css";
import { AuthProvider } from './context/auth';

library.add(fas)

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>, document.getElementById('root'));