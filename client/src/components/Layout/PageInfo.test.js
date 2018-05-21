import React from 'react';
import ReactDOM from 'react-dom';
import PageInfo from './PageInfo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PageInfo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
