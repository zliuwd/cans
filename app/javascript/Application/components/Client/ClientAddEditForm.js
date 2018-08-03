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

const FIRST_MIDDLE_NAME_MAX_LENGTH = 20;
const LAST_NAME_MAX_LENGTH = 25;
const SUFFIX_MAX_LENGTH = 4;

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  inputText: {
    color: '#111',
    fontSize: 16,
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
        case_id: true,
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

  renderNameInputs(field, label, maxLength) {
    const { classes } = this.props;
    const { childInfo, childInfoValidation } = this.state;
    return (
      <TextField
        required
        focused
        id={field}
        label={label}
        defaultValue={childInfo[field]}
        error={!childInfoValidation[field]}
        className={classes.textField}
        value={childInfo[field]}
        onChange={this.handleChange(field)}
        inputProps={{
          maxLength: maxLength,
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
    );
  }

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
              {this.renderNameInputs('first_name', 'First Name', FIRST_MIDDLE_NAME_MAX_LENGTH)}
              {this.renderNameInputs('middle_name', 'Middle Name', FIRST_MIDDLE_NAME_MAX_LENGTH)}
              {this.renderNameInputs('last_name', 'Last Name', LAST_NAME_MAX_LENGTH)}
              {this.renderNameInputs('suffix', 'Suffix', SUFFIX_MAX_LENGTH)}

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
              <InputMask
                mask="9999-999-9999-99999999"
                value={childInfo.case_id}
                defaultValue={childInfo.case_id}
                onChange={this.handleChange('case_id')}
              >
                {() => (
                  <TextField
                    required
                    focused
                    id="case_id"
                    label="Case Number"
                    defaultValue={childInfo.case_id}
                    helperText="Enter 19 digits number"
                    error={!childInfoValidation['case_id']}
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
