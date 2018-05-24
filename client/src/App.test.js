import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { Page } from './components/Layout';
import { GlobalHeader, PageHeader } from 'react-wood-duck';

describe('<App />', () => {
  const getWrapper = () => shallow(<App />);
  const getLength = component => getWrapper().find(component).length;

  it('renders with <GlobalHeader /> component', () => {
    expect(getLength(GlobalHeader)).toBe(1);
  });

  it('renders with <PageHeader /> component', () => {
    expect(getLength(PageHeader)).toBe(1);
  });

  it('renders with <Page /> component', () => {
    expect(getLength(Page)).toBe(1);
  });
});
