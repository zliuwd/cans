import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import './style.sass';

class SideNavLink extends PureComponent {
  render() {
    const { isActive, text, href, onClick } = this.props;
    const classes = classNames('sidebar-item', { active: isActive });
    return (
      <div
        id="side-nav"
        className={classes}
        onClick={() => onClick()}
        onKeyDown={() => onClick()}
        role="link"
        tabIndex={0}
      >
        <span className="fa-stack">
          <i className="fa fa-circle-thin fa-stack-2x" />
          <i className="fa fa-check fa-stack-1x" />
        </span>
        <Link to={href}>{text}</Link>
      </div>
    );
  }
}

SideNavLink.propTypes = {
  href: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default SideNavLink;
