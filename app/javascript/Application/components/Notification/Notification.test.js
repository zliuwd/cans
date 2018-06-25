import React from 'react';
import { mount, shallow } from 'enzyme';
import Notification from './Notification';

describe('<Notification />', () => {
  const getWrapper = () => shallow(<Notification />);
  const getMountWrapper = () => mount(<Notification />);
  const getLength = component => {
    const wrapper = getMountWrapper();
    const length = wrapper.find(component).length;
    wrapper.unmount();
    return length;
  };

  it('verifies the numbers of SnackbarContent', () => {
    expect(getLength('SnackbarContent')).toEqual(1);
    expect(getLength('Snackbar')).toEqual(1);
    expect(getLength('IconButton')).toEqual(1);
  });

  it('#handleClick() on open true', () => {
    const wrapper = getWrapper();
    const clickWrapper = wrapper.find('Notification').dive();
    clickWrapper.instance().handleClick();
    expect(clickWrapper.state('open')).toEqual(true);
  });

  it('#handleClose() on open false ', () => {
    const wrapper = getWrapper();
    const clickWrapper = wrapper.find('Notification').dive();
    clickWrapper.instance().handleClose();
    expect(clickWrapper.state('open')).toEqual(false);
  });
});
