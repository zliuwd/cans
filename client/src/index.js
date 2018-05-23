import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-wood-duck/dist/styles/application.css';

export { default as api } from './App.api';

ReactDOM.render(<App />, document.getElementById('root'));
