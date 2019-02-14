import React from 'react'
import { shallow } from 'enzyme'
import PersonSuggestion from './PersonSuggestion'
import FullName from './FullName'
import Gender from './Gender'
import AgeInfo from './AgeInfo'
import LanguageInfo from './LanguageInfo'
import LegacyInfo from './LegacyInfo'
import AddressInfo from './AddressInfo'

describe('<PersonSuggestion />', () => {
  const defaultProps = {
    fullName: 'Reap, Casey Aaron',
    dateOfBirth: '<em>1987-11-21</em>',
    gender: 'male',
    address: {
      city: 'Quincy',
      state: 'CA',
      zip: '95671',
      streetAddress: '5462 Delladonna Avenue',
      type: 'Home',
    },
    languages: ['English', 'American Sign Language'],
    legacyDescriptor: {
      legacy_last_updated: '2018-07-24T15:08:37.948-0700',
      legacy_id: '0r37QVX0Bv',
      legacy_ui_id: '0048-6011-3929-9000739',
      legacy_table_name: 'CLIENT_T',
      legacy_table_description: 'Client',
    },
    clientCounties: ['Plumas'],
  }

  describe('page layout', () => {
    it('renders a font awesome user avatar', () => {
      const wrapper = shallow(<PersonSuggestion {...defaultProps} />)
      expect(wrapper.find('i.fa-user').length).toBe(1)
    })

    it('renders a <FullName /> component', () => {
      const wrapper = shallow(<PersonSuggestion {...defaultProps} />)
      expect(wrapper.find(FullName).exists()).toBe(true)
    })

    it('renders a <Gender /> component', () => {
      const wrapper = shallow(<PersonSuggestion {...defaultProps} />)
      expect(wrapper.find(Gender).exists()).toBe(true)
    })

    it('renders an <AgeInfo /> component', () => {
      const wrapper = shallow(<PersonSuggestion {...defaultProps} />)
      expect(wrapper.find(AgeInfo).exists()).toBe(true)
    })

    it('renders a <LanguageInfo /> component', () => {
      const wrapper = shallow(<PersonSuggestion {...defaultProps} />)
      expect(wrapper.find(LanguageInfo).exists()).toBe(true)
    })

    it('renders a <LegacyInfo /> component', () => {
      const wrapper = shallow(<PersonSuggestion {...defaultProps} />)
      expect(wrapper.find(LegacyInfo).exists()).toBe(true)
    })

    it('renders an <AddressInfo /> component', () => {
      const wrapper = shallow(<PersonSuggestion {...defaultProps} />)
      expect(wrapper.find(AddressInfo).exists()).toBe(true)
    })
  })

  describe('information flags', () => {
    describe('sensitive flag', () => {
      it('renders a sensitive flag', () => {
        const props = {
          isSensitive: true,
          isSealed: false,
          ...defaultProps,
        }
        const wrapper = shallow(<PersonSuggestion {...props} />)
        expect(wrapper.find('div.information-flag.image-caption').html()).toBe(
          '<div class="information-flag image-caption">Sensitive</div>'
        )
      })

      it('does not render a sensitive flag', () => {
        const props = {
          isSensitive: false,
          isSealed: false,
          ...defaultProps,
        }
        const wrapper = shallow(<PersonSuggestion {...props} />)
        expect(wrapper.find('div.information-flag.image-caption').exists()).toBe(false)
      })
    })

    describe('sealed flag', () => {
      it('renders a sealed flag', () => {
        const props = {
          isSensitive: false,
          isSealed: true,
          ...defaultProps,
        }
        const wrapper = shallow(<PersonSuggestion {...props} />)
        expect(wrapper.find('div.information-flag.image-caption').html()).toBe(
          '<div class="information-flag image-caption">Sealed</div>'
        )
      })

      it('does not render a sealed flag', () => {
        const props = {
          isSensitive: false,
          isSealed: false,
          ...defaultProps,
        }
        const wrapper = shallow(<PersonSuggestion {...props} />)
        expect(wrapper.find('div.information-flag.image-caption').exists()).toBe(false)
      })
    })
  })
})
