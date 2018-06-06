import React from 'react';
import { mount, shallow } from 'enzyme';
import Notification from './Notification';

describe('<Notification />', () => {
  const getWrapper = () =>  shallow(<Notification />);
  const getMountWrapper = async () => await mount(<Notification />);
  const getLength = async component => {
    const wrapper = await getMountWrapper();
    const length = wrapper.find(component).length;
    wrapper.unmount();
    return length;
  };

  it('verifies the numbers of SnackbarContent', async () => {
    expect(await getLength('SnackbarContent')).toEqual(1);
    expect(await getLength('Snackbar')).toEqual(1);
    expect(await getLength('IconButton')).toEqual(1);
  });

  it('#handleClick()', async () => {
    const wrapper = await getWrapper();
    const clickWrapper = wrapper.find('Notification').dive();
    await clickWrapper.instance().handleClick();
    expect(clickWrapper.state('open')).toEqual(true);
  });
});
