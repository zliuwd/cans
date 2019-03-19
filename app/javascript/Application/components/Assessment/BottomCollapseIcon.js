import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@cwds/components'
import { isA11yAllowedInput } from '../../util/events'

class BottomCollapseIcon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleKeyPress = event => {
    if (isA11yAllowedInput(event)) {
      this.props.onClick()
    }
  }

  render() {
    return (
      <Icon
        key={`${this.props.code}-inner-collapse-icon`}
        icon="chevron-down"
        size="1x"
        rotation={180}
        id={`${this.props.code}-inner-collapse-icon`}
        role="link"
        tabIndex={0}
        className={'inner-collapse-icon'}
        onClick={this.props.onClick}
        onKeyPress={this.handleKeyPress}
      />
    )
  }
}

BottomCollapseIcon.propTypes = {
  code: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default BottomCollapseIcon
