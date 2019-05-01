import React from 'react'
import { shallow } from 'enzyme'
import AssessmentFormHeaderTitle from './AssessmentFormHeaderTitle'
import ClientNameTitle from './ClientNameTitle'
import CountyAndCase from './CountyAndCase'

describe('AssessmentFormHeaderTitle', () => {
  const render = ({
    countyName,
    dob,
    firstName,
    isAssessmentReady = true,
    isEstimatedDob,
    lastName,
    serviceSource,
    serviceSourceUIId,
  } = {}) =>
    shallow(
      <AssessmentFormHeaderTitle
        countyName={countyName}
        dob={dob}
        firstName={firstName}
        isAssessmentReady={isAssessmentReady}
        isEstimatedDob={isEstimatedDob}
        lastName={lastName}
        serviceSource={serviceSource}
        serviceSourceUIId={serviceSourceUIId}
      />
    )

  it('renders the ClientNameTitle', () => {
    const wrapper = render({
      firstName: 'Bobby',
      dob: '2001-05-23',
      isEstimatedDob: true,
      lastName: 'Breadman',
    })
    const clientNameTitle = wrapper.find(ClientNameTitle)

    expect(clientNameTitle.props().firstName).toBe('Bobby')
    expect(clientNameTitle.props().dob).toBe('2001-05-23')
    expect(clientNameTitle.props().isEstimatedDob).toBe(true)
    expect(clientNameTitle.props().lastName).toBe('Breadman')
  })

  it('renders the CountyAndCase info', () => {
    const wrapper = render({
      countyName: 'Los Angeles County',
      isAssessmentReady: false,
      serviceSource: 'REFERRAL',
      serviceSourceUIId: '2341',
    })
    const clientNameTitle = wrapper.find(CountyAndCase)

    expect(clientNameTitle.props().countyName).toBe('Los Angeles County')
    expect(clientNameTitle.props().isAssessmentReady).toBe(false)
    expect(clientNameTitle.props().serviceSource).toBe('REFERRAL')
    expect(clientNameTitle.props().serviceSourceUIId).toBe('2341')
  })
})

/*
  describe('with county name and case/Referal number', () => {
    it('displays nothing while waiting to load assessments', () => {
      const assessmentWithCaseNumber = {
        ...assessment,
        service_source_ui_id: '0687-9473-7673-8000672',
        service_source: 'CASE',
      }
      const props = {
        assessment: assessmentWithCaseNumber,
        client,
        onAssessmentUpdate: jest.fn(),
        onEventDateFieldKeyUp: jest.fn(),
        substanceUseItemsIds: defaultProps.substanceUseItemsIds,
        assessmentServiceStatus: LoadingState.waiting,
      }
      const caseWrapper = shallow(<AssessmentFormHeader {...props} />)
      const countyCaseInfo = caseWrapper.find('#county-and-case-info')
      expect(countyCaseInfo.text()).toEqual('')
    })

    it('displays nothing while idle loading assessments', () => {
      const assessmentWithCaseNumber = {
        ...assessment,
        service_source_ui_id: '0687-9473-7673-8000672',
        service_source: 'CASE',
      }
      const props = {
        assessment: assessmentWithCaseNumber,
        client,
        onAssessmentUpdate: jest.fn(),
        onEventDateFieldKeyUp: jest.fn(),
        substanceUseItemsIds: defaultProps.substanceUseItemsIds,
        assessmentServiceStatus: LoadingState.idle,
      }
      const caseWrapper = shallow(<AssessmentFormHeader {...props} />)
      const countyCaseInfo = caseWrapper.find('#county-and-case-info')
      expect(countyCaseInfo.text()).toEqual('')
    })

    describe('when assessment is loaded', () => {
      it('displays correct county name', () => {
        const title = shallow(<AssessmentFormHeader {...defaultProps} />)
          .find(CardTitle)
          .dive()
        expect(title.find('#county-name').text()).toBe('Calaveras County')
      })

      it('renders with case number label and Case Number', () => {
        const assessmentWithCaseNumber = {
          ...assessment,
          service_source_ui_id: '0687-9473-7673-8000672',
          service_source: 'CASE',
        }
        const props = {
          assessment: assessmentWithCaseNumber,
          client,
          onAssessmentUpdate: jest.fn(),
          onEventDateFieldKeyUp: jest.fn(),
          substanceUseItemsIds: defaultProps.substanceUseItemsIds,
          assessmentServiceStatus: LoadingState.ready,
        }
        const caseWrapper = shallow(<AssessmentFormHeader {...props} />)
        const caseNumberLabel = caseWrapper.find('#case-or-referral-number-label')
        const caseNumber = caseWrapper.find('#case-or-referral-number')
        expect(caseNumberLabel.children().text()).toBe('Case Number')
        expect(caseNumber.text()).toBe('0687-9473-7673-8000672')
      })

      it('renders with referral number label and Referral Number', () => {
        const assessmentWithReferralNumber = {
          ...assessment,
          service_source_ui_id: '4704-9166-3831-2001287',
          service_source: 'REFERRAL',
        }
        const props = {
          assessment: assessmentWithReferralNumber,
          client,
          onAssessmentUpdate: jest.fn(),
          onEventDateFieldKeyUp: jest.fn(),
          substanceUseItemsIds: defaultProps.substanceUseItemsIds,
          assessmentServiceStatus: LoadingState.ready,
        }
        const referralWrapper = shallow(<AssessmentFormHeader {...props} />)
        const referralNumberLabel = referralWrapper.find('#case-or-referral-number-label')
        const referralNumber = referralWrapper.find('#case-or-referral-number')
        expect(referralNumberLabel.children().text()).toBe('Referral Number')
        expect(referralNumber.text()).toBe('4704-9166-3831-2001287')
      })

      it('renders without case/referral number when not exists and Case/Referral Number label', () => {
        const props = {
          assessment,
          client,
          onAssessmentUpdate: jest.fn(),
          onEventDateFieldKeyUp: jest.fn(),
          substanceUseItemsIds: defaultProps.substanceUseItemsIds,
          assessmentServiceStatus: LoadingState.ready,
        }
        const caseReferralWrapper = shallow(<AssessmentFormHeader {...props} />)
        const referralNumberLabel = caseReferralWrapper.find('#case-or-referral-number-label')
        const caseNumber = caseReferralWrapper.find('#case-or-referral-number')
        expect(referralNumberLabel.children().text()).toBe('Case/Referral Number')
        expect(caseNumber.text()).toBe('No case/referral number exists')
      })
    })
  })
*/
