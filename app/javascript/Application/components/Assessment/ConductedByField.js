import React, { PureComponent, Fragment } from 'react'
import { Label, Input } from 'reactstrap'
import PropTypes from 'prop-types'

class ConductedByField extends PureComponent {
  render() {
    return (
      <Fragment>
        <Label for={this.props.id} className={'assessment-form-header-label'}>
          Assessment Conducted by
        </Label>
        <Input
          type={'text'}
          className={'assessment-form-header-input'}
          id={this.props.id}
          value={this.props.value}
          onChange={this.props.onChange}
          disabled={this.props.isDisabled}
          maxLength={100}
        />
      </Fragment>
    )
  }
}

ConductedByField.defaultProps = {
  id: 'conducted-by',
  value: '',
  onChange: () => {},
  isDisabled: false,
}

ConductedByField.propTypes = {
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default ConductedByField
