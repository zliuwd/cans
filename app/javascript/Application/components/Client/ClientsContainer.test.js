import React from 'react';
import { mount, shallow } from 'enzyme';
import ClientsContainer from './ClientsContainer';
import ClientService from './Client.service';
import { personsJson } from './Client.helper.test';
import { Link } from 'react-router-dom';

describe('<ClientsContainer />', () => {
  const ClientServiceFetchSpy = jest.spyOn(ClientService, 'fetchAllClients');
  beforeEach(() => {
    ClientServiceFetchSpy.mockClear();
  });

  it('renders message when fetches empty clients list', async () => {
    ClientServiceFetchSpy.mockReturnValue(Promise.resolve([]));
    const wrapper = await shallow(<ClientsContainer />);
    wrapper.update();
    expect(wrapper.find('#no-data').text()).toBe('No clients found');
  });

  it('renders grouped clients names when fetches 3 clients', async () => {
    ClientServiceFetchSpy.mockReturnValue(Promise.resolve(personsJson));
    const wrapper = await shallow(<ClientsContainer />);
    wrapper.update();
    expect(wrapper.find(Link).length).toBe(3);
  });

  it('renders empty container when failed to fetch', async () => {
    ClientServiceFetchSpy.mockReturnValue(Promise.reject(Error('error')));
    const wrapper = await mount(<ClientsContainer />);
    const renderedText = wrapper.text();
    wrapper.update();
    expect(renderedText).toBe('');
  });
});
