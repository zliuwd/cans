import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import ContentLoadingDiv from './ContentLoadingDiv'

import './style.sass'

const ContentLoadingGrid = ({ columns, rows }) => {
  return (
    <Container className={'content-loading-grid'}>
      {[...Array(rows)].map((_, i) => (
        <Row key={i}>
          {[...Array(columns)].map((_, j) => (
            <Col key={j}>
              <ContentLoadingDiv />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  )
}

ContentLoadingGrid.propTypes = {
  columns: PropTypes.number,
  rows: PropTypes.number,
}

ContentLoadingGrid.defaultProps = {
  columns: 1,
  rows: 1,
}

export default ContentLoadingGrid
