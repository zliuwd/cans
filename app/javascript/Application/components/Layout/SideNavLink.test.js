import React, { ErrorBoun } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import { SideNavLink } from './index';

describe('active <SideNavLink />', () => {
  const getWrapper = active =>
    mount(
      <MemoryRouter>
        <SideNavLink
          active={active}
          href={'/records'}
          text={'Records'}
          onClick={jest.fn()}
        />
      </MemoryRouter>
    );

  it('renders with active css class', () => {
    expect(getWrapper(true).find('#side-nav').hasClass('active')).toBe(true);
  });

  it('renders with no active css class', () => {
    expect(getWrapper(false).find('#side-nav').hasClass('active')).toBe(false);
  });
});

describe('<SideNavLink /> text', () => {
  it('should display text thats passed in', () => {
    const wrapper = mount(
      <MemoryRouter>
        <SideNavLink
          active={true}
          text={'Reports'}
          href={'/reports'}
          onClick={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(wrapper.find('#side-nav').text()).toBe('Reports');
    expect(wrapper.find('#side-nav').text()).not.toBe('Report');
  });
});

describe('<SideNavLink /> onClick', () => {
  it('should call onClick when clicked', () => {
    const onClickFunc = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <SideNavLink
          active={false}
          text={'Reports'}
          href={'/records'}
          onClick={onClickFunc}
        />
      </MemoryRouter>
    );
    wrapper.simulate('click');
    expect(onClickFunc).toBeCalled();
  });
});
