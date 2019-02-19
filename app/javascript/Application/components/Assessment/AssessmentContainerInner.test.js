import React from 'react'
import { shallow } from 'enzyme'
import AssessmentContainerInner from '../Assessment/AssessmentContainerInner'
import { assessment } from './assessment.mocks.test'
import AssessmentSummaryCard from '../Assessment/AssessmentSummary/AssessmentSummaryCard'
import AssessmentFormFooter from '../Assessment/AssessmentFormFooter'
import AssessmentFormHeader from '../Assessment/AssessmentFormHeader'
import RenderWarning from '../common/RenderWarning'

const getLength = (wrapper, component) => wrapper.find(component).length

const props = {
  assessment: assessment,
  assessmentServiceStatus: 'IDLE',
  client: {},
  handleCaregiverRemove: jest.fn(),
  handleSubmitAssessment: jest.fn(),
  onEventDateFieldKeyUp: jest.fn(),
  isSubmitWarningShown: false,
  i18n: {},
  isValidForSubmit: false,
  onAssessmentUpdate: jest.fn(),
  onCancelClick: jest.fn(),
  handleSubmitWarning: jest.fn(),
  onKeyUp: jest.fn(),
  isEventDateBeforeDob: false,
}

describe('AssessmentContainerInner />', () => {
  describe('renders component and shows warning', () => {
    it('renders with 1 <AssessmentSummaryCard /> component', () => {
      const wrapper = shallow(<AssessmentContainerInner {...props} />)
      expect(getLength(wrapper, AssessmentSummaryCard)).toBe(1)
    })

    it('renders with <AssessmentFormHeader /> component initially', () => {
      const wrapper = shallow(<AssessmentContainerInner {...props} />)
      expect(getLength(wrapper, AssessmentFormHeader)).toBe(1)
    })

    it('renders without <AssessmentFormFooter /> component initially', () => {
      const wrapper = shallow(<AssessmentContainerInner {...props} />)
      expect(getLength(wrapper, AssessmentFormFooter)).toBe(0)
    })
  })

  describe('renders a component which shows warning and sets the state', () => {
    it('verify the state is updated and sets isCaregiverWarningShown to false', () => {
      const wrapper = shallow(<AssessmentContainerInner {...props} />)
      wrapper.instance().setState({
        isCaregiverWarningShown: true,
        focusedCaregiverId: 0,
      })
      wrapper
        .find(RenderWarning)
        .props()
        .handleWarningShow(false)
      wrapper.instance().handleWarningShow(false)
      expect(wrapper.state().isCaregiverWarningShown).toEqual(false)
    })

    it('verify the state is updated and sets isCaregiverWarningShown to true', () => {
      const wrapper = shallow(<AssessmentContainerInner {...props} />)
      wrapper.instance().setState({
        isCaregiverWarningShown: false,
        focusedCaregiverId: 0,
      })
      wrapper
        .find(RenderWarning)
        .props()
        .handleWarningShow(true)
      wrapper.instance().handleWarningShow(true)
      expect(wrapper.state().isCaregiverWarningShown).toEqual(true)
    })
  })

  describe('verifies if caregiver id is removed when the state is updated', () => {
    it('should set cargiver value to null', () => {
      const wrapper = shallow(<AssessmentContainerInner {...props} />)
      wrapper.instance().setState({
        isCaregiverWarningShown: true,
        focusedCaregiverId: 0,
      })
      wrapper.instance().handleWarningShow(false)
      expect(wrapper.state().isCaregiverWarningShown).toEqual(false)
      expect(wrapper.state().focusedCaregiverId).toEqual(null)
    })

    it('should update cargiver value in state', () => {
      const wrapper = shallow(<AssessmentContainerInner {...props} />)
      wrapper.instance().setState({
        isCaregiverWarningShown: true,
        focusedCaregiverId: 1,
      })
      wrapper.instance().handleWarningShow(false, 1)
      expect(wrapper.state().isCaregiverWarningShown).toEqual(false)
      expect(wrapper.state().focusedCaregiverId).toEqual(1)
    })
  })

  describe('isSubmit warning shown', () => {
    it('isSubmitWarning is false it does not renders the ConfidentialityWarning component', () => {
      const wrapper = shallow(<AssessmentContainerInner {...props} />)
      wrapper.instance().setState({
        isSubmitWarningShown: false,
      })
      const WarningShow = wrapper.find('WarningShow').dive()
      expect(WarningShow.find('ConfidentialityWarning').exists()).toBe(false)
    })

    it('isSubmitWarning is true it renders the ConfidentialityWarning component', () => {
      const wrapper = shallow(<AssessmentContainerInner {...props} />)
      wrapper.instance().setState({
        isSubmitWarningShown: true,
      })
      const WarningShow = wrapper.find('WarningShow').dive()
      expect(WarningShow.find('ConfidentialityWarning').exists()).toBe(true)
    })
  })

  describe('changes the state of the component when handleSubmitWarning is invoked', () => {
    it('sets isSubmitWarningShown to false when handleSubmitWarning is called', () => {
      const wrapper = shallow(<AssessmentContainerInner {...props} />)
      wrapper.instance().setState({
        isSubmitWarningShown: true,
      })
      wrapper
        .find('WarningShow')
        .props()
        .handleSubmitWarning(false)
      expect(wrapper.state().isSubmitWarningShown).toEqual(false)
    })

    it('sets isSubmitWarningShown to true when handleSubmitWarning is called', () => {
      const wrapper = shallow(<AssessmentContainerInner {...props} />)
      wrapper.instance().setState({
        isSubmitWarningShown: false,
      })
      wrapper
        .find('WarningShow')
        .props()
        .handleSubmitWarning(true)
      expect(wrapper.state().isSubmitWarningShown).toEqual(true)
    })

    describe('#handleExpandAllDomains()', () => {
      const wrapper = shallow(<AssessmentContainerInner {...props} />)
      it('toggles isDefaultExpanded state when called with no parameter', () => {
        wrapper.instance().setState({
          isDefaultExpanded: false,
        })
        wrapper.instance().handleExpandAllDomains()
        expect(wrapper.state().isDefaultExpanded).toEqual(true)
      })

      it('updates isDefaultExpanded state to false when called with false', () => {
        wrapper.instance().setState({
          isDefaultExpanded: true,
        })
        wrapper.instance().handleExpandAllDomains(false)
        expect(wrapper.state().isDefaultExpanded).toEqual(false)
      })
    })
  })

  describe('<AssessmentFormHeader />', () => {
    it('should set isEventDateBeforeDob prop to true', () => {
      const wrapper = shallow(<AssessmentContainerInner {...props} />)
      wrapper.setProps({ isEventDateBeforeDob: true })
      expect(wrapper.find('AssessmentFormHeader').prop('isEventDateBeforeDob')).toEqual(true)
    })

    it('should set isEventDateBeforeDob prop to false', () => {
      const wrapper = shallow(<AssessmentContainerInner {...props} />)
      expect(wrapper.find('AssessmentFormHeader').prop('isEventDateBeforeDob')).toEqual(false)
    })
  })

  describe('isEditable', () => {
    const wrapper = shallow(<AssessmentContainerInner {...props} />)

    it('should enable <AssessmentFormHeader/> when isEditable=true and disable when isEditable=false', () => {
      wrapper.setProps({ isEditable: true })
      expect(wrapper.find('AssessmentFormHeader').prop('disabled')).toEqual(false)

      wrapper.setProps({ isEditable: false })
      expect(wrapper.find('AssessmentFormHeader').prop('disabled')).toEqual(true)
    })

    it('should enable  <AssessmentSummaryCard/> when isEditable=true and disable when isEditable=false', () => {
      wrapper.setProps({ isEditable: true })
      expect(wrapper.find('AssessmentSummaryCard').prop('disabled')).toEqual(false)

      wrapper.setProps({ isEditable: false })
      expect(wrapper.find('AssessmentSummaryCard').prop('disabled')).toEqual(true)
    })

    it('should enable  <Assessment/> when isEditable=true and disable when isEditable=false', () => {
      wrapper.setProps({ isEditable: true })
      expect(wrapper.find('Assessment').prop('disabled')).toEqual(false)

      wrapper.setProps({ isEditable: false })
      expect(wrapper.find('Assessment').prop('disabled')).toEqual(true)
    })

    it('should enable  <AssessmentFormFooter/> when isEditable=true and should not be rendered when isEditable=false', () => {
      wrapper.setProps({ isEditable: false })
      expect(wrapper.find('AssessmentFormFooter').exists()).toEqual(false)
    })
  })
})
