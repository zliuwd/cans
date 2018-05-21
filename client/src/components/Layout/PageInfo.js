import React, { Component, Fragment } from 'react';
import { Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import '../../style.css';

class PageInfo extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Col xs="12">
            <div className={'title'}>Add CANS</div>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
          <Breadcrumb tag="nav">
            Back to&nbsp;<BreadcrumbItem tag="a" href="#">Dashboard</BreadcrumbItem>
            <BreadcrumbItem tag="a" href="#">Child &amp; Family Teams</BreadcrumbItem>
            <BreadcrumbItem tag="a" href="#">Lastname, Firstname</BreadcrumbItem>
            <BreadcrumbItem tag="span" >Add CANS</BreadcrumbItem>
          </Breadcrumb>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default PageInfo;
