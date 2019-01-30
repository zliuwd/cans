import React from 'react'
import ConfidentialityWarning from './ConfidentialityWarning'
import { shallow } from 'enzyme'

describe('<ConfidentialityWarning />', () => {
  const defaultProps = {
    nextStepButtonLabel: 'Remove',
    onCancel: () => {},
    onNextStep: () => {},
    description: 'test description',
    title: 'Warning',
    warningDescription: 'test warning description',
    cancelButtonLabel: 'Cancel',
  }

  describe('PageModal presence trigger', () => {
    const props = { ...defaultProps }
    it('It renders the PageModal', () => {
      const wrapper = shallow(<ConfidentialityWarning {...props} />)
      expect(wrapper.length).toBe(1)
    })
  })

  describe('Warning content', () => {
    it('verify title', () => {
      const props = { ...defaultProps }
      const wrapper = shallow(<ConfidentialityWarning {...props} />)
      expect(wrapper.find('PageModal').prop('title')).toBeDefined()
    })

    it('verify Description', () => {
      const props = { ...defaultProps }
      const wrapper = shallow(<ConfidentialityWarning {...props} />)
      expect(wrapper.find('PageModal').prop('description')).toBeDefined()
    })

    it('verify warning description', () => {
      const props = { ...defaultProps }
      const wrapper = shallow(<ConfidentialityWarning {...props} />)
      expect(wrapper.find('PageModal').prop('warningDescription')).toBeDefined()
    })
  })

  describe('Warning Labels', () => {
    it('verify cancel button label', () => {
      const props = { ...defaultProps }
      const wrapper = shallow(<ConfidentialityWarning {...props} />)
      expect(wrapper.find('PageModal').prop('cancelButtonLabel')).toBeDefined()
    })

    it('verify remove button label', () => {
      const props = { ...defaultProps }
      const wrapper = shallow(<ConfidentialityWarning {...props} />)
      expect(wrapper.find('PageModal').prop('nextStepButtonLabel')).toBeDefined()
    })
  })

  describe('PageModal buttons', () => {
    it('verify cancel button render', () => {
      const wrapper = shallow(<ConfidentialityWarning {...defaultProps} />)
      const onCancel = wrapper.find('PageModal').props('onCancel')
      expect(onCancel).toBeDefined()
    })

    it('verify remove button render', () => {
      const wrapper = shallow(<ConfidentialityWarning {...defaultProps} />)
      const onNextStep = wrapper.find('PageModal').props('onNextStep')
      expect(onNextStep).toBeDefined()
    })
  })
})
