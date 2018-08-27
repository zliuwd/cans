import React from 'react';
import { shallow } from 'enzyme';
import { Page } from './';
import { Routes } from '../../routes';

describe('<Page />', () => {
  describe('layout', () => {
    const getWrapper = () => shallow(<Page />);

    it('renders with <Routes /> component', () => {
      const wrapper = getWrapper();
      expect(wrapper.find(Routes).length).toBe(1);
    });
  });
});
