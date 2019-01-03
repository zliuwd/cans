import React from 'react'
import PropTypes from 'prop-types'
import Debouncer from './Debouncer'
import InputField from './InputField'

class QueryInput extends React.PureComponent {
  onChange = value => {
    this.props.onChange({ target: { value } })
  }

  render() {
    const { onChange, ...props } = this.props
    return (
      <Debouncer callback={this.onChange} callbackPropName="onChange">
        <InputField {...props} />
      </Debouncer>
    )
  }
}

QueryInput.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default QueryInput
