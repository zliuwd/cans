import React from 'react'
import { shallow } from 'enzyme'
import ClientAssessmentHistoryTableEllipsis from './ClientAssessmentHistoryTableEllipsis'

const getWrapper = props => shallow(<ClientAssessmentHistoryTableEllipsis {...props} />)

describe('ClientAssessmentHistoryTableEllipsis', () => {
  it('renders an Ellipsis when passed a valid assessment id', () => {
    const props = {
      original: {
        id: 1,
        person: { identifier: '123' },
        inheritUrl: '/staff/0X5',
      },
    }
    const wrapper = getWrapper(props)

    expect(wrapper.find('Ellipsis').exists()).toBe(true)
  })

  it('renders null if props are null ', () => {
    const props = {
      original: { id: null, person: null },
    }
    const wrapper = getWrapper(props)

    expect(wrapper.find('Ellipsis').exists()).toBe(false)
  })
})
