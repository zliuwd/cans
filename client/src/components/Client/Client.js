import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from "@cwds/components/lib/Cards";
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { PageInfo } from '../Layout';
import { ClientAssessmentHistory, PersonService } from './index';


class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childData: {},
    };
  }

  static propTypes = {
    // react router supplies match
    match: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.fetchChildData(this.props.match.params.id);
  }

  fetchChildData(id) {
    return PersonService.fetch(id)
      .then(data => this.setState({ childData: data }))
      .catch(() => this.setState({ childData: {} }));
  }

  renderClientData(data, label) {
    if (data) {
      return (
        <Grid item xs={6}>
          <Typography variant={'headline'} color={'textSecondary'}>
            {label}
          </Typography>
          {data}
        </Grid>
      );
    }
  }

  renderInfoCard() {
    const childData = this.state.childData;
    return (
      <Card className={'card'}>
      <Card.Header
        className={'card-header-cans'}
        title="Child/Youth Information"
      />
      <div className={'content'}>
        <Card.Body>
          {childData && childData.id ? (
            <Grid container spacing={24}>
              {this.renderClientData(childData.first_name, 'First Name')}
              {this.renderClientData(childData.last_name, 'Last Name')}
              {this.renderClientData(childData.dob, 'Birth Date')}
              {this.renderClientData(childData.case_id, 'Case Number')}
              {this.renderClientData(childData.county.name, 'County')}
            </Grid>
          ) : (
            <span id={'no-data'}>No Child Data Found</span>
          )}
        </Card.Body>
      </div>
    </Card>
    )
  }

  render() {
    const childData = this.state.childData;
    return (
      <Fragment>
        <PageInfo title={'Child/Youth Profile'} />
          { this.renderInfoCard() }
          <ClientAssessmentHistory clientId={childData.id} />
      </Fragment>
    );
  }
}

export default Client;
