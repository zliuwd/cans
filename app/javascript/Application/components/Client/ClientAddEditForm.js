import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import { Row, Col, Button } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import { MenuItem, TextField, Card, CardHeader, CardContent } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { CountiesService } from './Counties.service';
import { ClientService } from './Client.service';
import { validate, validateCaseNumber, validateCaseNumbersAreUnique, isFormValid } from './ClientFormValidator';
import { PageInfo } from '../Layout';
import { isA11yAllowedInput } from '../../util/events';
import { clone } from '../../util/common';

import './style.sass';

const FIRST_MIDDLE_NAME_MAX_LENGTH = 20;
const LAST_NAME_MAX_LENGTH = 25;
const SUFFIX_MAX_LENGTH = 4;

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
    fontSize: 16,
  },
  menu: {
    width: 300,
    fontSize: 16,
  },
  cardWidth: {
    minWidth: 300,
    borderRadius: 0,
  },
  cardHeader: {
    backgroundColor: '#114161',
    color: '#fff',
  },
  note: {
    color: '#ff0000',
    marginTop: theme.spacing.unit,
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
});

const inputLabelProps = {
  style: {
    color: '#777777',
    fontSize: 18,
  },
};

const helperTextProps = {
  style: {
    fontSize: 10,
  },
};

class ClientAddEditForm extends Component {
  constructor(props) {
    super(props);
    const isNewForm = !this.props.match.params.id;
    this.state = {
      isNewForm,
      childInfo: {
        person_role: 'CLIENT',
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix: '',
        dob: '',
        external_id: '',
        county: {
          id: 0,
          name: '',
        },
        cases: [{ external_id: '' }],
      },
      childInfoValidation: {
        first_name: !isNewForm,
        last_name: !isNewForm,
        middle_name: true,
        suffix: true,
        dob: !isNewForm,
        external_id: !isNewForm,
        county: !isNewForm,
        cases: [{ external_id: true }],
      },
      counties: [],
      isSaveButtonDisabled: isNewForm,
      redirection: {
        shouldRedirect: false,
        successClientId: null,
      },
    };
  }

  componentDidMount() {
    this.fetchCounties();
    if (!this.state.isNewForm) {
      this.fetchChildData(this.props.match.params.id);
    }
  }

  fetchChildData = id => {
    return ClientService.getClient(id)
      .then(this.onFetchChildDataSuccess)
      .catch(() => {});
  };

  onFetchChildDataSuccess = childInfo => {
    if (childInfo.cases.length === 0) {
      childInfo.cases.push({ external_id: '' });
    }

    const childInfoValidation = {
      ...this.state.childInfoValidation,
      cases: [],
    };
    for (let i = 0; i < childInfo.cases.length; i++) {
      childInfoValidation.cases.push({ external_id: true });
    }
    this.setState({
      childInfo,
      childInfoValidation,
    });
  };

  fetchCounties = () => {
    return CountiesService.fetchCounties()
      .then(this.onFetchCountiesSuccess)
      .catch(() => {});
  };

  onFetchCountiesSuccess = counties => {
    this.setState({ counties });
  };

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

  validateInput = (fieldName, inputValue) => {
    const allValidations = this.state.childInfoValidation;
    allValidations[fieldName] = validate(fieldName, inputValue);
    this.setState({
      childInfoValidation: {
        ...allValidations,
      },
      isSaveButtonDisabled: !isFormValid(allValidations),
    });
  };

  handleChangeCaseNumber = caseIndex => event => {
    const cases = clone(this.state.childInfo.cases);
    cases[caseIndex].external_id = event.target.value;
    const childInfoValidation = {
      ...this.state.childInfoValidation,
      cases: this.validateCaseNumbers(cases),
    };
    this.setState({
      childInfo: {
        ...this.state.childInfo,
        cases,
      },
      childInfoValidation,
      isSaveButtonDisabled: !isFormValid(childInfoValidation),
    });
  };

  validateCaseNumbers = cases => {
    const casesValidations = clone(this.state.childInfoValidation.cases);
    for (const [index, aCase] of cases.entries()) {
      casesValidations[index].external_id = validateCaseNumber(aCase.external_id);
    }
    const nonUniqueCasesIndices = validateCaseNumbersAreUnique(cases);
    nonUniqueCasesIndices.forEach(index => (casesValidations[index].external_id = false));
    return casesValidations;
  };

  handleSubmit = event => {
    const childInfo = this.prepareChildForSubmit(clone(this.state.childInfo));
    if (this.state.isNewForm) {
      event.preventDefault();
      ClientService.addClient(childInfo)
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
      ClientService.updateClient(childInfo.id, childInfo)
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

  prepareChildForSubmit(childInfo) {
    const cases = childInfo.cases;
    for (let i = cases.length - 1; i >= 0; i--) {
      if (!cases[i].external_id) {
        cases.splice(i, 1);
      }
    }
    return childInfo;
  }

  handleCancel = () => {
    this.setState({
      redirection: {
        shouldRedirect: true,
      },
    });
  };

  handleAddCaseNumber = event => {
    if (isA11yAllowedInput(event)) {
      const childInfo = this.addCaseNumberToChildInfo();
      const childInfoValidation = this.addCaseNumberToValidations();
      this.setState({
        childInfo,
        childInfoValidation,
        isSaveButtonDisabled: !isFormValid(childInfoValidation),
      });
    }
  };

  addCaseNumberToChildInfo = () => {
    const cases = clone(this.state.childInfo.cases);
    cases.push({ external_id: '' });
    return {
      ...this.state.childInfo,
      cases: cases,
    };
  };

  addCaseNumberToValidations = () => {
    const casesValidation = clone(this.state.childInfoValidation.cases);
    casesValidation.push({ external_id: true });
    return {
      ...this.state.childInfoValidation,
      cases: casesValidation,
    };
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
        InputLabelProps={inputLabelProps}
      />
    );
  }

  renderCountiesDropDown = () => {
    const { classes } = this.props;
    const { isNewForm, childInfo, childInfoValidation, counties } = this.state;
    const isValid = childInfoValidation['county'];
    return (
      <TextField
        required
        select
        id="county"
        label="County"
        error={!isValid}
        className={classes.textField}
        value={childInfo.county}
        onChange={this.handleChange('county')}
        helperText={!isValid ? 'Please select your County' : null}
        margin="normal"
        inputProps={{ className: classes.inputText }}
        InputLabelProps={inputLabelProps}
        FormHelperTextProps={helperTextProps}
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
    );
  };

  renderSingleCaseNumber = (index, aCase, isFirst) => {
    const { classes } = this.props;
    const { childInfoValidation } = this.state;
    return (
      <InputMask
        key={index}
        mask="9999-999-9999-99999999"
        value={aCase.external_id}
        onChange={this.handleChangeCaseNumber(index)}
      >
        {() => (
          <TextField
            key={index}
            id={`caseNumber${index}`}
            label={isFirst ? 'Case Number' : null}
            error={!childInfoValidation.cases[index].external_id}
            className={classes.textField}
            helperText={!childInfoValidation.cases[index].external_id ? 'Enter 19 digits number' : null}
            inputProps={{ className: classes.inputText }}
            margin="normal"
            InputLabelProps={inputLabelProps}
            FormHelperTextProps={helperTextProps}
          />
        )}
      </InputMask>
    );
  };

  renderCaseNumbers = () => {
    const { cases } = this.state.childInfo;
    let renderedCases = [];
    let isFirstCase = true;
    for (let i = cases.length - 1; i >= 0; i--) {
      renderedCases.push(this.renderSingleCaseNumber(i, cases[i], isFirstCase));
      isFirstCase = false;
    }
    return renderedCases;
  };

  renderCaseNumbersBlock = () => {
    return (
      <div className={'case-numbers'}>
        {this.renderCaseNumbers()}
        <div className={'case-numbers-controls'}>
          <h5>
            <div
              onClick={this.handleAddCaseNumber}
              onKeyPress={this.handleAddCaseNumber}
              className={'case-numbers-single-control'}
              role={'button'}
              tabIndex={0}
            >
              + ADD CASE NUMBER
            </div>
          </h5>
        </div>
      </div>
    );
  };

  renderFormFooter = () => {
    const { classes } = this.props;
    const { isSaveButtonDisabled } = this.state;
    return (
      <div className={'add-edit-form-footer'}>
        <Row>
          <Col sm={4}>{isSaveButtonDisabled && <p className={classes.note}>*required fields</p>}</Col>
          <Col sm={8} className={'add-edit-form-controls'}>
            <Button id={'cancel-button'} color={'link'} className={'cancel-button'} onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button id={'save-button'} color={'primary'} disabled={isSaveButtonDisabled} onClick={this.handleSubmit}>
              Save
            </Button>
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    const { isNewForm, childInfo, childInfoValidation, redirection } = this.state;
    const { shouldRedirect, successClientId } = redirection;

    if (shouldRedirect) {
      const pathName = isNewForm && !successClientId ? `/` : `/clients/${childInfo.id}`;
      return <Redirect push to={{ pathname: pathName, state: { isNewForm, successClientId } }} />;
    }

    return (
      <Fragment>
        <PageInfo title={isNewForm ? 'Add Child/Youth' : 'Edit Child/Youth'} />
        <Card className={classes.cardWidth}>
          <CardHeader
            className={'card-header-cans'}
            title="Child/Youth Information"
            classes={{ title: classes.title }}
          />

          <div className={'content'}>
            <CardContent>
              <form className={classes.container} noValidate autoComplete="off">
                {this.renderNameInputs('first_name', 'First Name', FIRST_MIDDLE_NAME_MAX_LENGTH)}
                {this.renderNameInputs('middle_name', 'Middle Name', FIRST_MIDDLE_NAME_MAX_LENGTH)}
                {this.renderNameInputs('last_name', 'Last Name', LAST_NAME_MAX_LENGTH)}
                {this.renderNameInputs('suffix', 'Suffix', SUFFIX_MAX_LENGTH)}

                <TextField
                  required
                  id="dob"
                  label="Date of Birth"
                  value={childInfo.dob}
                  error={!childInfoValidation['dob']}
                  type="date"
                  className={classes.textField}
                  onChange={this.handleChange('dob')}
                  inputProps={{ className: classes.inputText }}
                  InputLabelProps={{
                    ...inputLabelProps,
                    shrink: true,
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
                      id="external_id"
                      label="Client Id"
                      helperText={!childInfoValidation['external_id'] ? 'Enter 19 digits number' : null}
                      error={!childInfoValidation['external_id']}
                      className={classes.textField}
                      margin="normal"
                      inputProps={{ className: classes.inputText }}
                      InputLabelProps={inputLabelProps}
                      FormHelperTextProps={helperTextProps}
                    />
                  )}
                </InputMask>

                {this.renderCountiesDropDown()}
                {this.renderCaseNumbersBlock()}
              </form>
              {this.renderFormFooter()}
            </CardContent>
          </div>
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
