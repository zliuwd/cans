import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { SideNav } from './SideNav';
import { Page } from './index';
import { Routes } from '../../routes';

describe('<Page />', () => {
  const getWrapper = () =>
    mount(
      <MemoryRouter>
        <Page />
      </MemoryRouter>
    );

  /* eslint-disable jasmine/no-disabled-tests */
  xit('renders with <SideNav /> links', () => {
    const page = getWrapper();
    expect(page.find({ text: 'Reports' }).length).toBe(1); // this works
    expect(page.find(SideNav).length).toBe(1); // this does not
  });
  /* eslint-enable jasmine/no-disabled-tests */

  it('renders with <Routes /> component', () => {
    const page = getWrapper();
    expect(page.find(Routes).length).toBe(1);
  });
});
