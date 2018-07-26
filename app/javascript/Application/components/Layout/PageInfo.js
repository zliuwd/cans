import React, { PureComponent, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import './style.sass';

class PageInfo extends PureComponent {
  render() {
    return (
      <Fragment>
        <Row>
          <Col xs="12">
            <div className={'title'}>{this.props.title}</div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

PageInfo.propTypes = {
  // page header title
  title: PropTypes.string.isRequired,
};

export default PageInfo;
