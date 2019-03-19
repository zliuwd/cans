import React from 'react'
import { shallow } from 'enzyme'
import { Icon } from '@cwds/components'
import Tooltip from '@material-ui/core/Tooltip'
import DataGridHeader from './DataGridHeader'

describe('<DataGridHeader />', () => {
  const render = (title, tooltip) => shallow(<DataGridHeader title={title} tooltip={tooltip} />)

  it('has a title', () => {
    expect(render('Hello World', '(>")>').text()).toContain('Hello World')
  })

  it('has a tooltip', () => {
    const header = render('(^"^)', 'Hello Tooltip')
    const tooltip = header.find(Tooltip)
    expect(tooltip.exists()).toBe(true)
    expect(tooltip.props().title).toBe('Hello Tooltip')
    expect(tooltip.props().placement).toBe('top')

    const icon = tooltip.props().children
    expect(icon.type).toBe(Icon)
    expect(icon.props.icon).toBe('info-circle')
    expect(icon.props.className).toBe('data-grid-header-help-icon')
  })

  it('renders no Tooltip when not needed', () => {
    const header = render('(^"^)')
    expect(header.find(Tooltip).exists()).toBeFalsy()
  })
})
