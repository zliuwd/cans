import React from 'react'
import { shallow } from 'enzyme'
import { Card, CardBody } from '@cwds/components'
import AssessmentRecordInfo from './AssessmentRecordInfo'
import AssessmentLink from './AssessmentLink'
import AssessmentActionsEllipsis from './AssessmentActionsEllipsis'
import AssessmentRecordStatus from './AssessmentRecordStatus'
import {
  assessmentInProgressWithCaseNumber,
  assessmentCompletedWithCaseNumber,
  assessmentDeletedWithCaseNumber,
  assessmentWithNoUpdateInfoWithCaseNumber,
  assessmentInProgressWithReferralNumber,
  assessmentCompletedWithReferralNumber,
  assessmentDeletedWithReferralNumber,
  assessmentWithNoUpdateInfoWithReferralNumber,
  assessmentInProgressWithNoClientandReferralNumber,
  assessmentCompletedWithNoClientandReferralNumber,
  assessmentDeletedWithNoClientandReferralNumber,
  assessmentWithNoUpdateInfoWithNoClientandReferralNumber,
} from '../Assessment/assessment.mocks.test'
import { isoToLocalDate } from '../../util/dateHelper'

const prepareWrapper = (assessment, header, callback = () => {}) =>
  shallow(
    <AssessmentRecordInfo
      assessment={assessment}
      header={header}
      navFrom={'SEARCH'}
      inheritUrl={'/staff/0X5/clients/AznnyCs0X5/assessments/298750'}
      updateAssessmentHistoryCallback={callback}
      userId={'1'}
    />
  )

describe('AssessmentRecordInfo', () => {
  describe('component layout', () => {
    let wrapper
    beforeEach(() => {
      wrapper = prepareWrapper(assessmentInProgressWithCaseNumber, 'client-profile')
    })

    it('renders a Card component', () => {
      expect(wrapper.find(Card).exists()).toBe(true)
    })

    it('renders a CardBody component', () => {
      expect(wrapper.find(CardBody).exists()).toBe(true)
    })

    it('renders an AssessmentActionsEllipsis component', () => {
      expect(wrapper.find(AssessmentActionsEllipsis).exists()).toBe(true)
    })

    it('renders an AssessmentActionsEllipsis component with assessmentDate', () => {
      expect(wrapper.find(AssessmentActionsEllipsis).props().date).toBe(
        isoToLocalDate(assessmentInProgressWithCaseNumber.event_date)
      )
    })

    it('renders an assessment-info div', () => {
      expect(wrapper.find('div.assessment-info').exists()).toBe(true)
    })

    describe('assessment record info headers', () => {
      describe('header prop equals assessment-status', () => {
        it('renders a status icon header', () => {
          const statusWrapper = prepareWrapper(assessmentInProgressWithCaseNumber, 'assessment-status')
          expect(statusWrapper.find(AssessmentRecordStatus).exists()).toBe(true)
        })
      })

      describe('header prop equals assessment-client-name', () => {
        it('renders a client name header', () => {
          const clientNameWrapper = prepareWrapper(assessmentInProgressWithCaseNumber, 'assessment-client-name')
          expect(clientNameWrapper.find('div.assessment-record-client-name').exists()).toBe(true)
        })
      })
    })

    it('renders 5 paragraphs', () => {
      expect(wrapper.find('p').length).toBe(5)
    })

    it('renders an AssessmentLink', () => {
      expect(wrapper.find(AssessmentLink).exists()).toBe(true)
    })
  })

  describe('ClientAssessmentHistoryWithCaseNumber', () => {
    it('renders IN_PROGRESS assessment with all fields', () => {
      const { id } = assessmentInProgressWithCaseNumber
      const inProgressWrapper = prepareWrapper(assessmentInProgressWithCaseNumber, 'assessment-client-name')
      const assessmentInfo = inProgressWrapper
        .find('div.assessment-info')
        .children()
        .map(child => child.props().children)

      expect(inProgressWrapper.find(AssessmentActionsEllipsis).props().assessmentId).toBe(97501)
      expect(inProgressWrapper.find(AssessmentActionsEllipsis).props().assessmentCounty).toBe('Alameda')
      expect(inProgressWrapper.find(AssessmentActionsEllipsis).props().clientId).toBe('123')
      expect(assessmentInfo).toEqual([
        'Casey Middle Test, Jr',
        <AssessmentLink
          assessment={assessmentInProgressWithCaseNumber}
          key={id}
          linkText={'CANS'}
          navFrom={'SEARCH'}
          userId={'1'}
        />,
        'Saved on 06/06/2015',
        'by Name 1 LastName 1',
        'Case #: 4444-333-4444-88888888',
        'County: Alameda',
      ])
    })

    it('renders COMPLETED assessment with all fields', () => {
      const { id } = assessmentCompletedWithCaseNumber
      const completedWrapper = prepareWrapper(assessmentCompletedWithCaseNumber, 'assessment-client-name')
      const assessmentInfo = completedWrapper
        .find('div.assessment-info')
        .children()
        .map(child => child.props().children)

      expect(completedWrapper.find(AssessmentActionsEllipsis).props().assessmentId).toBe(97502)
      expect(completedWrapper.find(AssessmentActionsEllipsis).props().assessmentCounty).toBe('Alameda')
      expect(completedWrapper.find(AssessmentActionsEllipsis).props().clientId).toBe('123')
      expect(assessmentInfo).toEqual([
        'Casey Middle Test, Jr',
        <AssessmentLink
          assessment={assessmentCompletedWithCaseNumber}
          key={id}
          linkText={'CANS'}
          navFrom={'SEARCH'}
          userId={'1'}
        />,
        'Completed on 06/06/2018',
        'by Name 2 LastName 2',
        'Case #: 4444-333-4444-88888888',
        'County: Alameda',
      ])
    })

    it('renders DELETED assessment with all fields', () => {
      const { id } = assessmentDeletedWithCaseNumber
      const deletedWrapper = prepareWrapper(assessmentDeletedWithCaseNumber, 'assessment-client-name')
      const assessmentInfo = deletedWrapper
        .find('div.assessment-info')
        .children()
        .map(child => child.props().children)

      expect(deletedWrapper.find(AssessmentActionsEllipsis).props().assessmentId).toBe(97502)
      expect(deletedWrapper.find(AssessmentActionsEllipsis).props().assessmentCounty).toBe('Alameda')
      expect(deletedWrapper.find(AssessmentActionsEllipsis).props().clientId).toBe('123')
      expect(assessmentInfo).toEqual([
        'Casey Middle Test, Jr',
        <AssessmentLink
          assessment={assessmentDeletedWithCaseNumber}
          key={id}
          linkText={'CANS'}
          navFrom={'SEARCH'}
          userId={'1'}
        />,
        'Deleted on 06/06/2018',
        'by Name 2 LastName 2',
        'Case #: 4444-333-4444-88888888',
        'County: Alameda',
      ])
    })

    it('renders assessment with no update info (create info only)', () => {
      const { id } = assessmentWithNoUpdateInfoWithCaseNumber
      const noUpdateInfoWrapper = prepareWrapper(assessmentWithNoUpdateInfoWithCaseNumber, 'assessment-client-name')
      const assessmentInfo = noUpdateInfoWrapper
        .find('div.assessment-info')
        .children()
        .map(child => child.props().children)

      expect(noUpdateInfoWrapper.find(AssessmentActionsEllipsis).props().assessmentId).toBe(97503)
      expect(noUpdateInfoWrapper.find(AssessmentActionsEllipsis).props().assessmentCounty).toBe('Alameda')
      expect(noUpdateInfoWrapper.find(AssessmentActionsEllipsis).props().clientId).toBe('123')
      expect(assessmentInfo).toEqual([
        'Casey Middle Test, Jr',
        <AssessmentLink
          assessment={assessmentWithNoUpdateInfoWithCaseNumber}
          key={id}
          linkText={'CANS'}
          navFrom={'SEARCH'}
          userId={'1'}
        />,
        'Saved on 06/06/2018',
        'by Name 3 LastName 3',
        'Case #: 4444-333-4444-88888888',
        'County: Alameda',
      ])
    })
  })

  describe('ClientAssessmentHistoryWithReferralNumber', () => {
    it('renders IN_PROGRESS assessment with all fields', () => {
      const { id } = assessmentInProgressWithReferralNumber
      const inProgressWrapper = prepareWrapper(assessmentInProgressWithReferralNumber, 'assessment-client-name')
      const assessmentInfo = inProgressWrapper
        .find('div.assessment-info')
        .children()
        .map(child => child.props().children)

      expect(inProgressWrapper.find(AssessmentActionsEllipsis).props().assessmentId).toBe(97501)
      expect(inProgressWrapper.find(AssessmentActionsEllipsis).props().assessmentCounty).toBe('Alameda')
      expect(inProgressWrapper.find(AssessmentActionsEllipsis).props().clientId).toBe('123')
      expect(assessmentInfo).toEqual([
        'Casey Middle Test, Jr',
        <AssessmentLink
          assessment={assessmentInProgressWithReferralNumber}
          key={id}
          linkText={'CANS'}
          navFrom={'SEARCH'}
          userId={'1'}
        />,
        'Saved on 06/06/2015',
        'by Name 1 LastName 1',
        'Referral #: 4444-333-4444-88888888',
        'County: Alameda',
      ])
    })

    it('renders COMPLETED assessment with all fields', () => {
      const { id } = assessmentCompletedWithReferralNumber
      const completedWrapper = prepareWrapper(assessmentCompletedWithReferralNumber, 'assessment-client-name')
      const assessmentInfo = completedWrapper
        .find('div.assessment-info')
        .children()
        .map(child => child.props().children)

      expect(completedWrapper.find(AssessmentActionsEllipsis).props().assessmentId).toBe(97502)
      expect(completedWrapper.find(AssessmentActionsEllipsis).props().assessmentCounty).toBe('Alameda')
      expect(completedWrapper.find(AssessmentActionsEllipsis).props().clientId).toBe('123')
      expect(assessmentInfo).toEqual([
        'Casey Middle Test, Jr',
        <AssessmentLink
          assessment={assessmentCompletedWithReferralNumber}
          key={id}
          linkText={'CANS'}
          navFrom={'SEARCH'}
          userId={'1'}
        />,
        'Completed on 06/06/2018',
        'by Name 2 LastName 2',
        'Referral #: 4444-333-4444-88888888',
        'County: Alameda',
      ])
    })

    it('renders DELETED assessment with all fields', () => {
      const { id } = assessmentDeletedWithReferralNumber
      const deletedWrapper = prepareWrapper(assessmentDeletedWithReferralNumber, 'assessment-client-name')
      const assessmentInfo = deletedWrapper
        .find('div.assessment-info')
        .children()
        .map(child => child.props().children)

      expect(deletedWrapper.find(AssessmentActionsEllipsis).props().assessmentId).toBe(97502)
      expect(deletedWrapper.find(AssessmentActionsEllipsis).props().assessmentCounty).toBe('Alameda')
      expect(deletedWrapper.find(AssessmentActionsEllipsis).props().clientId).toBe('123')
      expect(assessmentInfo).toEqual([
        'Casey Middle Test, Jr',
        <AssessmentLink
          assessment={assessmentDeletedWithReferralNumber}
          key={id}
          linkText={'CANS'}
          navFrom={'SEARCH'}
          userId={'1'}
        />,
        'Deleted on 06/06/2018',
        'by Name 2 LastName 2',
        'Referral #: 4444-333-4444-88888888',
        'County: Alameda',
      ])
    })

    it('renders assessment with no update info (create info only)', () => {
      const { id } = assessmentWithNoUpdateInfoWithReferralNumber
      const noUpdateInfoWrapper = prepareWrapper(assessmentWithNoUpdateInfoWithReferralNumber, 'assessment-client-name')
      const assessmentInfo = noUpdateInfoWrapper
        .find('div.assessment-info')
        .children()
        .map(child => child.props().children)

      expect(noUpdateInfoWrapper.find(AssessmentActionsEllipsis).props().assessmentId).toBe(97503)
      expect(noUpdateInfoWrapper.find(AssessmentActionsEllipsis).props().assessmentCounty).toBe('Alameda')
      expect(noUpdateInfoWrapper.find(AssessmentActionsEllipsis).props().clientId).toBe('123')
      expect(assessmentInfo).toEqual([
        'Casey Middle Test, Jr',
        <AssessmentLink
          assessment={assessmentWithNoUpdateInfoWithReferralNumber}
          key={id}
          linkText={'CANS'}
          navFrom={'SEARCH'}
          userId={'1'}
        />,
        'Saved on 06/06/2018',
        'by Name 3 LastName 3',
        'Referral #: 4444-333-4444-88888888',
        'County: Alameda',
      ])
    })
  })

  describe('ClientAssessmentHistoryWithNoClientorReferralNumber', () => {
    it('renders IN_PROGRESS assessment with all fields', () => {
      const { id } = assessmentInProgressWithNoClientandReferralNumber
      const inProgressWrapper = prepareWrapper(
        assessmentInProgressWithNoClientandReferralNumber,
        'assessment-client-name'
      )
      const assessmentInfo = inProgressWrapper
        .find('div.assessment-info')
        .children()
        .map(child => child.props().children)

      expect(inProgressWrapper.find(AssessmentActionsEllipsis).props().assessmentId).toBe(97501)
      expect(inProgressWrapper.find(AssessmentActionsEllipsis).props().assessmentCounty).toBe('Alameda')
      expect(inProgressWrapper.find(AssessmentActionsEllipsis).props().clientId).toBe('123')
      expect(assessmentInfo).toEqual([
        'Casey Middle Test, Jr',
        <AssessmentLink
          assessment={assessmentInProgressWithNoClientandReferralNumber}
          key={id}
          linkText={'CANS'}
          navFrom={'SEARCH'}
          userId={'1'}
        />,
        'Saved on 06/06/2015',
        'by Name 1 LastName 1',
        'Case/Referral #: ',
        'County: Alameda',
      ])
    })

    it('renders COMPLETED assessment with all fields', () => {
      const { id } = assessmentCompletedWithNoClientandReferralNumber
      const completedWrapper = prepareWrapper(
        assessmentCompletedWithNoClientandReferralNumber,
        'assessment-client-name'
      )
      const assessmentInfo = completedWrapper
        .find('div.assessment-info')
        .children()
        .map(child => child.props().children)

      expect(completedWrapper.find(AssessmentActionsEllipsis).props().assessmentId).toBe(97502)
      expect(completedWrapper.find(AssessmentActionsEllipsis).props().assessmentCounty).toBe('Alameda')
      expect(completedWrapper.find(AssessmentActionsEllipsis).props().clientId).toBe('123')
      expect(assessmentInfo).toEqual([
        'Casey Middle Test, Jr',
        <AssessmentLink
          assessment={assessmentCompletedWithNoClientandReferralNumber}
          key={id}
          linkText={'CANS'}
          navFrom={'SEARCH'}
          userId={'1'}
        />,
        'Completed on 06/06/2018',
        'by Name 2 LastName 2',
        'Case/Referral #: ',
        'County: Alameda',
      ])
    })

    it('renders DELETED assessment with all fields', () => {
      const { id } = assessmentDeletedWithNoClientandReferralNumber
      const deletedWrapper = prepareWrapper(assessmentDeletedWithNoClientandReferralNumber, 'assessment-client-name')
      const assessmentInfo = deletedWrapper
        .find('div.assessment-info')
        .children()
        .map(child => child.props().children)

      expect(deletedWrapper.find(AssessmentActionsEllipsis).props().assessmentId).toBe(97502)
      expect(deletedWrapper.find(AssessmentActionsEllipsis).props().assessmentCounty).toBe('Alameda')
      expect(deletedWrapper.find(AssessmentActionsEllipsis).props().clientId).toBe('123')
      expect(assessmentInfo).toEqual([
        'Casey Middle Test, Jr',
        <AssessmentLink
          assessment={assessmentDeletedWithNoClientandReferralNumber}
          key={id}
          linkText={'CANS'}
          navFrom={'SEARCH'}
          userId={'1'}
        />,
        'Deleted on 06/06/2018',
        'by Name 2 LastName 2',
        'Case/Referral #: ',
        'County: Alameda',
      ])
    })

    it('renders assessment with no update info (create info only)', () => {
      const { id } = assessmentWithNoUpdateInfoWithNoClientandReferralNumber
      const noUpdateInfoWrapper = prepareWrapper(
        assessmentWithNoUpdateInfoWithNoClientandReferralNumber,
        'assessment-client-name'
      )
      const assessmentInfo = noUpdateInfoWrapper
        .find('div.assessment-info')
        .children()
        .map(child => child.props().children)

      expect(noUpdateInfoWrapper.find(AssessmentActionsEllipsis).props().assessmentId).toBe(97503)
      expect(noUpdateInfoWrapper.find(AssessmentActionsEllipsis).props().assessmentCounty).toBe('Alameda')
      expect(noUpdateInfoWrapper.find(AssessmentActionsEllipsis).props().clientId).toBe('123')
      expect(assessmentInfo).toEqual([
        'Casey Middle Test, Jr',
        <AssessmentLink
          assessment={assessmentWithNoUpdateInfoWithNoClientandReferralNumber}
          key={id}
          linkText={'CANS'}
          navFrom={'SEARCH'}
          userId={'1'}
        />,
        'Saved on 06/06/2018',
        'by Name 3 LastName 3',
        'Case/Referral #: ',
        'County: Alameda',
      ])
    })
  })
})
