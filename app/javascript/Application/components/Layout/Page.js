import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Routes } from '../../routes';

const Page = () => {
  return (
    <Container>
      <Row className="row-padding">
        <Col xs="12">
          <Row>
            <Col xs="12">
              <Routes />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Page;
