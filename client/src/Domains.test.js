import React from 'react';
import ReactDOM from 'react-dom';
import Domains from './Domains';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Domains />, div);
  ReactDOM.unmountComponentAtNode(div);
});