import React from 'react'
import AddressInfo from './AddressInfo'
import { shallow } from 'enzyme'

const props = {
  city: 'Sacramento',
  state: 'CA',
  zip: '95834',
  streetAddress: '1234 Hansons Way',
  type: 'Home',
}

describe('<AddressInfo />', () => {
  describe('init AddressInfo', () => {
    describe('page layout', () => {
      it('renders with 1 <div> element', () => {
        const wrapper = shallow(<AddressInfo {...props} />)

        expect(wrapper.find('div').exists()).toBe(true)
      })

      it('renders with 1 <span> element', () => {
        const wrapper = shallow(<AddressInfo {...props} />)

        expect(wrapper.find('span').exists()).toBe(true)
      })
    })
  })

  describe('renders address info', () => {
    it('renders the address', () => {
      const wrapper = shallow(<AddressInfo {...props} />)

      expect(wrapper.find('span').text()).toEqual('1234 Hansons Way Sacramento, CA 95834')
    })

    it('renders the address without city', () => {
      const propsWithoutCity = {
        city: null,
        state: 'CA',
        zip: '95834',
        streetAddress: '1234 Hansons Way',
        type: 'Home',
      }
      const wrapper = shallow(<AddressInfo {...propsWithoutCity} />)

      expect(wrapper.find('span').text()).toEqual('1234 Hansons Way CA 95834')
    })

    it('renders the address without state', () => {
      const propsWithoutState = {
        city: 'Sacramento',
        state: null,
        zip: '95834',
        streetAddress: '1234 Hansons Way',
        type: 'Home',
      }
      const wrapper = shallow(<AddressInfo {...propsWithoutState} />)

      expect(wrapper.find('span').text()).toEqual('1234 Hansons Way Sacramento, 95834')
    })

    it('renders the address without zip', () => {
      const propsWithoutZip = {
        city: 'Sacramento',
        state: 'CA',
        zip: null,
        streetAddress: '1234 Hansons Way',
        type: 'Home',
      }
      const wrapper = shallow(<AddressInfo {...propsWithoutZip} />)

      expect(wrapper.find('span').text()).toEqual('1234 Hansons Way Sacramento, CA')
    })

    it('renders the address without streetAddress', () => {
      const propsWithoutStreetAddress = {
        city: 'Sacramento',
        state: 'CA',
        zip: '95834',
        streetAddress: null,
        type: 'Home',
      }
      const wrapper = shallow(<AddressInfo {...propsWithoutStreetAddress} />)

      expect(wrapper.find('span').text()).toEqual('Sacramento, CA 95834')
    })

    it('renders the address without type', () => {
      const propsWithoutType = {
        city: 'Sacramento',
        state: 'CA',
        zip: '95834',
        streetAddress: '1234 Hansons Way',
        type: null,
      }
      const wrapper = shallow(<AddressInfo {...propsWithoutType} />)

      expect(wrapper.find('span').text()).toEqual('1234 Hansons Way Sacramento, CA 95834')
    })
  })
})
