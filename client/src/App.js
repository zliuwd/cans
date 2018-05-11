import React, {Component, Fragment} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { GlobalHeader, PageHeader } from 'react-wood-duck';
import Domains  from './Domains';
import PageInfo  from './PageInfo';
import SideNav from './views/SideNav';

import './style.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalHeader profileName="Username" profileId="profile.id"/>
        <PageHeader pageTitle={'CANS Assessment Application'} button={null}/>
        <Container>
          <Row>
            <Col xs="4"><SideNav /></Col>
            <Col xs='8'>
              <Row>
              <Col xs="12"><PageInfo /></Col>
              <Col xs="12"><Domains /></Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default App;
