import React, { ErrorBoun } from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { SideNav, PageInfo } from './';
import { Page } from './index';
import { Routes } from '../../routes';

describe('<Page />', () => {
  const getWrapper = () => mount(<MemoryRouter><Page /></MemoryRouter>);
  const getLength = component => getWrapper().find(component).length;

  it('renders with <SideNav /> component', () => {
    expect(getLength(SideNav)).toBe(1);
  });

  it('renders with <Routes /> component', () => {
    expect(getLength(Routes)).toBe(1);
  });
});
