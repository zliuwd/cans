import React from 'react'
import Typography from '@material-ui/core/Typography'
import ItemQtcDescriptions from './ItemQtcDescriptions'
import { mount } from 'enzyme'

const fakeProps = {
  qtcDescriptions: ['first', 'second'],
}

describe('<ItemQtcDescriptions  />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<ItemQtcDescriptions {...fakeProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('will render title # Questions to Consider: #', () => {
    const target = wrapper.find(Typography)
    expect(target.at(0).text()).toBe('Questions to Consider:')
  })

  it('will render <li/> with certain amount based on QtcDescriptions amount', () => {
    const target = wrapper.find('li')
    expect(target.length).toBe(fakeProps.qtcDescriptions.length)
  })

  it('will render <li/> with certain content based on QtcDescriptions content', () => {
    const target = wrapper.find('li')
    expect(target.at(0).text()).toBe(fakeProps.qtcDescriptions[0])
    expect(target.at(1).text()).toBe(fakeProps.qtcDescriptions[1])
  })
})
