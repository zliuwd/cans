import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from "@cwds/components/lib/Cards";
import Button from '@cwds/components/lib/Button';
import {
  MenuItem,
  TextField,
  // Card,
  // CardHeader,
  // CardContent,
  // CardActions,
  // Button,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { CountiesService } from './Counties.service';
import { ChildFormService } from './ChildForm.service';
import { validate, isFormValid } from './ChildForm.helper';
import { PageInfo } from '../Layout';
import Notification from './Notification';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    fontSize: 20,
  },
  menu: {
    width: 300,
    fontSize: 20,
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
    fontSize: 24,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300,
    color: '#000',
    fontSize: 20,
  },
  button: {
    marginTop: theme.spacing.unit,
    backgroundColor: '#09798e',
    color: '#ffffff',
    fontSize: 20,
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
      childInfoValidation: {
        first_name: false,
        last_name: false,
        dob: false,
        case_id: false,
        county: false,
      },
      isSaveButtonDisabled: true,
      open: false,
      navigate: false,
    };
  }

  handleChange = name => event => {
    const newValue = event.target.value;
    this.setState({
      childInfo: {
        ...this.state.childInfo,
        [name]: newValue,
      },
    });
    this.validateInput(name, newValue);
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
    ChildFormService.createChild(this.state.childInfo)
      .then(newChild => {
        this.setState({
          childInfo: newChild,
          child_status: 'ready',
        });
      })
      .then(() => setTimeout(() => this.setState({ navigate: true }), 5000))
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
    // go to /clients/new
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

  validateInput = (fieldName, inputValue) => {
    const fieldValidation = validate(fieldName, inputValue);
    const allValidations = this.state.childInfoValidation;
    allValidations[fieldName] = fieldValidation;
    const formValidation = isFormValid(allValidations);
    this.setState({
      childInfoValidation: {
        ...allValidations,
      },
      isSaveButtonDisabled: !formValidation,
    });
  };

  render() {
    if (this.state.navigate) {
      return <Redirect to={`/clients/${this.state.childInfo.id}`} />;
    }

    const { classes } = this.props;
    return (
      <Fragment>
        <PageInfo title={'Add Child/Youth'} />
        <Card className={classes.card}>
          <Card.Header>
            <Card.Title>Child/Youth Information</Card.Title>
          </Card.Header>
          <Card.Body>
            <form className={classes.container} noValidate autoComplete="off">
              <div style={{ width: '800px' }}>
                <TextField
                  required
                  id="first_name"
                  label="First Name"
                  error={!this.state.childInfoValidation['first_name']}
                  className={classes.textField}
                  value={this.state.first_name}
                  onChange={this.handleChange('first_name')}
                  inputProps={{ maxLength: 50 }}
                  margin="normal"
                />

                <TextField
                  required
                  id="last_name"
                  label="Last Name"
                  error={!this.state.childInfoValidation['last_name']}
                  className={classes.textField}
                  value={this.state.last_name}
                  onChange={this.handleChange('last_name')}
                  inputProps={{ maxLength: 50 }}
                  margin="normal"
                />
              </div>
              <div style={{ width: '800px' }}>
                <TextField
                  required
                  id="dob"
                  label="Birth Date"
                  error={!this.state.childInfoValidation['dob']}
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
                  error={!this.state.childInfoValidation['case_id']}
                  className={classes.textField}
                  value={this.state.case_id}
                  onChange={this.handleChange('case_id')}
                  inputProps={{ maxLength: 50 }}
                  margin="normal"
                />
              </div>
              <div style={{ width: '800px' }}>
                <TextField
                  required
                  select
                  id="county"
                  label="County"
                  error={!this.state.childInfoValidation['county']}
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
                      <span id={'county-name'}>{option.name}</span>
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </form>
          </Card.Body>
          <Card.Footer>
            <Button onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button
              color="primary"
              disabled={this.state.isSaveButtonDisabled}
              onClick={this.handleSubmit}
            >
              Save
            </Button>
          </Card.Footer>
        </Card>
        {this.state.child_status === 'ready' && <Notification />}
      </Fragment>
    );
  }
}

ChildForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChildForm);

