import React from 'react';
import { shallow } from 'enzyme';
import Domains from './Domains';

it('renders without crashing', () => {
  expect(() => shallow(<Domains />)).not.toThrow();
});
