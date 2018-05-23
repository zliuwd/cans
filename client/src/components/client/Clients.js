import React, { Component } from 'react';
import { PersonService } from './person.service';
import { groupClientsByLastName } from './person.helper';
import './style.css'

class Clients extends Component {
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
    this.setState({ assessment_status: 'waiting' });
    return PersonService.fetchAllClients()
      .then(this.onFetchAllClientsSuccess)
      .catch(() => this.setState({ assessment_status: 'error' }));
  };

  onFetchAllClientsSuccess = clients => {
    const groupedClients = groupClientsByLastName(clients);
    this.setState({
      clients: groupedClients,
      clients_status: 'ready',
    });
  };

  render = () => {
    const clients = this.state.clients || [];
    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignContent: 'flex-start',
        height: '100%',
        paddingTop: 8,
        paddingBottom: 16
      }}>
        { clients.length !== 0 ?
          clients.map(record => {
          return (
            <div style={{flex: '0 0 33%'}}>
              <div className={'header'}>{record.letter}</div>
              {record.clients.map(client => {
                return (
                  <div className={'client-name'}>
                    <a href={`/clients/${client.id}`}>{`${client.last_name}, ${client.first_name}`}</a>
                  </div>
                )
              })}
            </div>
          )
        }) : <div>No clients found</div> }
      </div>
    );
  };
}

export default Clients;
