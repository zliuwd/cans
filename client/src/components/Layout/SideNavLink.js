import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom'

import './style.css';

class SideNavLink extends Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { active, text, href, onClick } = this.props;
    const classes = classNames('sidebar-item', { active });
    return (
      <div className={classes} onClick={() => onClick()}>
        <span className="fa-stack">
          <i className="fa fa-circle-thin fa-stack-2x" />
          <i className="fa fa-check fa-stack-1x" />
        </span>
        <Link to={href}>{text}</Link>
      </div>
    );
  }
}

SideNavLink.defaultProps = {
  active: false,
};

export default SideNavLink;
