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
    fontSize: 20,
  },
  menu: {
    width: 300,
    fontSize: 20,
  },
  cardWidth: {
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

class ClientEditForm extends Component {
  constructor(context) {
    super(context);
    this.state = {
      childStatus: 'idle',
      childInfo: { XHRStatus: 'idle' },
      counties: [],
      childInfoValidation: {
        first_name: true,
        last_name: true,
        dob: true,
        case_id: true,
        external_id: true,
        county: true,
      },
      isSaveButtonDisabled: false,
      open: false,
      navigate: false,
      redirection: {
        shouldRedirect: false,
        successClientEditId: null,
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

  componentDidMount() {
    this.fetchChildData(this.props.match.params.id);
    this.fetchCounties();
  }

  fetchChildData = id => {
    this.setState({ childInfo: { XHRStatus: 'waiting' } });
    return ClientService.getClient(id)
      .then(this.onFetchChildDataSuccess)
      .catch(() => this.setState({ childInfo: { XHRStatus: 'error' } }));
  };

  onFetchChildDataSuccess = data => {
    this.setState({
      childInfo: data,
      XHRStatus: 'ready',
    });
  };

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

  handleSubmit = event => {
    this.setState({ childStatus: 'updating' });
    ClientService.updateClient(this.state.childInfo.id, this.state.childInfo)
      .then(newChild => {
        this.setState({
          childInfo: newChild,
          childStatus: 'ready',
          redirection: {
            shouldRedirect: true,
            successClientEditId: newChild.id,
          },
        });
      })
      .catch(() => this.setState({ childStatus: 'error' }));
  };

  handleCancel = event => {
    this.setState({
      redirection: {
        shouldRedirect: true,
      },
    });
  };

  render() {
    const { classes } = this.props;
    const { childInfo, childInfoValidation, counties, isSaveButtonDisabled, redirection } = this.state;
    const { shouldRedirect, successClientEditId } = redirection;

    if (shouldRedirect) {
      return <Redirect push to={{ pathname: `/clients/${childInfo.id}`, state: { successClientEditId } }} />;
    }
    return (
      <Fragment>
        <PageInfo title={'Add Child/Youth'} />
        <Card className={classes.cardWidth}>
          <CardHeader
            className={classes.cardHeader}
            title="Child/Youth Information"
            classes={{
              title: classes.title,
            }}
          />

          <CardContent>
            {childInfo.id && (
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  required
                  focused
                  id="first_name"
                  label="First Name"
                  defaultValue={childInfo.first_name}
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
                      fontSize: '16px',
                    },
                  }}
                />

                <TextField
                  required
                  focused
                  id="last_name"
                  label="Last Name"
                  defaultValue={childInfo.last_name}
                  error={!childInfoValidation['last_name']}
                  className={classes.textField}
                  value={childInfo.last_name}
                  onChange={this.handleChange('last_name')}
                  inputProps={{ maxLength: 50, className: classes.inputText }}
                  margin="normal"
                  InputLabelProps={{
                    style: {
                      color: '#bbb',
                      fontSize: '16px',
                    },
                  }}
                />
                <TextField
                  required
                  focused
                  id="dob"
                  label="Birth Date"
                  defaultValue={childInfo.dob}
                  error={!childInfoValidation['dob']}
                  type="date"
                  className={classes.textField}
                  onChange={this.handleChange('dob')}
                  inputProps={{ className: classes.inputText }}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      color: '#bbb',
                      fontSize: '16px',
                    },
                  }}
                />
                <TextField
                  required
                  focused
                  id="case_id"
                  label="Case Number"
                  defaultValue={childInfo.case_id}
                  error={!childInfoValidation['case_id']}
                  className={classes.textField}
                  value={childInfo.case_id}
                  onChange={this.handleChange('case_id')}
                  inputProps={{ maxLength: 50, className: classes.inputText }}
                  margin="normal"
                  InputLabelProps={{
                    style: {
                      color: '#bbb',
                      fontSize: '16px',
                    },
                  }}
                />

                <InputMask
                  mask="9999-9999-9999-9999999"
                  value={childInfo.external_id}
                  defaultValue={childInfo.external_id}
                  onChange={this.handleChange('external_id')}
                >
                  {() => (
                    <TextField
                      required
                      focused
                      id="external_id"
                      label="Client Id"
                      defaultValue={childInfo.external_id}
                      helperText="Enter 19 digits number"
                      error={!childInfoValidation['external_id']}
                      className={classes.textField}
                      margin="normal"
                      inputProps={{ className: classes.inputText }}
                      InputLabelProps={{
                        style: {
                          color: '#bbb',
                          fontSize: '16px',
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
                  inputProps={{ className: classes.inputText }}
                  InputLabelProps={{
                    style: {
                      color: '#bbb',
                      fontSize: '16px',
                    },
                  }}
                >
                  <MenuItem className={classes.menu} selected={true} value={childInfo.county}>
                    {childInfo.county.name}
                  </MenuItem>
                  {counties.map(option => (
                    <MenuItem key={option.id} value={option} className={classes.menu}>
                      <span id={'county-name'}>{option.name}</span>
                    </MenuItem>
                  ))}
                </TextField>
              </form>
            )}
          </CardContent>
          <CardActions>
            <Link onClick={this.handleCancel} to={`/clients/${childInfo.id}`}>
              Cancel
            </Link>
            <Button
              id={'submitBtn'}
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

ClientEditForm.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default withStyles(styles)(ClientEditForm);
