import React from 'react'
import { shallow } from 'enzyme'
import AkaInfo from './AkaInfo'

describe('<AkaInfo />', () => {
  it('renders an AKA div when matching AKA exists', () => {
    const props = {
      aka: {
        id: 'MYl4QKc0Ki',
        name_type: 'AKA',
        first_name: 'James',
        last_name: 'Doolittle',
      },
    }
    const wrapper = shallow(<AkaInfo {...props} />)
    const aka = wrapper.find('div.aka-info')
    expect(aka.html()).toBe(
      '<div class="aka-info">' +
        '<div class="search-item-header">AKA</div>' +
        '<div class="search-item">James Doolittle</div></div>'
    )
  })

  it('does not render AKA div when no matching AKA', () => {
    const props = { aka: null }
    const wrapper = shallow(<AkaInfo {...props} />)
    expect(wrapper.find('div.aka-info').exists()).toBe(false)
  })

  it('does not render AKA div when aka is empty object', () => {
    const props = { aka: {} }
    const wrapper = shallow(<AkaInfo {...props} />)
    expect(wrapper.find('div.aka-info').exists()).toBe(false)
  })
})
