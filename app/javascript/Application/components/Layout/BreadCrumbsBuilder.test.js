import React from 'react';
import BreadCrumbsBuilder from './BreadCrumbsBuilder';
import BreadCrumb from './BreadCrumb';
import { childInfoJson } from '../Client/Client.helper.test';
import { shallow } from 'enzyme';
import { navigation } from '../../util/constants';

describe('bread crumb builder', () => {
  it('renders CHILD/YOUTH LIST', () => {
    const breadCrumbComponent = shallow(
      <BreadCrumbsBuilder navigateTo={navigation.CHILD_LIST} client={childInfoJson} />
    );

    expect(
      breadCrumbComponent
        .find(BreadCrumb)
        .dive()
        .find('u')
        .text()
    ).toEqual('CHILD/YOUTH LIST');
    expect(
      breadCrumbComponent
        .find(BreadCrumb)
        .dive()
        .find('a')
        .text()
    ).toEqual('DASHBOARD');
  });

  it('renders CLIENT NAME', () => {
    const breadCrumbComponent = shallow(
      <BreadCrumbsBuilder navigateTo={navigation.CHILD_PROFILE} client={childInfoJson} />
    );

    expect(
      breadCrumbComponent
        .find(BreadCrumb)
        .dive()
        .find('u')
        .text()
    ).toEqual('CHILD, TEST');
  });

  it('renders ADD CHILD/YOUTH', () => {
    const breadCrumbComponent = shallow(
      <BreadCrumbsBuilder navigateTo={navigation.CHILD_PROFILE_ADD} client={childInfoJson} />
    );
    expect(
      breadCrumbComponent
        .find(BreadCrumb)
        .dive()
        .find('u')
        .text()
    ).toEqual('ADD CHILD/YOUTH');
  });

  it('renders EDIT PROFILE', () => {
    const breadCrumbComponent = shallow(
      <BreadCrumbsBuilder navigateTo={navigation.CHILD_PROFILE_EDIT} client={childInfoJson} />
    );
    expect(
      breadCrumbComponent
        .find(BreadCrumb)
        .dive()
        .find('u')
        .text()
    ).toEqual('EDIT PROFILE');
  });

  it('renders ADD CANS', () => {
    const breadCrumbComponent = shallow(
      <BreadCrumbsBuilder navigateTo={navigation.ASSESSMENT_ADD} client={childInfoJson} />
    );
    expect(
      breadCrumbComponent
        .find(BreadCrumb)
        .dive()
        .find('u')
        .text()
    ).toEqual('ADD CANS');
  });

  it('renders EDIT CANS', () => {
    const breadCrumbComponent = shallow(
      <BreadCrumbsBuilder navigateTo={navigation.ASSESSMENT_EDIT} client={childInfoJson} />
    );
    expect(
      breadCrumbComponent
        .find(BreadCrumb)
        .dive()
        .find('u')
        .text()
    ).toEqual('EDIT CANS');
  });
});
