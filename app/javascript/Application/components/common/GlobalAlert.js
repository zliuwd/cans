import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { CloseableAlert } from './CloseableAlert'
import { globalAlertService } from '../../util/GlobalAlertService'
import { isIE } from '../../util/common'
import PropTypes from 'prop-types'

let nextKey = 0

export class GlobalAlert extends Component {
  constructor(context) {
    super(context)
    this.state = {
      alerts: [],
    }
    globalAlertService.subscribe(this.onAlertEvent)
    globalAlertService.subscribeCloseAlert(this.closeByMessageId)
  }

  componentDidUpdate() {
    if (isIE) {
      // This is a bug fix for IE when alert is closed, but the empty space is still reserved for it
      window.Stickyfill.rebuild()
    }
  }

  onAlertEvent = ({ message, type, isAutoCloseable, componentId, messageId }) => {
    const alerts = this.state.alerts.slice()
    if (
      componentId === this.props.id &&
      (undefined === messageId || !alerts.some(alert => alert.messageId === messageId))
    ) {
      alerts.push({ message, type, isAutoCloseable, messageId })
      this.setState({
        alerts: alerts,
      })
    }
  }

  closeByMessageId = messageId => {
    const alerts = this.state.alerts.slice()
    this.onAlertClose(alerts.indexOf(alerts.find(value => value.messageId === messageId)))
  }

  onAlertClose = index => {
    const alerts = this.state.alerts.slice()
    alerts.splice(index, 1)
    this.setState({
      alerts: alerts,
    })
  }

  render() {
    if (!this.state.alerts.length) {
      return null
    }

    const alerts = this.state.alerts
    return (
      <Container>
        {alerts.map((alert, index) => (
          <Row key={`global-alert-${index}`} className={'row-padding'}>
            <Col>
              <CloseableAlert
                key={nextKey++}
                className={'global-alert'}
                message={alert.message}
                type={alert.type}
                isAutoCloseable={alert.isAutoCloseable}
                isCloseable={true}
                onClose={() => this.onAlertClose(index)}
              />
            </Col>
          </Row>
        ))}
      </Container>
    )
  }
}

GlobalAlert.propTypes = {
  id: PropTypes.string,
}

GlobalAlert.defaultProps = {
  id: undefined,
}
