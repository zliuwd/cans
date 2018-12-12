import React from 'react'
import { mount } from 'enzyme'
import ItemDescriptionRating from './ItemDescriptionRating'

describe('<ItemDescriptionRating />', () => {
  const fakeRegularWithNa = {
    code: 'ItemDescriptionTest',
    ratingDescriptions: ['RegOne', 'RegTwo', 'RegThree', 'RegFour', 'RegNA'],
    isBooleanRating: false,
    rating: 2,
    hasNaOption: true,
    handleRatingChange: () => {},
  }

  const fakeRegularWithOutNa = {
    code: 'ItemDescriptionTest',
    ratingDescriptions: ['RegOne', 'RegTwo', 'RegThree', 'RegFour'],
    isBooleanRating: false,
    rating: 2,
    hasNaOption: false,
    handleRatingChange: () => {},
  }

  const fakeBoolWithNa = {
    code: 'ItemDescriptionTest',
    ratingDescriptions: ['-NO- description', '-YES- description', '-N/A- Description'],
    isBooleanRating: true,
    rating: 1,
    hasNaOption: true,
    handleRatingChange: () => {},
  }

  const fakeBoolWithoutNa = {
    code: 'ItemDescriptionTest',
    ratingDescriptions: ['Bool1', 'Bool2'],
    isBooleanRating: true,
    rating: 1,
    hasNaOption: false,
    handleRatingChange: () => {},
  }

  const findLabelText = (wrapper, index) =>
    wrapper
      .find('FormControlLabel')
      .at(index)
      .find('Typography')
      .at(0)
      .text()

  describe('Regular Rating without Na option', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(<ItemDescriptionRating {...fakeRegularWithOutNa} />)
    })

    it('will render totally four radio buttons', () => {
      expect(wrapper.find('Radio').length).toBe(4)
    })

    it('has first label is not N/A but RegOne ', () => {
      expect(findLabelText(wrapper, 0)).toBe('0 = RegOne')
    })
  })

  describe('Regular Rating with Na option', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(<ItemDescriptionRating {...fakeRegularWithNa} />)
    })

    it('will render totally five radio buttons', () => {
      expect(wrapper.find('Radio').length).toBe(5)
    })

    it('will render four regular rating radio buttons with right labels', () => {
      expect(findLabelText(wrapper, 1)).toBe('0 = RegOne')
      expect(findLabelText(wrapper, 2)).toBe('1 = RegTwo')
      expect(findLabelText(wrapper, 3)).toBe('2 = RegThree')
      expect(findLabelText(wrapper, 4)).toBe('3 = RegFour')
    })

    it('will render a Radio with N/A as first label', () => {
      expect(findLabelText(wrapper, 0)).toBe('N/A = RegNA')
    })
  })

  describe('Boolean Rating without Na option', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(<ItemDescriptionRating {...fakeBoolWithoutNa} />)
    })

    it('will render totally two boolean radio buttons', () => {
      expect(wrapper.find('Radio').length).toBe(2)
    })

    it('will render two boolean rating radio buttons with right labels', () => {
      expect(findLabelText(wrapper, 0)).toBe('No = Bool1')
      expect(findLabelText(wrapper, 1)).toBe('Yes = Bool2')
    })
  })

  describe('Boolean Rating with NA option', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(<ItemDescriptionRating {...fakeBoolWithNa} />)
    })

    it('will render totally three radio buttons', () => {
      expect(wrapper.find('Radio').length).toBe(3)
    })

    it('will render radio buttons with respective labels', () => {
      expect(findLabelText(wrapper, 0)).toBe('N/A = -N/A- Description')
      expect(findLabelText(wrapper, 1)).toBe('No = -NO- description')
      expect(findLabelText(wrapper, 2)).toBe('Yes = -YES- description')
    })
  })
})
