import React from 'react';
import { shallow } from 'enzyme';
import SideNav from './SideNav';

it('renders without crashing', () => {
  expect(() => shallow(<SideNav />)).not.toThrow();
});
