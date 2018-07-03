import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-wood-duck/dist/styles/application.css';
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('root');
  const data = JSON.parse(node.getAttribute('data'));
  render(<App {...data} />, node);
});
