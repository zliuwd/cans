import React from 'react';
import { mount, shallow } from 'enzyme';
import ClientsContainer from './ClientsContainer';
import PersonService from './person.service';
import { personsJson } from './person.helper.test';
import { Link } from 'react-router-dom';

describe('<ClientsContainer />', () => {
  const personServiceFetchSpy = jest.spyOn(PersonService, 'fetchAllClients');
  beforeEach(() => {
    personServiceFetchSpy.mockClear();
  });

  it('renders message when fetches empty clients list', async () => {
    personServiceFetchSpy.mockReturnValue(Promise.resolve([]));
    const wrapper = await shallow(<ClientsContainer />);
    wrapper.update();
    expect(wrapper.find('#no-data').text()).toBe('No clients found');
  });

  it('renders grouped clients names when fetches 3 clients', async () => {
    personServiceFetchSpy.mockReturnValue(Promise.resolve(personsJson));
    const wrapper = await shallow(<ClientsContainer />);
    wrapper.update();
    expect(wrapper.find(Link).length).toBe(3);
  });

  it('renders empty container when failed to fetch', async () => {
    personServiceFetchSpy.mockReturnValue(Promise.reject(Error('error')));
    const wrapper = await mount(<ClientsContainer />);
    const renderedText = wrapper.text();
    wrapper.update();
    expect(renderedText).toBe('');
  });
});
