import React from 'react'
import { shallow } from 'enzyme'
import Tooltip from '@material-ui/core/Tooltip'
import SummaryHeader from './SummaryHeader'

describe('<SummaryHeader />', () => {
  const render = (title, tooltip) => shallow(<SummaryHeader title={title} tooltip={tooltip} />)

  it('has a title', () => {
    expect(render('Hello World', '(>")>').text()).toContain('Hello World')
  })

  it('has a tooltip', () => {
    const header = render('(^"^)', 'Hello Tooltip')
    const tooltip = header.find(Tooltip)
    expect(tooltip.exists()).toBe(true)
    expect(tooltip.props().title).toBe('Hello Tooltip')
    expect(tooltip.props().placement).toBe('top')
    expect(tooltip.props().children).toEqual(<i className="fa fa-info-circle assessment-summary-help-icon" />)
  })
})
