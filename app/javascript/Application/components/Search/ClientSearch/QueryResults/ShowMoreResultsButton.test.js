import React from 'react'
import { shallow } from 'enzyme'
import { Button } from '@cwds/components'
import ShowMoreResultsButton from './ShowMoreResultsButton'

describe('<ShowMoreResultsButton />', () => {
  it('says Show More Results', () => {
    expect(
      shallow(<ShowMoreResultsButton onClick={() => {}} />)
        .find(Button)
        .props().children
    ).toBe('Show More Results')
  })

  it('calls onClick when clicked', () => {
    const onClick = jest.fn()
    const wrapper = shallow(<ShowMoreResultsButton onClick={onClick} />)
    wrapper
      .find(Button)
      .props()
      .onClick()
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('sets the button to active when highlighted', () => {
    const wrapper = shallow(<ShowMoreResultsButton isHighlighted={true} />)
    expect(wrapper.find(Button).props().active).toBe(true)
  })

  it('passes extra item props from downshift to the button', () => {
    const wrapper = shallow(<ShowMoreResultsButton onMouseEnter="foo" onMouseLeave="bar" />)
    const buttonProps = wrapper.find(Button).props()
    expect(buttonProps.onMouseEnter).toEqual('foo')
    expect(buttonProps.onMouseLeave).toEqual('bar')
  })
})
