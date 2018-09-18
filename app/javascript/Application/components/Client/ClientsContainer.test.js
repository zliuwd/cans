import React from 'react';
import { mount, shallow } from 'enzyme';
import ClientsContainer from './ClientsContainer';
import ClientService from './Client.service';
import { personsJson } from './Client.helper.test';
import { MemoryRouter } from 'react-router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

describe('<ClientsContainer />', () => {
  let clientServiceFetchSpy;

  beforeEach(() => {
    clientServiceFetchSpy = jest.spyOn(ClientService, 'fetchAllClients');
  });

  it('renders a card with a header', async () => {
    clientServiceFetchSpy.mockReturnValue(Promise.resolve(personsJson));
    const koolmodee = await shallow(<ClientsContainer />);
    expect(koolmodee.find(Card).length).toBe(1);
    expect(koolmodee.find(CardHeader).props().title).toBe('County Client List');
  });

  describe('when client list is empty', () => {
    it('renders message no clients found', async () => {
      clientServiceFetchSpy.mockReturnValue(Promise.resolve([]));
      const wrapper = await shallow(<ClientsContainer />);
      wrapper.update();
      expect(wrapper.find('#no-data').text()).toBe('No clients found');
    });
  });

  describe('when client list has 3 clients ', () => {
    it('renders sensitive and non-sensitive clients names', async () => {
      clientServiceFetchSpy.mockReturnValue(Promise.resolve(personsJson));
      const wrapper = await shallow(<ClientsContainer />);
      wrapper.update();
      expect(wrapper.find('.client-name').length).toBe(2);
      expect(wrapper.find('.sensitive-client-name').length).toBe(1);
    });
  });

  describe('when client fetch fails', () => {
    it('renders an empty container', async () => {
      clientServiceFetchSpy.mockReturnValue(Promise.reject(Error('error')));
      const wrapper = await mount(
        <MemoryRouter>
          <ClientsContainer />
        </MemoryRouter>
      ).find(CardContent);
      expect(wrapper.text()).toBe('');
    });
  });
});
