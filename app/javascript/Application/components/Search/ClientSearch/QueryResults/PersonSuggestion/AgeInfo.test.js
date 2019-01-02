import React from 'react'
import AgeInfo from './AgeInfo'
import ClientDob from './ClientDob'
import { shallow } from 'enzyme'
import moment from 'moment'

describe('<AgeInfo />', () => {
  describe('page layout', () => {
    it('renders with 1 <div> element', () => {
      const props = { dateOfBirth: '1989-11-01' }
      const wrapper = shallow(<AgeInfo {...props} />)
      expect(wrapper.find('div.date-of-birth').length).toBe(1)
    })

    it('renders with 1 ClientDob component', () => {
      const props = { dateOfBirth: '1989-11-01' }
      const wrapper = shallow(<AgeInfo {...props} />)
      expect(wrapper.find(ClientDob).exists()).toBe(true)
    })

    it('renders with 1 <span> elements', () => {
      const props = { dateOfBirth: '1989-11-01' }
      const wrapper = shallow(<AgeInfo {...props} />)
      expect(wrapper.find('span').length).toBe(1)
    })
  })

  describe('age info', () => {
    it('renders info when DOB is present', () => {
      const props = { dateOfBirth: '1989-11-01' }
      const wrapper = shallow(<AgeInfo {...props} />)
      expect(wrapper.html()).toContain(
        '<div class="highlighted date-of-birth"><div><span>11/1/1989</span></div><span><strong> (29 years)</strong></span></div>'
      )
    })

    it('does NOT render info when DOB is NOT present', () => {
      const props = { dateOfBirth: null }
      const wrapper = shallow(<AgeInfo {...props} />)
      expect(wrapper.html()).toBe(null)
    })

    it('renders 0 years when DOB is less than 1 year from today', () => {
      const formattedDob = moment()
        .subtract(1, 'months')
        .format('M/D/YYYY')
      const props = {
        dateOfBirth: moment()
          .subtract(1, 'months')
          .format('YYYY-MM-DD'),
      }
      const wrapper = shallow(<AgeInfo {...props} />)
      expect(wrapper.html()).toContain(
        `<div class="highlighted date-of-birth"><div><span>${formattedDob}</span></div><span><strong> (0 years)</strong></span></div>`
      )
    })

    it('renders 1 year when DOB is 1 year in the past', () => {
      const formattedDob = moment()
        .subtract(1, 'years')
        .format('M/D/YYYY')
      const props = {
        dateOfBirth: moment()
          .subtract(1, 'years')
          .format('YYYY-MM-DD'),
      }
      const wrapper = shallow(<AgeInfo {...props} />)
      expect(wrapper.html()).toContain(
        `<div class="highlighted date-of-birth"><div><span>${formattedDob}</span></div><span><strong> (1 year)</strong></span></div>`
      )
    })
  })
})
