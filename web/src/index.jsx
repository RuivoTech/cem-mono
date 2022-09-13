import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import App from './App';

import "./styles/index.css";
import { AuthProvider } from './context/auth';

library.add(fas)

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>, document.getElementById('root'));