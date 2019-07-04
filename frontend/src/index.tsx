import React from 'react';
import ReactDOM from 'react-dom';

import WebFont from 'webfontloader';

import App from './containers/App';

import './styles/index.scss';

WebFont.load({
  google: {
    families: ['Montserrat:300,400,500,600,700', 'sans-serif']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
