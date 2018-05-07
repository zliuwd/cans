import React, {Component, Fragment} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { GlobalHeader, PageHeader } from 'react-wood-duck'

import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalHeader profileName="Username" profileId="profile.id"/>
        <PageHeader pageTitle={'CANS Assessment Application'} button={null}/>
        <Container>
          <Row>
            <Col xs="3"></Col>
            <Col xs="auto"></Col>
            <Col xs="3"></Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default App;
