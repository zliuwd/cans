import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ClientService from './Client.service';
import { groupClientsByLastName, formatClientName } from './Client.helper';
import Button from '@material-ui/core/Button/Button';
import Card from '@material-ui/core/Card/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

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

  renderAddChildButton() {
    return (
      <Link to={'/clients/new'}>
        <Button size="small" color="inherit" className={'card-header-cans-button'}>
          Add Child
        </Button>
      </Link>
    );
  }

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
        <Link to={`/clients/${client.id}`}>{formatClientName(client)}</Link>
      </div>
    );
  };

  renderNoData = () => {
    if (this.state.clients_status === 'ready' && (this.state.clients || []).length === 0) {
      return <div id="no-data">No clients found</div>;
    } else {
      return null;
    }
  };

  render = () => {
    const clients = this.state.clients || [];
    return (
      <Fragment>
        <Grid item className={'client-grid'} xs={12}>
          <Card className={'card'}>
            <CardHeader
              className={'card-header-cans'}
              title="County Client List"
              action={this.renderAddChildButton()}
            />
            <CardContent>
              <div className="clients-container">
                {clients.map(record => {
                  return this.renderClientsRecord(record);
                })}
                {this.renderNoData()}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Fragment>
    );
  };
}
/* eslint-enable camelcase */

export default ClientsContainer;
