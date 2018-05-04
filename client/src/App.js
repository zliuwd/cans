import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs="3"></Col>
          <Col xs="auto"></Col>
          <Col xs="3"></Col>
        </Row>
      </Container>
    );
  }
}

export default App;
