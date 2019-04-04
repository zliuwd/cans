import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from '@cwds/components'
import BooleanRadioGroup from './BooleanRadioGroup'

import './style.sass'

const RadioGroupMessageBox = ({ message, ...props }) => {
  return (
    <Col className="radio-group-box" xs={6}>
      <div className="radio-group-box-inner">
        <Row>
          <Col xs={4}>
            <BooleanRadioGroup {...props} />
          </Col>

          <Col xs={8}>{message}</Col>
        </Row>
      </div>
    </Col>
  )
}

RadioGroupMessageBox.propTypes = {
  message: PropTypes.node,
  ...BooleanRadioGroup.propTypes,
}

RadioGroupMessageBox.defaultProps = {
  message: null,
}

export default RadioGroupMessageBox
