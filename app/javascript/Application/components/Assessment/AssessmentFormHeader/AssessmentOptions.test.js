import React from 'react'
import { shallow } from 'enzyme'
import AssessmentOptions from './AssessmentOptions'
import HasCaregiverQuestion from './HasCaregiverQuestion'
import CanReleaseInfoQuestion from './CanReleaseInfoQuestion'
import ConfidentialityAlert from './ConfidentialityAlert'
import { assessment as mockAssessment } from '../assessment.mocks.test'

describe('AssessmentOptions', () => {
  const render = ({
    assessment = mockAssessment,
    isDisabled = false,
    isUnderSix,
    onCanReleaseInfoChange = () => {},
    onHasCaregiverChange = () => {},
    onHasCaregiverNoClicked = () => {},
    substanceUseItemsIds = {
      underSix: [],
      aboveSix: [],
    },
  } = {}) =>
    shallow(
      <AssessmentOptions
        assessment={assessment}
        isDisabled={isDisabled}
        isUnderSix={isUnderSix}
        onCanReleaseInfoChange={onCanReleaseInfoChange}
        onHasCaregiverChange={onHasCaregiverChange}
        onHasCaregiverNoClicked={onHasCaregiverNoClicked}
        substanceUseItemsIds={substanceUseItemsIds}
      />
    )

  it('renders an enabled HasCaregiverQuestion', () => {
    const hasCaregiverQuestion = render().find(HasCaregiverQuestion)
    expect(hasCaregiverQuestion.exists()).toBe(true)
    expect(hasCaregiverQuestion.props().disabled).toBe(false)
  })

  it('renders an enabled CanReleaseInfoQuestion', () => {
    const canReleaseInfoQuestion = render().find(CanReleaseInfoQuestion)
    expect(canReleaseInfoQuestion.exists()).toBe(true)
    expect(canReleaseInfoQuestion.props().isDisabled).toBe(false)
  })

  it('renders a confidentiality alert', () => {
    const assessment = { ...mockAssessment, can_release_confidential_info: true }
    const isUnderSix = false
    const substanceUseItemsIds = { underSix: [], aboveSix: [] }

    const wrapper = render({ assessment, isUnderSix, substanceUseItemsIds })
    const alert = wrapper.find(CanReleaseInfoQuestion).props().message
    expect(alert.type).toBe(ConfidentialityAlert)
    expect(alert.props.canReleaseConfidentialInfo).toBe(true)
    expect(alert.props.isUnderSix).toBe(false)
    expect(alert.props.substanceUseItemsIds).toBe(substanceUseItemsIds)
  })

  it('calls back when caregiver option is changed', () => {
    const onHasCaregiverChangeSpy = jest.fn()
    const wrapper = render({ onHasCaregiverChange: onHasCaregiverChangeSpy })
    wrapper
      .find(HasCaregiverQuestion)
      .props()
      .onHasCaregiverChange('A')
    expect(onHasCaregiverChangeSpy).toHaveBeenCalledWith('A')
  })

  it('calls back when caregiver NO option is clicked', () => {
    const onHasCaregiverNoClickedSpy = jest.fn()
    const wrapper = render({ onHasCaregiverNoClicked: onHasCaregiverNoClickedSpy })
    wrapper
      .find(HasCaregiverQuestion)
      .props()
      .onHasCaregiverNoClicked('B')
    expect(onHasCaregiverNoClickedSpy).toHaveBeenCalledWith('B')
  })

  it('calls back when authorization changes', () => {
    const onCanReleaseInfoChange = jest.fn()
    const wrapper = render({ onCanReleaseInfoChange })
    wrapper
      .find(CanReleaseInfoQuestion)
      .props()
      .onCanReleaseInfoChange('B')
    expect(onCanReleaseInfoChange).toHaveBeenCalledWith('B')
  })

  describe('when assessment has a caregiver', () => {
    const assessment = { ...mockAssessment, has_caregiver: true }

    it('sets the HasCaregiverQuestion to Yes', () => {
      expect(
        render({ assessment })
          .find(HasCaregiverQuestion)
          .props().hasCaregiver
      ).toBe(true)
    })
  })

  describe('when assessment has no caregiver', () => {
    const assessment = { ...mockAssessment, has_caregiver: false }

    it('sets the HasCaregiverQuestion to No', () => {
      expect(
        render({ assessment })
          .find(HasCaregiverQuestion)
          .props().hasCaregiver
      ).toBe(false)
    })
  })

  describe('when the form is disabled', () => {
    it('disables the caregiver question', () => {
      expect(
        render({ isDisabled: true })
          .find(HasCaregiverQuestion)
          .props().disabled
      ).toBe(true)
    })

    it('disables the authorization question', () => {
      expect(
        render({ isDisabled: true })
          .find(CanReleaseInfoQuestion)
          .props().isDisabled
      ).toBe(true)
    })
  })
})
