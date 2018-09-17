import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ClientService from './Client.service';
import { formatClientName } from './Client.helper';
import { LoadingState } from '../../util/loadingHelper';
import Button from '@material-ui/core/Button/Button';
import Card from '@material-ui/core/Card/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import DataGrid from '@cwds/components/lib/DataGrid';

import './style.sass';

const calculatePages = (recordsCount, pageSize) => {
  let pages = Math.floor(recordsCount / pageSize);
  pages += recordsCount % pageSize > 0 ? 1 : 0;
  return pages;
};

class ClientsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        firstName: '',
        middleName: '',
        lastName: '',
        dob: null,
      },
      pagination: {
        page: 0,
        pages: 0,
        pageSize: 10,
      },
      clients: [],
      clientsStatus: LoadingState.ready,
    };
    this.handleOnPageSizeChange = this.handleOnPageSizeChange.bind(this);
    this.handleOnPageChange = this.handleOnPageChange.bind(this);
  }

  async componentDidMount() {
    await this.fetchClients();
  }

  fetchClients = () => {
    this.setState({ clientsStatus: LoadingState.waiting });
    return ClientService.search({ ...this.state.filter, pagination: this.state.pagination })
      .then(this.onFetchClientsSuccess)
      .catch(() => this.setState({ clientsStatus: LoadingState.error }));
  };

  onFetchClientsSuccess = searchResult => {
    const pagination = this.state.pagination;
    const pages = calculatePages(searchResult.total_records, pagination.pageSize);
    this.setState({
      pagination: {
        ...pagination,
        pages,
      },
      clients: searchResult.people,
      clientsStatus: LoadingState.ready,
    });
  };

  async handleOnPageChange(page) {
    const pagination = this.state.pagination;
    await this.setState({
      pagination: {
        ...pagination,
        page,
      },
    });
    await this.fetchClients();
  }

  async handleOnPageSizeChange(pageSize) {
    const pagination = this.state.pagination;
    await this.setState({
      pagination: {
        ...pagination,
        page: 0,
        pageSize,
      },
    });
    await this.fetchClients();
  }

  renderAddChildButton() {
    return (
      <Link to={'/clients/new'}>
        <Button size="small" color="inherit" className={'card-header-cans-button'}>
          Add Child
        </Button>
      </Link>
    );
  }

  renderClientName = client => (
    <Link key={client.id} className="client-name" to={`/clients/${client.id}`}>
      {formatClientName(client)}
    </Link>
  );

  render = () => {
    const { clients, pagination, clientsStatus } = this.state;
    const { page, pages, pageSize } = pagination;
    const columns = [
      {
        id: 'fullName',
        Header: 'Full Name',
        accessor: client => this.renderClientName(client),
      },
      {
        Header: 'Date of Birth',
        accessor: 'dob',
      },
    ];
    const loading = clientsStatus === LoadingState.waiting;
    return (
      <Fragment>
        <Grid item className={'client-grid'} xs={12}>
          <Card className={'card'}>
            <CardHeader
              className={'card-header-cans'}
              title="County Client List"
              action={this.renderAddChildButton()}
            />
            <div className={'content'}>
              <CardContent>
                <DataGrid
                  manual
                  data={clients}
                  page={page}
                  pages={pages}
                  pageSize={pageSize}
                  columns={columns}
                  minRows={0}
                  style={{ paddingBottom: '15rem' }}
                  loading={loading}
                  noDataText={'No clients found'}
                  onPageChange={this.handleOnPageChange}
                  onPageSizeChange={this.handleOnPageSizeChange}
                />
              </CardContent>
            </div>
          </Card>
        </Grid>
      </Fragment>
    );
  };
}

export default ClientsContainer;
