import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'
import StaffNameLink from './StaffNameLink'

describe('<StaffNameLink />', () => {
  const render = (original, row) => shallow(<StaffNameLink row={row} original={original} />)

  it('renders a link to the case load dashboard of the person', () => {
    const wrapper = render({ staff_person: { identifier: 'ABC' } }, { staffName: 'Cassel, Jory', clients_count: 1 })
    const link = wrapper.find(Link)
    expect(link.exists()).toBe(true)
    expect(link.props().to).toBe('/staff/ABC')
  })

  it('renders the accessed name as the text of the link', () => {
    const wrapper = render({ staff_person: { identifier: 'ABC' } }, { staffName: 'Cassel, Jory', clients_count: 1 })
    const link = wrapper.find(Link)
    expect(link.exists()).toBe(true)
    expect(link.props().children).toBe('Cassel, Jory')
  })

  it('does not render a link to case load if staff has 0 clients', () => {
    const wrapper = render({ staff_person: { identifier: 'ABC' } }, { staffName: 'Cassel, Jory', clients_count: 0 })
    const link = wrapper.find(Link)
    expect(link.exists()).toBe(false)
  })

  it('renders the staff name as simple text if staff has 0 clients', () => {
    const wrapper = render({ staff_person: { identifier: 'ABC' } }, { staffName: 'Cassel, Jory', clients_count: 0 })
    expect(wrapper.text()).toBe('Cassel, Jory')
  })
})
