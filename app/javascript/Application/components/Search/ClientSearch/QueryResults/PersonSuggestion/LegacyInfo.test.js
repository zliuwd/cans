import React from 'react'
import { shallow } from 'enzyme'
import LegacyInfo from './LegacyInfo'

describe('<LegacyInfo />', () => {
  const defaultProps = {
    legacy_ui_id: '0535-6518-8772-0001610',
  }

  describe('init LegacyInfo', () => {
    describe('page layout', () => {
      it('renders with 1 <div> element', () => {
        const wrapper = shallow(<LegacyInfo legacyUiId={defaultProps.legacy_ui_id} />)
        expect(wrapper.find('div').length).toBe(1)
      })
    })
  })

  describe('LegacyInfo', () => {
    it('renders the legacy ui id', () => {
      const wrapper = shallow(<LegacyInfo legacyUiId={defaultProps.legacy_ui_id} />)
      expect(wrapper.html()).toContain('<div>0535-6518-8772-0001610</div>')
    })

    it('does NOT render the legacy ui id when none exists', () => {
      const props = {
        legacy_ui_id: null,
      }
      const wrapper = shallow(<LegacyInfo legacyUiId={props.legacy_ui_id} />)
      expect(wrapper.html()).toBe(null)
    })
  })
})
