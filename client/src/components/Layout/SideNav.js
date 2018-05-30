import React, { Component } from 'react';
import SideNavLink from './SideNavLink';

import './style.css';

const CHILD_FAMILY_TEAMS = '/';
const REPORTS = '/reports';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = { activeLink: '' };
    this.toggleActiveLink = this.toggleActiveLink.bind(this);
    this.isActive = this.isActive.bind(this);
  }

  toggleActiveLink(href) {
    this.setState({ activeLink: href });
  }

  isActive(href) {
    return this.state.activeLink === href;
  }

  render() {
    return (
      <nav className={'sidebar'}>
        <SideNavLink
          href={CHILD_FAMILY_TEAMS}
          text={'Child & Family Teams'}
          onClick={() => {
            this.toggleActiveLink(CHILD_FAMILY_TEAMS);
          }}
          active={this.isActive(CHILD_FAMILY_TEAMS)}
        />
        <SideNavLink
          href={REPORTS}
          text={'Reports'}
          onClick={() => {
            this.toggleActiveLink(REPORTS);
          }}
          active={this.isActive(REPORTS)}
        />
      </nav>
    );
  }
}

export default SideNav;
