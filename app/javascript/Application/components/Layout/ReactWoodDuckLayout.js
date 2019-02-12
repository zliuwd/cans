import React from 'react'
import PropTypes from 'prop-types'
import Sticker from 'react-stickyfill'
import { Container, Col, Row } from 'reactstrap'
import { Header, PageHeader } from '../Header'
import { GlobalAlert } from '../common'
import { navigation } from '../../util/constants'

const ReactWoodDuckLayout = ({ breadcrumb, children, leftButton, navigateTo, rightButton }) => (
  <React.Fragment>
    <Header />
    <PageHeader leftButton={leftButton} navigateTo={navigateTo} rightButton={rightButton} />
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
  leftButton: PropTypes.node,
  navigateTo: PropTypes.oneOf(Object.values(navigation)).isRequired,
  rightButton: PropTypes.node,
}

ReactWoodDuckLayout.defaultProps = {
  breadcrumb: null,
  leftButton: null,
  children: null,
  rightButton: null,
}
export default ReactWoodDuckLayout
