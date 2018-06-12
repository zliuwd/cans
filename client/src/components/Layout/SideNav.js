import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { ListGroup, ListGroupItem } from '@cwds/components/lib/ListGroups';
import SideNavLink from './SideNavLink';

const ROUTES = [
  { url: '/', name: 'Child & Family Teams' },
  { url: '/reports', name: 'Reports' },
  { url: '/clients/new', name: 'Add Child' }
];

const ListGroupItemLink = withRouter(
  ({ history, location, match, staticContext: _, to, ...props }) => {
    return (
      <ListGroupItem
        {...props}
        onClick={() => history.push(to)}
        action
        active={to === location.pathname}
      />
    );
  }
);

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
      <ListGroup>
        {ROUTES.map(({ name, url }) => (
          <ListGroupItemLink
            key={name}
            to={url}
            action
            style={{ cursor: 'pointer' }}
          >
            {name}
          </ListGroupItemLink>
        ))}
      </ListGroup>
    );
  }
}

export default SideNav;
