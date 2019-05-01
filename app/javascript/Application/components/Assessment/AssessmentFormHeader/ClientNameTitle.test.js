import React from 'react'
import { shallow } from 'enzyme'
import ClientNameTitle from './ClientNameTitle'
import ClientDateOfBirth from './ClientDateOfBirth'

describe('ClientNameTitle', () => {
  const render = ({ firstName, lastName, dob, estimatedDob } = {}) =>
    shallow(<ClientNameTitle firstName={firstName} lastName={lastName} dob={dob} estimatedDob={estimatedDob} />)

  describe('when the client has no first name', () => {
    it('renders a default title', () => {
      const wrapper = render({ lastName: 'Simpson' })
      const title = wrapper.find('.card-title-block #no-data')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('Client Info')
    })
  })

  describe('when the client has no last name', () => {
    it('renders a default title', () => {
      const wrapper = render({ firstName: 'Bart' })
      const title = wrapper.find('.card-title-block #no-data')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('Client Info')
    })
  })

  it('displays no age if the date of birth is invalid', () => {
    const wrapper = render({ firstName: 'Homer', lastName: 'Simpson', dob: '3000-13-55' })
    expect(wrapper.find('#child-age').text()).toBe('')
  })

  describe('with first and last name', () => {
    let wrapper

    beforeEach(() => {
      wrapper = render({ firstName: 'Homer', lastName: 'Simpson', dob: '2018-01-01', estimatedDob: '2018-01-01' })
    })

    it('renders a title block with the name', () => {
      expect(wrapper.find('.card-title-block #child-name').text()).toBe('Simpson, Homer')
    })

    it('renders the client age', () => {
      expect(wrapper.find('.helper-text #child-age').text()).not.toBe('')
    })

    it('renders the client date of birth', () => {
      expect(
        wrapper
          .find('.helper-text #child-dob')
          .find(ClientDateOfBirth)
          .exists()
      ).toBe(true)
    })
  })
})
