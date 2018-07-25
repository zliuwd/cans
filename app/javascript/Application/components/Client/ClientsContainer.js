import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ClientService from './Client.service';
import { groupClientsByLastName } from './Client.helper';
import { PageInfo } from '../Layout';

import './style.sass';

/* eslint-disable camelcase */
class ClientsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      clients_status: 'idle',
    };
  }

  componentDidMount() {
    this.fetchAllClients();
  }

  fetchAllClients = () => {
    this.setState({ clients_status: 'waiting' });
    return ClientService.fetchAllClients()
      .then(this.onFetchAllClientsSuccess)
      .catch(() => this.setState({ clients_status: 'error' }));
  };

  onFetchAllClientsSuccess = clients => {
    const groupedClients = groupClientsByLastName(clients);
    this.setState({
      clients: groupedClients,
      clients_status: 'ready',
    });
  };

  renderClientsRecord = record => {
    return (
      <div className="client-name-container" key={record.letter}>
        <div className="header">{record.letter}</div>
        {record.clients.map(client => {
          return this.renderClientName(client);
        })}
      </div>
    );
  };

  renderClientName = client => {
    return (
      <div className="client-name" key={client.id}>
        <Link to={`/clients/${client.id}`}>{`${client.last_name}, ${client.first_name}`}</Link>
      </div>
    );
  };

  render = () => {
    const clients = this.state.clients || [];
    const { clients_status } = this.state;
    return (
      <Fragment>
        <PageInfo title={''} />
        <div className={'content'}>
          <div className="clients-container">
            {clients.map(record => {
              return this.renderClientsRecord(record);
            })}

            {clients_status === 'ready' && clients.length === 0 ? <div id="no-data">No clients found</div> : null}
          </div>
        </div>
      </Fragment>
    );
  };
}
/* eslint-enable camelcase */

export default ClientsContainer;
