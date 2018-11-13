import React from 'react'
import { mount } from 'enzyme'
import DomainCaregiverControls from './DomainCaregiverControls'

describe('<DomainCaregiverControls/>', () => {
  const fakeDCCProps = {
    onAddCaregiverDomain: jest.fn(),
    onRemoveCaregiverDomain: jest.fn(),
  }

  let wrapper
  beforeEach(() => {
    wrapper = mount(<DomainCaregiverControls {...fakeDCCProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('will render 2 li', () => {
    expect(wrapper.find('li').length).toBe(2)
  })

  it('first li have text # - REMOVE CAREGIVER #', () => {
    expect(
      wrapper
        .find('li')
        .at(0)
        .text()
    ).toBe('- REMOVE CAREGIVER')
  })

  it('second li have text # + ADD CAREGIVER #', () => {
    expect(
      wrapper
        .find('li')
        .at(1)
        .text()
    ).toBe('+ ADD CAREGIVER')
  })

  it('will invoke onRemoveCaregiverDomain when first li be clicked', () => {
    wrapper
      .find('li')
      .at(0)
      .find('div')
      .simulate('click')
    expect(wrapper.props().onRemoveCaregiverDomain).toHaveBeenCalledTimes(1)
  })

  it('will invoke onRemoveCaregiverDomain when first li have key pressed', () => {
    wrapper
      .find('li')
      .at(0)
      .find('div')
      .simulate('keyPress')
    expect(wrapper.props().onRemoveCaregiverDomain).toHaveBeenCalledTimes(2)
  })

  it('will invoke onAddCaregiverDomain when second li be clicked', () => {
    wrapper
      .find('li')
      .at(1)
      .find('div')
      .simulate('click')
    expect(wrapper.props().onAddCaregiverDomain).toHaveBeenCalledTimes(1)
  })

  it('will invoke onAddCaregiverDomain when second li have key pressed', () => {
    wrapper
      .find('li')
      .at(1)
      .find('div')
      .simulate('keyPress')
    expect(wrapper.props().onAddCaregiverDomain).toHaveBeenCalledTimes(2)
  })
})
