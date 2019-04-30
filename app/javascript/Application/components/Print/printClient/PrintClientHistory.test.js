import React from 'react'
import { shallow } from 'enzyme'
import PrintClientHistory from './PrintClientHistory'
import { assessment } from '../../Assessment/assessment.mocks.test'

const assessments = [assessment]
const defaultProps = { assessments }
const render = (props = defaultProps) => shallow(<PrintClientHistory {...props} />)
const defaultWrapper = render()

describe('<PrintClientHistory/>', () => {
  it('renders title', () => {
    const find = defaultWrapper.find('#print-client-history-header')
    expect(find.exists()).toBeTruthy()
    expect(find.text()).toContain('Assessment History')
  })
})
