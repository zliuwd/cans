import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { PageInfo, SideNav } from './';
import { Routes } from '../../routes';
import { ChildForm } from '../ChildForm';

class Page extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs="4"><SideNav /></Col>
          <Col xs='8'>
            <Row>
              <Col xs="12"><PageInfo /></Col>
              <Col xs="12"><Routes /></Col>
              <Col xs="12"><ChildForm /></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Page
