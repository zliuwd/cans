import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ navigationElements }) => (
  <div className="container">
    <div className="row">
      <div className="col-xs-7 row-padding">
        <h5>
          {' '}
          <span>
            <Link to={'/dashboard'}>DASHBOARD</Link>{' '}
            {navigationElements.map((nav, index) => <span key={index}> > {nav}</span>)}
          </span>
        </h5>
      </div>
    </div>
  </div>
);

BreadCrumb.propTypes = {
  navigationElements: PropTypes.array,
};

BreadCrumb.defaultProps = {
  navigationElements: [],
};

export default BreadCrumb;
