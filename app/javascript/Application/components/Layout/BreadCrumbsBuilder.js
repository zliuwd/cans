import React from 'react';
import PropTypes from 'prop-types';
import { navigation } from '../../util/constants';
import BreadCrumb from './BreadCrumb';
import { formatClientName } from '../Client/Client.helper';
import { Link } from 'react-router-dom';

const levelOneCrumbs = [
  navigation.ASSESSMENT_ADD,
  navigation.ASSESSMENT_EDIT,
  navigation.CHILD_PROFILE,
  navigation.CHILD_PROFILE_ADD,
  navigation.CHILD_PROFILE_EDIT,
];

const levelTwoCrumbs = [
  navigation.ASSESSMENT_ADD,
  navigation.ASSESSMENT_EDIT,
  navigation.CHILD_PROFILE_ADD,
  navigation.CHILD_PROFILE_EDIT,
];

const addLevelOneNavigation = (elements, navigateTo) => {
  if (levelOneCrumbs.includes(navigateTo)) {
    elements.push(<Link to={''}>CHILD/YOUTH LIST</Link>);
  } else if (navigateTo === navigation.CHILD_LIST) {
    elements.push(<u>CHILD/YOUTH LIST</u>);
  }
};

const addLevelTwoNavigation = (elements, navigateTo, client) => {
  if (!client) return;
  if (levelTwoCrumbs.includes(navigateTo)) {
    elements.push(<Link to={`/clients/${client.id}`}>{formatClientName(client).toUpperCase()}</Link>);
  } else if (navigateTo === navigation.CHILD_PROFILE) {
    elements.push(<u>{formatClientName(client).toUpperCase()}</u>);
  }
};

const addLevelThreeNavigation = (elements, navigateTo) => {
  if (navigateTo === navigation.CHILD_PROFILE_ADD) {
    elements.push(<u>ADD CHILD/YOUTH</u>);
  } else if (navigateTo === navigation.CHILD_PROFILE_EDIT) {
    elements.push(<u>EDIT PROFILE</u>);
  } else if (navigateTo === navigation.ASSESSMENT_ADD) {
    elements.push(<u>ADD CANS</u>);
  } else if (navigateTo === navigation.ASSESSMENT_EDIT) {
    elements.push(<u>EDIT CANS</u>);
  }
};

class BreadCrumbsBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  prepareNavigationElements() {
    const elements = [];
    const { navigateTo, client } = this.props;
    addLevelOneNavigation(elements, navigateTo);
    addLevelTwoNavigation(elements, navigateTo, client);
    addLevelThreeNavigation(elements, navigateTo);
    return elements;
  }

  render() {
    const navigationElements = this.prepareNavigationElements();
    return <BreadCrumb navigationElements={navigationElements} />;
  }
}

BreadCrumbsBuilder.propTypes = {
  client: PropTypes.object,
  navigateTo: PropTypes.oneOf(Object.values(navigation)).isRequired,
};

BreadCrumbsBuilder.defaultProps = {
  client: null,
};

export default BreadCrumbsBuilder;
