import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';
import './style.css';
import { Link } from 'react-router-dom';

class ClientAssessmentHistory extends Component {
  constructor(context) {
    super(context);
  }

  static propTypes = {
    clientFirstName: PropTypes.string.isRequired,
    clientLastName: PropTypes.string.isRequired,
  };

  renderAddCansButton() {
    const { clientFirstName, clientLastName } = this.props;
    return (
      <Link
        to={{
          pathname: '/assessments',
          clientFirstName: clientFirstName,
          clientLastName: clientLastName,
        }}
      >
        <Button
          size="small"
          color="inherit"
          classes={{ label: 'add-cans-button' }}
        >
          Add Cans
        </Button>
      </Link>
    );
  }

  render() {
    return (
      <Grid item xs={12}>
        <Card className={'card'}>
          <CardHeader
            className={'card-header'}
            title="Assessment History"
            action={this.renderAddCansButton()}
          />
          <CardContent />
        </Card>
      </Grid>
    );
  }
}

export default ClientAssessmentHistory;
