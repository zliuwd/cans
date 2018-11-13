import React from 'react'
import { mount } from 'enzyme'
import DomainScore from './DomainScore'
import { Badge } from '@cwds/components'

describe('<DomainScore/>', () => {
  const fakeDSNumberProps = {
    totalScore: 5,
  }
  const fakeDSStringProps = {
    totalScore: '-',
  }

  let wrapper
  afterEach(() => {
    wrapper.unmount()
  })

  it('will render 1 Typography', () => {
    wrapper = mount(<DomainScore {...fakeDSNumberProps} />)
    expect(wrapper.find('Typography').length).toBe(1)
  })

  it('Typography will have text # Domain Total: #', () => {
    wrapper = mount(<DomainScore {...fakeDSNumberProps} />)
    expect(wrapper.find('Typography').text()).toContain('Domain Total')
  })

  it('will render 1 Badge', () => {
    wrapper = mount(<DomainScore {...fakeDSNumberProps} />)
    expect(wrapper.find(Badge).length).toBe(1)
  })

  it('will render a string of number when have number prop', () => {
    wrapper = mount(<DomainScore {...fakeDSNumberProps} />)
    expect(wrapper.find(Badge).text()).toBe('5')
  })

  it('will render a pure string when have string prop', () => {
    wrapper = mount(<DomainScore {...fakeDSStringProps} />)
    expect(wrapper.find(Badge).text()).toBe('-')
  })
})
