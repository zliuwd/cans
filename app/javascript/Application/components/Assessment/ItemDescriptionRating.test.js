import React from 'react'
import { mount } from 'enzyme'
import ItemDescriptionRating from './ItemDescriptionRating'

describe('<ItemDescriptionRating/>', () => {
  const fakeRegularWithNa = {
    code: 'ItemDescriptionTest',
    ratingDescriptions: ['RegOne', 'RegTwo', 'RegThree', 'RegFour'],
    isBooleanRating: false,
    rating: 2,
    isNaOption: true,
    handleRatingChange: () => {},
    getRadioValueForLabel: () => {},
  }

  const fakeRegularWithOutNa = {
    code: 'ItemDescriptionTest',
    ratingDescriptions: ['RegOne', 'RegTwo', 'RegThree', 'RegFour'],
    isBooleanRating: false,
    rating: 2,
    isNaOption: false,
    handleRatingChange: () => {},
    getRadioValueForLabel: () => {},
  }

  const fakeBoolWithoutNa = {
    code: 'ItemDescriptionTest',
    ratingDescriptions: ['Bool1', 'Bool2'],
    isBooleanRating: true,
    rating: 1,
    isNaOption: false,
    handleRatingChange: () => {},
    getRadioValueForLabel: () => {},
  }
  const regularRatingTotal = 4
  const regularRatingWithNaTotal = 5
  const boolRatingTotal = 2

  describe('Regular Rating without Na option', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(<ItemDescriptionRating {...fakeRegularWithOutNa} />)
    })

    it('will render totally four radio buttons', () => {
      expect(wrapper.find('Radio').length).toBe(regularRatingTotal)
    })

    it('has first label is not N/A but RegOne ', () => {
      expect(
        wrapper
          .find('FormControlLabel')
          .at(0)
          .find('Typography')
          .at(0)
          .text()
      ).toBe(' = RegOne')
    })
  })

  describe('Regular Rating with Na option', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(<ItemDescriptionRating {...fakeRegularWithNa} />)
    })

    it('will render totally five radio buttons', () => {
      expect(wrapper.find('Radio').length).toBe(regularRatingWithNaTotal)
    })

    it('will render four regular rating radio buttons with right labels', () => {
      expect(
        wrapper
          .find('FormControlLabel')
          .at(1)
          .find('Typography')
          .at(0)
          .text()
      ).toBe(' = RegOne')
      expect(
        wrapper
          .find('FormControlLabel')
          .at(2)
          .find('Typography')
          .at(0)
          .text()
      ).toBe(' = RegTwo')
      expect(
        wrapper
          .find('FormControlLabel')
          .at(3)
          .find('Typography')
          .at(0)
          .text()
      ).toBe(' = RegThree')
      expect(
        wrapper
          .find('FormControlLabel')
          .at(4)
          .find('Typography')
          .at(0)
          .text()
      ).toBe(' = RegFour')
    })

    it('will render a Radio with N/A as first label', () => {
      expect(
        wrapper
          .find('FormControlLabel')
          .first()
          .find('Typography')
          .first()
          .text()
      ).toBe('N/A')
    })
  })

  describe('Boolean Rating without Na option', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(<ItemDescriptionRating {...fakeBoolWithoutNa} />)
    })

    it('will render totally two boolean radio buttons', () => {
      expect(wrapper.find('Radio').length).toBe(boolRatingTotal)
    })

    it('will render two boolean rating radio buttons with right labels', () => {
      expect(
        wrapper
          .find('FormControlLabel')
          .at(0)
          .find('Typography')
          .at(0)
          .text()
      ).toBe(' = Bool1')
      expect(
        wrapper
          .find('FormControlLabel')
          .at(1)
          .find('Typography')
          .at(0)
          .text()
      ).toBe(' = Bool2')
    })
  })
})
