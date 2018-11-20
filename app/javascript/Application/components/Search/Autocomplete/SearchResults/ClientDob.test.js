import React from 'react'
import ClientDob from './ClientDob'
import { shallow } from 'enzyme'
import moment from 'moment'

describe('<AgeInfo />', () => {
  describe('page layout', () => {
    const props = {
      dateOfBirth: '<em>1986-10-11</em>',
      dob: moment('1986-10-11'),
      sanitizedDob: '1986-10-11',
    }
    const wrapper = shallow(<ClientDob {...props} />)

    expect(wrapper.find('span').length).toBe(1)
  })

  describe('when dob field is the matched phrase', () => {
    describe('when the dob matches the emphasized sanitizedDob', () => {
      it('renders date of birth in bold text', () => {
        const props = {
          dateOfBirth: '<em>1986-10-11</em>',
          dob: moment('1986-10-11'),
          sanitizedDob: '1986-10-11',
        }
        const wrapper = shallow(<ClientDob {...props} />)

        expect(wrapper.find('div').html()).toBe(
          '<div><span class="client-search-matched-field">10/11/1986</span></div>'
        )
      })
    })

    describe('when the dob does not match the sanitizedDob', () => {
      it('renders the year in bold text', () => {
        const props = {
          dateOfBirth: '<em>1986</em>-10-11',
          dob: moment('1986-10-11'),
          sanitizedDob: '1986-10-11',
        }
        const wrapper = shallow(<ClientDob {...props} />)

        expect(wrapper.find('div').html()).toBe(
          '<div>10/11/<span class="client-search-matched-field">1986</span></div>'
        )
      })
    })
  })

  describe('when the dob field is not the matched phrase', () => {
    it('does not render bold text', () => {
      const props = {
        dateOfBirth: '1986-10-11',
        dob: moment('1986-10-11'),
        sanitizedDob: '1986-10-11',
      }
      const wrapper = shallow(<ClientDob {...props} />)

      expect(wrapper.find('div').html()).toBe('<div><span>10/11/1986</span></div>')
    })
  })
})
