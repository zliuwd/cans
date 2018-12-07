import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { CloseableAlert } from './CloseableAlert'
import { globalAlertService } from '../../util/GlobalAlertService'

let nextKey = 0

export class GlobalAlert extends Component {
  constructor(context) {
    super(context)
    this.state = {
      alerts: [],
    }
    globalAlertService.subscribe(this.onAlertEvent)
  }

  onAlertEvent = ({ message, type, isAutoCloseable }) => {
    const alerts = this.state.alerts.slice()
    alerts.push({ message, type, isAutoCloseable })
    this.setState({
      alerts: alerts,
    })
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
          <Row key={`global-alert-${index}`}>
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
