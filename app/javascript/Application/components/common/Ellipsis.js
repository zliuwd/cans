import React from 'react'
import PropTypes from 'prop-types'
import { Popover, PopoverBody } from '@cwds/reactstrap'
import Icon from '@cwds/icons'

export default class Ellipsis extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      popoverOpen: false,
    }
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    })
  }

  render() {
    const id = `icon-${this.props.id}`
    return (
      <div>
        <Icon id={id} icon="ellipsis-v" className="icon-ellipsis" onClick={this.toggle} />
        <Popover placement="bottom-start" isOpen={this.state.popoverOpen} target={id} toggle={this.toggle}>
          <PopoverBody className="popoverbody">View CANS Change Log</PopoverBody>
        </Popover>
      </div>
    )
  }
}

Ellipsis.propTypes = {
  id: PropTypes.number.isRequired,
}
