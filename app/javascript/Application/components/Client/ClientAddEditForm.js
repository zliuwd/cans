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
    fontSize: 16,
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

  cardActions: {
    marginLeft: 400,
  },
  note: {
    color: '#ff0000',
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

class ClientAddEditForm extends Component {
  constructor(props) {
    super(props);
    const isNewForm = !this.props.match.params.id;
    this.state = {
      isNewForm: isNewForm,
      childInfo: {
        person_role: 'CLIENT',
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix: '',
        dob: '',
        case_id: '',
        external_id: '',
        county: {
          id: 0,
          name: '',
        },
      },
      counties: [],
      childInfoValidation: {
        first_name: !isNewForm,
        last_name: !isNewForm,
        middle_name: true,
        suffix: true,
        dob: !isNewForm,
        case_id: !isNewForm,
        external_id: !isNewForm,
        county: !isNewForm,
      },
      isSaveButtonDisabled: isNewForm,
      open: false,
      redirection: {
        shouldRedirect: false,
        successClientId: null,
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
    if (!this.state.isNewForm) {
      this.fetchChildData(this.props.match.params.id);
    }
    this.fetchCounties();
  }

  fetchChildData = id => {
    return ClientService.getClient(id)
      .then(this.onFetchChildDataSuccess)
      .catch(() => {});
  };

  onFetchChildDataSuccess = data => {
    this.setState({ childInfo: data });
  };

  fetchCounties = () => {
    return CountiesService.fetchCounties()
      .then(this.onFetchCountiesSuccess)
      .catch(() => {});
  };

  onFetchCountiesSuccess = counties => {
    this.setState({ counties });
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
    if (this.state.isNewForm) {
      event.preventDefault();
      ClientService.addClient(this.state.childInfo)
        .then(newChild => {
          this.setState({
            childInfo: newChild,
            redirection: {
              shouldRedirect: true,
              successClientId: newChild.id,
            },
          });
        })
        .catch(() => {});
    } else {
      ClientService.updateClient(this.state.childInfo.id, this.state.childInfo)
        .then(newChild => {
          this.setState({
            childInfo: newChild,
            redirection: {
              shouldRedirect: true,
              successClientId: newChild.id,
            },
          });
        })
        .catch(() => {});
    }
  };

  handleCancel = () => {
    this.setState({
      redirection: {
        shouldRedirect: true,
      },
    });
  };

  render() {
    const { classes } = this.props;
    const { isNewForm, childInfo, childInfoValidation, counties, isSaveButtonDisabled, redirection } = this.state;
    const { shouldRedirect, successClientId } = redirection;

    if (shouldRedirect) {
      return <Redirect push to={{ pathname: `/clients/${childInfo.id}`, state: { isNewForm, successClientId } }} />;
    }
    return (
      <Fragment>
        <PageInfo title={isNewForm ? 'Add Child/Youth' : 'Edit Child/Youth'} />
        <Card className={classes.cardWidth}>
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
                    color: '#777777',
                    fontSize: '1.8rem',
                  },
                }}
              />

              <TextField
                focused
                id="middle_name"
                label="Middle Name"
                defaultValue={childInfo.middle_name}
                error={!childInfoValidation['middle_name']}
                className={classes.textField}
                value={childInfo.middle_name}
                onChange={this.handleChange('middle_name')}
                inputProps={{ maxLength: 50, className: classes.inputText }}
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: '#777777',
                    fontSize: '2rem',
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
                    color: '#777777',
                    fontSize: '1.8rem',
                  },
                }}
              />

              <TextField
                id="suffix"
                label="Suffix"
                defaultValue={childInfo.suffix}
                error={!childInfoValidation['suffix']}
                className={classes.textField}
                value={childInfo.suffix}
                onChange={this.handleChange('suffix')}
                inputProps={{ maxLength: 10, className: classes.inputText }}
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: '#777777',
                    fontSize: '1.8rem',
                  },
                }}
              />

              <TextField
                required
                focused
                id="dob"
                label="Date of Birth"
                defaultValue={childInfo.dob}
                value={childInfo.dob}
                error={!childInfoValidation['dob']}
                type="date"
                className={classes.textField}
                onChange={this.handleChange('dob')}
                inputProps={{ className: classes.inputText }}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: '#777777',
                    fontSize: '1.8rem',
                  },
                }}
              />

              <InputMask
                mask="9999-9999-9999-9999999"
                defaultValue={childInfo.external_id}
                value={childInfo.external_id}
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
                        color: '#777777',
                        fontSize: '1.8rem',
                      },
                    }}
                    FormHelperTextProps={{
                      style: {
                        fontSize: '1rem',
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
                    color: '#777777',
                    fontSize: '1.8rem',
                  },
                }}
                FormHelperTextProps={{
                  style: {
                    fontSize: '1rem',
                  },
                }}
              >
                {!isNewForm && (
                  <MenuItem className={classes.menu} selected={true} value={childInfo.county}>
                    {childInfo.county.name}
                  </MenuItem>
                )}

                {counties.map(option => (
                  <MenuItem key={option.id} value={option} className={classes.menu}>
                    <span id={'county-name'}>{option.name}</span>
                  </MenuItem>
                ))}
              </TextField>
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
                    color: '#777777',
                    fontSize: '1.8rem',
                  },
                }}
              />
            </form>
          </CardContent>
          <CardActions>
            {this.state.isSaveButtonDisabled && <p className={classes.note}>*required fields</p>},
            <Link
              onClick={this.handleCancel}
              to={isNewForm ? `/` : `/clients/${childInfo.id}`}
              className={classes.cardActions}
            >
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

ClientAddEditForm.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClientAddEditForm);
