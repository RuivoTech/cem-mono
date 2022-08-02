import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas);

ReactDOM.render(<App />, document.getElementById('root'));