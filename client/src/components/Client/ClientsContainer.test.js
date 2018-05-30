import React from 'react';
import ClientsContainer from './ClientsContainer';
import { personsJson } from './person.helper.test';

jest.mock('./person.service');
import PersonService from './person.service';

describe('<ClientsContainer />', () => {
  it('renders message when fetches empty clients list', async () => {
    PersonService.fetchAllClients.mockReturnValue(Promise.resolve([]));
    const wrapper = await mount(<ClientsContainer />);
    wrapper.update();
    expect(wrapper.text()).toBe('No clients found');
  });

  it('renders grouped clients names when fetches 3 clients', async () => {
    PersonService.fetchAllClients.mockReturnValue(Promise.resolve(personsJson));
    const wrapper = await mount(<ClientsContainer />);
    const renderedText = wrapper.text();
    wrapper.update();
    expect(renderedText).toBe('PParker, PeterParker, CharleyWWayne, Bruce');
  });

  it('renders empty container when failed to fetch', async () => {
    PersonService.fetchAllClients.mockReturnValue(
      Promise.reject(Error('error'))
    );
    const wrapper = await mount(<ClientsContainer />);
    const renderedText = wrapper.text();
    wrapper.update();
    expect(renderedText).toBe('');
  });
});
