import React from 'react'
import PropTypes from 'prop-types'
import { Popover, PopoverBody } from '@cwds/reactstrap'
import Icon from '@cwds/icons'
import { Link } from 'react-router-dom'
import { Button } from '@cwds/components'

export default class Ellipsis extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isPopOverOpen: false,
    }

    this.toggleOpen = this.toggleOpen.bind(this)
  }

  toggleOpen() {
    const { isPopOverOpen } = this.state
    this.setState({
      isPopOverOpen: !isPopOverOpen,
    })
  }

  render() {
    const { clientId, assessmentId } = this.props
    const linkProps = {
      pathname: `/clients/${clientId}/assessments/${assessmentId}/changelog`,
    }

    return (
      <div>
        <Button
          id={`icon-${assessmentId}`}
          className="icon-ellipsis"
          type="button"
          aria-label="Ellipsis Menu Button"
          onClick={this.toggleOpen}
        >
          <Icon icon="ellipsis-v" />
        </Button>
        <Popover
          placement="bottom-start"
          isOpen={this.state.isPopOverOpen}
          target={`icon-${assessmentId}`}
          toggle={this.toggleOpen}
        >
          <PopoverBody className="popoverbody">
            <Link to={linkProps}>View CANS Change Log</Link>
          </PopoverBody>
        </Popover>
      </div>
    )
  }
}

Ellipsis.propTypes = {
  assessmentId: PropTypes.number.isRequired,
  clientId: PropTypes.string.isRequired,
}
