import React, { Component } from 'react';
import classNames from 'classnames';

import './style.css';

class SideNavLink extends Component {
  render() {
    const classes = classNames('sidebar-item', { active: this.props.active });
    return (
      <div className={classes} onClick={() => this.props.onClick()}>
        <span className="fa-stack">
          <i className="fa fa-circle-thin fa-stack-2x" />
          <i className="fa fa-check fa-stack-1x" />
        </span>
        {this.props.text}
      </div>
    );
  }
}

SideNavLink.defaultProps = {
  active: false,
};

export default SideNavLink;
