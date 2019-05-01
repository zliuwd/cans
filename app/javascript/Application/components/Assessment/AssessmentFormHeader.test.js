import React from 'react'
import { shallow } from 'enzyme'
import { AssessmentFormHeader } from './index'
import { assessment as assessmentMock, client as clientMock } from './assessment.mocks.test'
import { clone } from '../../util/common'
import ConductedBy from './AssessmentFormHeader/ConductedBy'
import { LoadingState } from '../../util/loadingHelper'
import DateAndTemplate from './AssessmentFormHeader/DateAndTemplate'
import AssessmentOptions from './AssessmentFormHeader/AssessmentOptions'
import AssessmentFormHeaderTitle from './AssessmentFormHeader/AssessmentFormHeaderTitle'

describe('<AssessmentFormHeader />', () => {
  const render = ({
    assessment = assessmentMock,
    assessmentServiceStatus = LoadingState.ready,
    client = clientMock,
    disabled,
    handleWarningShow = () => {},
    isEventDateBeforeDob,
    onAssessmentUpdate = () => {},
    onEventDateFieldKeyUp = () => {},
    substanceUseItemsIds = { underSix: ['41'], aboveSix: ['8', '48'] },
  } = {}) =>
    shallow(
      <AssessmentFormHeader
        assessment={assessment}
        assessmentServiceStatus={assessmentServiceStatus}
        client={client}
        disabled={disabled}
        handleWarningShow={handleWarningShow}
        isEventDateBeforeDob={isEventDateBeforeDob}
        onAssessmentUpdate={onAssessmentUpdate}
        onEventDateFieldKeyUp={onEventDateFieldKeyUp}
        substanceUseItemsIds={substanceUseItemsIds}
      />
    )

  const getTitle = wrapper => wrapper.find(AssessmentFormHeaderTitle)
  const getDateAndTemplate = wrapper => wrapper.find(DateAndTemplate)
  const getConductedBy = wrapper => wrapper.find(ConductedBy)
  const getAssessmentOptions = wrapper => wrapper.find(AssessmentOptions)

  describe('default', () => {
    let wrapper

    beforeEach(() => {
      wrapper = render()
    })

    it('renders an AssessmentFormHeaderTitle', () => {
      const title = getTitle(wrapper)
      expect(title.exists()).toBe(true)
    })

    it('passes the countyName to the title', () => {
      const title = getTitle(wrapper)
      expect(title.props().countyName).toBe(`${assessmentMock.county.name} County`)
    })

    it('passes the client info to the title', () => {
      const title = getTitle(wrapper)
      expect(title.props().firstName).toBe(clientMock.first_name)
      expect(title.props().lastName).toBe(clientMock.last_name)
      expect(title.props().estimatedDob).toBe(clientMock.estimated_dob)
      expect(title.props().dob).toBe(clientMock.dob)
    })

    it('passes the source information to the title', () => {
      const title = getTitle(wrapper)
      expect(title.props().serviceSource).toBe(assessmentMock.service_source)
      expect(title.props().serviceSourceUIId).toBe(assessmentMock.service_source_ui_id)
    })

    it('tells the title when the assessment is ready', () => {
      const title = getTitle(wrapper)
      expect(title.props().isAssessmentReady).toBe(true)
    })

    it('renders an enabled Date picker and Template switcher', () => {
      const dateAndTemplate = getDateAndTemplate(wrapper)
      expect(dateAndTemplate.props().disabled).not.toBeTruthy()
    })

    it('passes the relevant assessment info to the Date and Age Template controls', () => {
      const dateAndTemplate = getDateAndTemplate(wrapper)
      expect(dateAndTemplate.props().eventDate).toBe(assessmentMock.event_date)
      expect(dateAndTemplate.props().isUnderSix).toBe(assessmentMock.state.under_six)
    })

    it('renders an enabled ConductedBy field', () => {
      const conductedBy = getConductedBy(wrapper)
      expect(conductedBy.props().disabled).not.toBeTruthy()
    })

    it('renders the AssessmentOptions row', () => {
      const options = getAssessmentOptions(wrapper)
      expect(options.props().isDisabled).not.toBeTruthy()
    })

    it('passes the relevant assessment details to the options', () => {
      const options = getAssessmentOptions(wrapper)
      expect(options.props().canReleaseConfidentialInfo).toBe(assessmentMock.can_release_confidential_info)
      expect(options.props().hasCaregiver).toBe(assessmentMock.has_caregiver)
      expect(options.props().isUnderSix).toBe(assessmentMock.state.under_six)
    })
  })

  it('calls back on raw DatePicker update', () => {
    const onEventDateFieldKeyUp = jest.fn()
    const wrapper = render({ onEventDateFieldKeyUp })
    const dateAndTemplate = getDateAndTemplate(wrapper)
    dateAndTemplate.props().onEventDateFieldKeyUp('value')
    expect(onEventDateFieldKeyUp).toHaveBeenCalledWith('value')
  })

  it('updates the assessment when age template is toggled', () => {
    const onAssessmentUpdate = jest.fn()
    const wrapper = render({ onAssessmentUpdate })
    const toggle = wrapper.find(DateAndTemplate).props().onAgeTemplateChange
    toggle(false)
    expect(onAssessmentUpdate).toHaveBeenCalledWith({
      ...assessmentMock,
      state: { ...assessmentMock.state, under_six: false },
    })
  })

  it('updates the assessment when the event date changes', () => {
    const onAssessmentUpdate = jest.fn()
    const wrapper = render({ onAssessmentUpdate })
    getDateAndTemplate(wrapper)
      .props()
      .onEventDateChange('2019-04-19')
    expect(onAssessmentUpdate).toHaveBeenCalledWith({ ...assessmentMock, event_date: '2019-04-19' })
  })

  it('updates the assessment when can_release_confidential_info changes', () => {
    const onAssessmentUpdate = jest.fn()
    const wrapper = render({ onAssessmentUpdate })
    getAssessmentOptions(wrapper)
      .props()
      .onCanReleaseInfoChange({ target: { value: 'true' } })

    const updatedAssessment = clone(assessmentMock)
    updatedAssessment.can_release_confidential_info = true
    updatedAssessment.state.domains[0].items[3].confidential = false
    expect(onAssessmentUpdate).toHaveBeenCalledWith(updatedAssessment)
  })

  it('sets confidential_by_default items to confidential when can_release_confidential_info changes', () => {
    const onAssessmentUpdate = jest.fn()
    const sentAssessment = clone(assessmentMock)
    sentAssessment.can_release_confidential_info = true
    expect(sentAssessment.state.domains[0].items[3].confidential).toBe(false) // Precondition

    const wrapper = render({ assessment: sentAssessment, onAssessmentUpdate })

    const event = {
      target: { name: 'can_release_confidential_info', value: 'false' },
    }
    getAssessmentOptions(wrapper)
      .props()
      .onCanReleaseInfoChange(event)

    const updatedAssessment = clone(assessmentMock)
    updatedAssessment.can_release_confidential_info = false
    updatedAssessment.state.domains[0].items[3].confidential = true
    expect(onAssessmentUpdate).toHaveBeenCalledWith(updatedAssessment)
  })

  it('updates the assessment when hasCaregiver changes', () => {
    const onAssessmentUpdate = jest.fn()
    const wrapper = render({ onAssessmentUpdate })
    getAssessmentOptions(wrapper)
      .props()
      .onHasCaregiverChange({ target: { name: 'has_caregiver', value: 'true' } })
    expect(onAssessmentUpdate).toHaveBeenCalledWith({ ...assessmentMock, has_caregiver: true })
  })

  it('does nothing when hasCaregiver changes to false, because a modal appears instead', () => {
    const onAssessmentUpdate = jest.fn()
    const wrapper = render({ onAssessmentUpdate })
    getAssessmentOptions(wrapper)
      .props()
      .onHasCaregiverChange({ target: { name: 'has_caregiver', value: 'false' } })
    expect(onAssessmentUpdate).not.toHaveBeenCalled()
  })

  it('prevents default and shows the warning when hasCaregiver No is clicked', () => {
    const handleWarningShow = jest.fn()
    const wrapper = render({ handleWarningShow })
    const preventDefault = jest.fn()
    getAssessmentOptions(wrapper)
      .props()
      .onHasCaregiverNoClicked({ preventDefault })
    expect(preventDefault).toHaveBeenCalledTimes(1)
    expect(handleWarningShow).toHaveBeenCalledWith(true, null)
  })

  describe('when read only', () => {
    let wrapper

    beforeEach(() => {
      wrapper = render({ disabled: true })
    })

    it('propagates disable props to <DateField> ', () => {
      expect(getDateAndTemplate(wrapper).props().disabled).toBe(true)
    })

    it('propagates disable props to <AssessmentOptions> ', () => {
      expect(getAssessmentOptions(wrapper).props().isDisabled).toBe(true)
    })

    it('propagates disable props to <ConductedBy> ', () => {
      expect(getConductedBy(wrapper).props().disabled).toBe(true)
    })
  })
})
