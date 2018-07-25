import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import { withStyles } from '@material-ui/core/styles';
import { MenuItem, TextField, Card, CardHeader, CardContent, CardActions, Button } from '@material-ui/core';
import { Redirect, Link } from 'react-router-dom';
import { CountiesService } from './Counties.service';
import { ClientService } from './Client.service';
import { validate, isFormValid } from './ClientFormValidator';
import { PageInfo } from '../Layout';

const styles = theme => ({
  inputText: {
    color: '#111',
    fontSize: '16px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: 10,
    width: 300,
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
  button: {
    marginTop: theme.spacing.unit,
    backgroundColor: '#09798e',
    color: '#ffffff',
    fontSize: 20,
  },
});

class ClientAddForm extends Component {
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
        external_id: '',
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
        external_id: false,
        county: false,
      },
      isSaveButtonDisabled: true,
      open: false,
      navigate: false,
      redirection: {
        shouldRedirect: false,
        successClientAddId: null,
      },
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
    ClientService.addClient(this.state.childInfo)
      .then(newChild => {
        this.setState({
          childInfo: newChild,
          child_status: 'ready',
          redirection: {
            shouldRedirect: true,
            successClientAddId: newChild.id,
          },
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
        external_id: '',
        county: {
          id: 0,
          name: '',
        },
      },
      redirection: {
        shouldRedirect: true,
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
    const { classes } = this.props;
    const { childInfo, childInfoValidation, counties, isSaveButtonDisabled, redirection } = this.state;
    const { shouldRedirect, successClientAddId } = redirection;

    if (shouldRedirect) {
      return <Redirect push to={{ pathname: `/clients/${childInfo.id}`, state: { successClientAddId } }} />;
    }
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
              <TextField
                required
                focused
                id="first_name"
                label="First Name"
                error={!childInfoValidation['first_name']}
                className={classes.textField}
                value={childInfo.first_name}
                onChange={this.handleChange('first_name')}
                inputProps={{
                  maxLength: 50,
                  className: classes.inputText,
                }}
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: '#bbb',
                    fontSize: '14px',
                  },
                }}
              />

              <TextField
                required
                focused
                id="last_name"
                label="Last Name"
                error={!childInfoValidation['last_name']}
                className={classes.textField}
                value={childInfo.last_name}
                onChange={this.handleChange('last_name')}
                inputProps={{
                  maxLength: 50,
                  className: classes.inputText,
                }}
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: '#bbb',
                    fontSize: '14px',
                  },
                }}
              />
              <TextField
                required
                focused
                id="dob"
                label="Birth Date"
                error={!childInfoValidation['dob']}
                type="date"
                defaultValue=""
                className={classes.textField}
                onChange={this.handleChange('dob')}
                inputProps={{
                  className: classes.inputText,
                }}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: '#bbb',
                    fontSize: '18px',
                  },
                }}
              />
              <TextField
                required
                focused
                id="case_id"
                label="Case Number"
                error={!childInfoValidation['case_id']}
                className={classes.textField}
                value={childInfo.case_id}
                onChange={this.handleChange('case_id')}
                inputProps={{
                  maxLength: 50,
                  className: classes.inputText,
                }}
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: '#bbb',
                    fontSize: '14px',
                  },
                }}
              />

              <InputMask
                mask="9999-9999-9999-9999999"
                value={childInfo.external_id}
                onChange={this.handleChange('external_id')}
              >
                {() => (
                  <TextField
                    required
                    focused
                    id="external_id"
                    label="Client Id"
                    helperText="Enter 19 digits number"
                    error={!childInfoValidation['external_id']}
                    className={classes.textField}
                    margin="normal"
                    inputProps={{
                      className: classes.inputText,
                    }}
                    InputLabelProps={{
                      style: {
                        color: '#bbb',
                        fontSize: '14px',
                      },
                    }}
                  />
                )}
              </InputMask>

              <TextField
                required
                focused
                select
                id="county"
                label="County"
                error={!childInfoValidation['county']}
                className={classes.textField}
                open={this.state.open}
                onClose={this.handleClose}
                value={childInfo.county}
                onChange={this.handleChange('county')}
                helperText="Please select your County"
                margin="normal"
                inputProps={{
                  className: classes.inputText,
                }}
                InputLabelProps={{
                  style: {
                    color: '#bbb',
                    fontSize: '18px',
                  },
                }}
              >
                {counties.map(option => (
                  <MenuItem key={option.id} value={option} className={classes.menu}>
                    <span id={'county-name'}>{option.name}</span>
                  </MenuItem>
                ))}
              </TextField>
            </form>
          </CardContent>
          <CardActions>
            <Link onClick={this.handleCancel} to={`/`}>
              Cancel
            </Link>

            <Button
              variant="raised"
              size="large"
              color="primary"
              disabled={isSaveButtonDisabled}
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

ClientAddForm.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  childData: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default withStyles(styles)(ClientAddForm);
