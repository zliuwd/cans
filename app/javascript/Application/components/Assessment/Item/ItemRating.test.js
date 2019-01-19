import React from 'react'
import { mount } from 'enzyme'
import ItemRating from './ItemRating'

describe('<ItemRating />', () => {
  const defaultProps = {
    itemCode: 'FAMILY_STRENGTHS',
    onRatingUpdate: () => {},
    rating: -1,
    shortType: 'reg',
    type: 'regular',
  }

  const render = props => mount(<ItemRating {...defaultProps} {...props} />)

  describe('with several options', () => {
    const options = ['Hello', 'Hi', 'Salutations', 'Good Evening', 'Howdy']
    let wrapper

    beforeEach(() => {
      wrapper = render({ options })
    })

    it('renders a radio button for each option', () => {
      expect(wrapper.find('Radio').length).toBe(5)
    })

    it('labels each radio button correctly', () => {
      options.forEach((option, i) => {
        expect(
          wrapper
            .find('FormControlLabel')
            .at(i)
            .text()
        ).toBe(option)
      })
    })
  })

  it('calls onRatingUpdate when a rating is selected', () => {
    const onRatingUpdate = jest.fn()
    const wrapper = render({ options: ['To Be', 'Not To Be'], onRatingUpdate })

    const event = { target: { value: 0 } }
    wrapper
      .find('RadioGroup')
      .at(0)
      .props()
      .onChange(event)
    expect(onRatingUpdate).toHaveBeenCalledWith(event)
  })

  describe('when disabled', () => {
    const options = ['Hello', 'Hi', 'Salutations']
    let wrapper

    beforeEach(() => {
      wrapper = render({ options, disabled: true })
    })

    it('renders a disabled radio button for each option', () => {
      expect(wrapper.find('Radio[disabled=true]').length).toBe(3)
    })

    it('propagates disabled prop to <FormControl />', () => {
      wrapper.find('FormControl').forEach(control => {
        expect(control.props().disabled).toBe(true)
      })
    })
  })
})
