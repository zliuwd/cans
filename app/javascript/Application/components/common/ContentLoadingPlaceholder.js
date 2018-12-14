import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import './style.sass'

const placeholderLine = <div className={'content-loader-placeholder'} />

const ContentLoadingPlaceholder = ({ isGrid, columns, rows }) => {
  return isGrid ? (
    <Container>
      {[...Array(rows)].map((e, i) => (
        <Row key={i}>{[...Array(columns)].map((_, j) => <Col key={j}>{placeholderLine}</Col>)}</Row>
      ))}
    </Container>
  ) : (
    placeholderLine
  )
}

ContentLoadingPlaceholder.propTypes = {
  columns: PropTypes.number,
  isGrid: PropTypes.bool,
  rows: PropTypes.number,
}

ContentLoadingPlaceholder.defaultProps = {
  columns: 1,
  isGrid: false,
  rows: 1,
}

export default ContentLoadingPlaceholder
