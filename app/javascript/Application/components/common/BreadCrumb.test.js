import React from 'react';
import BreadCrumb from './breadCrumb';
import { shallow } from 'enzyme';

describe('bread crumb rendering', () => {
  let breadCrumbComponent;
  it('verify breadCrumb rendering with a single node', () => {
    let props = [
      <a key="" href="/dashboard">
        {' '}
        DASHBOARD
      </a>,
    ];
    breadCrumbComponent = shallow(<BreadCrumb navigationElements={props} />);
    expect(breadCrumbComponent.find('a').length).toEqual(2);
  });

  it('verify breadCrumb rendering with two nodes', () => {
    let props = [
      <a key="" href="/dashboard">
        {' '}
        DASHBOARD
      </a>,
      <a key="" href={'/CANS'}>
        CHILD YOUTH/LIST
      </a>,
    ];
    breadCrumbComponent = shallow(<BreadCrumb navigationElements={props} />);
    expect(breadCrumbComponent.find('a').length).toEqual(3);
  });
});
