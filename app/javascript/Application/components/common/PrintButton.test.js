import React from 'react'
import { shallow } from 'enzyme'
import PrintButton from './PrintButton'
import { Print } from '../Print'

describe('PrintButton', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PrintButton className="custom-print-button" node={<div>{'change log'}</div>} />)
  })

  it('renders a print button', () => {
    expect(wrapper.find('button.print-button').exists()).toBe(true)
  })

  it('renders a font awesome print icon', () => {
    expect(wrapper.find('i.fa-print').exists()).toBe(true)
  })

  it('renders a span with the text "Print"', () => {
    const span = wrapper.find('button.print-button').find('span')
    expect(span.exists()).toBe(true)
    expect(span.text()).toBe('Print')
  })

  describe('shouldPrintNow is true', () => {
    it('renders a Print component', () => {
      wrapper.setState({ shouldPrintNow: true })
      expect(wrapper.find(Print).exists()).toBe(true)
    })
  })

  describe('shouldPrintNow is false', () => {
    it('does not renders a Print component', () => {
      wrapper.setState({ shouldPrintNow: false })
      expect(wrapper.find(Print).exists()).toBe(false)
    })
  })
})
