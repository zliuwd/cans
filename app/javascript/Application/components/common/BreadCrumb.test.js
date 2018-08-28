import React from 'react';
import BreadCrumb from './breadCrumb';
import { shallow } from 'enzyme';

describe('bread crumb rendering', () => {
  let breadCrumbComp;
  it('verify breadCrumb rendering with a single node', () => {
    let props = [<a href="/dashboard"> DASHBOARD</a>];
    breadCrumbComp = shallow(<BreadCrumb navigationElements={props} />);
    expect(breadCrumbComp.find('a').length).toEqual(1);
  });

  it('verify breadCrumb rendering with two nodes', () => {
    let props = [<a href="/dashboard"> DASHBOARD</a>, <a href={'/CANS'}>CHILD YOUTH/LIST</a>];
    breadCrumbComp = shallow(<BreadCrumb navigationElements={props} />);
    expect(breadCrumbComp.find('a').length).toEqual(2);
  });
});
