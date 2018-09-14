import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ClientService from './Client.service';
import { formatClientName } from './Client.helper';
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
      pagination: {
        page: 0,
        pages: 0,
        pageSize: 10,
        records: [],
      },
      clientsAll: [],
      clientsStatus: 'ready',
    };
  }

  async componentDidMount() {
    await this.fetchAllClients();
  }

  fetchAllClients = () => {
    this.setState({ clientsStatus: 'waiting' });
    return ClientService.fetchAllClients()
      .then(this.onFetchAllClientsSuccess)
      .catch(() => this.setState({ clientsStatus: 'error' }));
  };

  onFetchAllClientsSuccess = clientsAll => {
    const pagination = this.state.pagination;
    const pages = calculatePages(clientsAll.length, pagination.pageSize);
    this.setState({
      pagination: {
        ...pagination,
        pages,
      },
      clientsAll: clientsAll,
      clientsStatus: 'ready',
    });
    this.simulateFetchData(pagination);
  };

  handleOnPageChange = page => {
    const { pagination } = this.state;
    this.simulateFetchData({
      ...pagination,
      page,
    });
  };

  handleOnPageSizeChange = pageSize => {
    const { pagination, clientsAll } = this.state;
    const pages = calculatePages(clientsAll.length, pageSize);
    this.simulateFetchData({
      ...pagination,
      page: 0,
      pages,
      pageSize,
    });
  };

  simulateFetchData = pagination => {
    const { clientsAll } = this.state;
    const { page, pageSize } = pagination;
    this.setState({ clientsStatus: 'waiting' });
    const records = clientsAll.slice(page * pageSize, (page + 1) * pageSize);
    const newPagination = {
      ...pagination,
      records,
    };
    console.log(JSON.stringify(newPagination));
    this.setState({
      pagination: newPagination,
      clientsStatus: 'ready',
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

  renderClientName = client => {
    return (
      <div className="client-name" key={client.id}>
        <Link to={`/clients/${client.id}`}>{formatClientName(client)}</Link>
      </div>
    );
  };

  render = () => {
    const { pagination, clientsStatus } = this.state;
    const { records, page, pages, pageSize } = pagination;
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
    const loading = clientsStatus === 'waiting';
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
                  data={records}
                  page={page}
                  pages={pages || 4}
                  pageSize={pageSize}
                  columns={columns}
                  minRows={0}
                  style={{ paddingBottom: '15rem' }}
                  loading={loading}
                  noDataText={'No clients found'}
                  // onFetchData={this.fetchData}
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
