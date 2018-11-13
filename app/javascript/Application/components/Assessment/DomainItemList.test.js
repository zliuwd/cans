import React from 'react'
import { mount } from 'enzyme'
import DomainItemList from './DomainItemList'
import Item from './Item'

describe('<DomainItemList/>', () => {
  const fakeItemListProps = {
    items: [{ code: 'code1' }, { code: 'code2' }],
    caregiverIndex: 'a',
    i18nAll: { i18nkey: 'i18nvalue' },
    isAssessmentUnderSix: false,
    canReleaseConfidentialInfo: true,
    onConfidentialityUpdate: () => {
      return 'onConfidentialityUpdate haveBeenCalled'
    },
    onRatingUpdate: () => {
      return 'onRatingUpdate haveBeenCalled'
    },
  }

  let wrapper
  beforeEach(() => {
    wrapper = mount(<DomainItemList {...fakeItemListProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('will render a div for each Item', () => {
    expect(wrapper.find('div').length).toBe(2)
  })

  it('will render a Item for each item in the props', () => {
    expect(wrapper.find('Item').length).toBe(2)
  })

  it('will render a Divider for each Item', () => {
    expect(wrapper.find('Divider').length).toBe(2)
  })

  it('will render Item with right props', () => {
    const target = wrapper
      .find(Item)
      .at(0)
      .props()
    expect(target.canReleaseConfidentialInfo).toBe(true)
    expect(target.caregiverIndex).toBe('a')
    expect(target.i18n).toEqual({})
    expect(target.isAssessmentUnderSix).toBe(false)
    expect(target.item).toEqual({ code: 'code1' })
    expect(target.onConfidentialityUpdate()).toBe('onConfidentialityUpdate haveBeenCalled')
    expect(target.onRatingUpdate()).toBe('onRatingUpdate haveBeenCalled')
  })
})
