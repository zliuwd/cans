import React from 'react'
import PropTypes from 'prop-types'
import Sticker from 'react-stickyfill'
import { Container, Col, Row } from 'reactstrap'
import { PageHeader } from '../Header'
import { GlobalAlert } from '../common'
import { navigation } from '../../util/constants'

const ReactWoodDuckLayout = ({ breadcrumb, children, navigateTo, rightButton }) => (
  <React.Fragment>
    <PageHeader navigateTo={navigateTo} rightButton={rightButton} />
    <Sticker>
      <div className="sticky breadcrumb-container">
        {breadcrumb}
        <GlobalAlert />
        <GlobalAlert id={'infoMessages'} />{' '}
      </div>
    </Sticker>
    <Container>
      <Row>
        <Col xs="12" role={'main'} id={'main-content'}>
          {children}
        </Col>
      </Row>
    </Container>
  </React.Fragment>
)

ReactWoodDuckLayout.propTypes = {
  breadcrumb: PropTypes.node,
  children: PropTypes.node,
  navigateTo: PropTypes.oneOf(Object.values(navigation)).isRequired,
  rightButton: PropTypes.node,
}

ReactWoodDuckLayout.defaultProps = {
  breadcrumb: null,
  children: null,
  rightButton: null,
}
export default ReactWoodDuckLayout
