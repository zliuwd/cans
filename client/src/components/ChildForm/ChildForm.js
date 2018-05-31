import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  TextField,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';

import { CountiesService } from './Counties.service';
import { ChildFormService } from './ChildForm.service';
import { PageInfo } from '../Layout';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    fontSize: 14,
  },
  menu: {
    width: 300,
    fontSize: 14,
  },
  card: {
    minWidth: 300,
  },
  cardHeader: {
    backgroundColor: '#114161',
    color: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300,
    color: '#000',
    fontSize: 14,
  },
  button: {
    marginTop: theme.spacing.unit,
    backgroundColor: '#09798e',
    color: '#ffffff',
    fontSize: 14,
  },
});

class ChildForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      child_status: 'idle',
      counties: [],
      childInfo: {
        person_role: 'CLIENT',
        first_name: '',
        last_name: '',
        dob: '',
        case_id: '',
        county: {
          id: 0,
          name: '',
        },
      },
      open: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      childInfo: {
        ...this.state.childInfo,
        [name]: event.target.value,
      },
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ child_status: 'updating' });
    console.log('ChildInfo in handleSubmit: ', this.state.childInfo);
    ChildFormService.createChild(this.state.childInfo)
      .then(newChild => {
        this.setState({
          childInfo: newChild,
          child_status: 'ready',
        });
      })
      .catch(() => this.setState({ child_status: 'error' }));
  };
  handleCancel = event => {
    this.setState({
      childInfo: {
        ...this.state.childInfo,
        person_role: 'CLIENT',
        first_name: '',
        last_name: '',
        dob: '',
        case_id: '',
        county: {
          id: 0,
          name: '',
        },
      },
    });
  };

  componentDidMount() {
    this.fetchCounties();
  }

  fetchCounties = () => {
    this.setState({ counties_status: 'waiting' });
    return CountiesService.fetchCounties()
      .then(this.onFetchCountiesSuccess)
      .catch(() => this.setState({ counties_status: 'error' }));
  };

  onFetchCountiesSuccess = counties => {
    this.setState({
      counties: counties,
      counties_status: 'ready',
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <PageInfo title={'Add Child/Youth'} />
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            title="Child/Youth Information"
            classes={{
              title: classes.title,
            }}
          />
          <CardContent>
            <form className={classes.container} noValidate autoComplete="off">
              <div style={{ width: '800px' }}>
                <TextField
                  id="first_name"
                  label="First Name"
                  className={classes.textField}
                  value={this.state.first_name}
                  onChange={this.handleChange('first_name')}
                  margin="normal"
                />

                <TextField
                  required
                  id="last_name"
                  label="Last Name"
                  className={classes.textField}
                  value={this.state.last_name}
                  onChange={this.handleChange('last_name')}
                  margin="normal"
                />
              </div>
              <div style={{ width: '800px' }}>
                <TextField
                  required
                  id="dob"
                  label="Birth Date"
                  type="date"
                  defaultValue=""
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange('dob')}
                />
                <TextField
                  required
                  id="case_id"
                  label="Case Number"
                  className={classes.textField}
                  value={this.state.case_id}
                  onChange={this.handleChange('case_id')}
                  margin="normal"
                />
              </div>
              <div style={{ width: '800px' }}>
                <TextField
                  required
                  select
                  id="county"
                  label="County"
                  className={classes.textField}
                  open={this.state.open}
                  onClose={this.handleClose}
                  value={this.state.childInfo.county}
                  onChange={this.handleChange('county')}
                  helperText="Please select your County"
                  margin="normal"
                >
                  <MenuItem value="">
                    <em />
                  </MenuItem>
                  {this.state.counties.map(option => (
                    <MenuItem
                      key={option.id}
                      value={option}
                      className={classes.menu}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </form>
          </CardContent>
          <CardActions>
            <Button onClick={this.handleCancel} href="/">
              Cancel
            </Button>

            <Button
              variant="raised"
              size="large"
              color="primary"
              className={classes.button}
              onClick={this.handleSubmit}
            >
              Save
            </Button>
          </CardActions>
        </Card>
      </Fragment>
    );
  }
}

ChildForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChildForm);
