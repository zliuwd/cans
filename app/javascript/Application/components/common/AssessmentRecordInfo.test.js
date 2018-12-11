import React from 'react'
import { shallow } from 'enzyme'
import { Card, CardBody } from '@cwds/components'
import AssessmentRecordInfo from './AssessmentRecordInfo'
import { assessmentInProgress, assessmentWithNoUpdateInfo } from '../Assessment/assessment.mocks.test'
import AssessmentLink from '../common/AssessmentLink'
import Ellipsis from '../common/Ellipsis'
import AssessmentRecordStatus from '../common/AssessmentRecordStatus'

const prepareWrapper = (assessment, header) => shallow(<AssessmentRecordInfo assessment={assessment} header={header} />)

describe('AssessmentRecordInfo', () => {
  describe('component layout', () => {
    let wrapper

    beforeEach(() => {
      wrapper = prepareWrapper(assessmentInProgress, 'client-profile')
    })

    it('renders a Card component', () => {
      expect(wrapper.find(Card).exists()).toBe(true)
    })

    it('renders a CardBody component', () => {
      expect(wrapper.find(CardBody).exists()).toBe(true)
    })

    it('renders an Ellipsis component', () => {
      expect(wrapper.find(Ellipsis).exists()).toBe(true)
    })

    it('renders an assessment-record-info div', () => {
      expect(wrapper.find('div.assessment-record-info').exists()).toBe(true)
    })

    describe('assessment record info headers', () => {
      describe('header prop equals assessment-status', () => {
        it('renders a status icon header', () => {
          const wrapper = prepareWrapper(assessmentInProgress, 'assessment-status')
          expect(wrapper.find(AssessmentRecordStatus).exists()).toBe(true)
        })
      })

      describe('header prop equals assessment-client-name', () => {
        it('renders a client name header', () => {
          const wrapper = prepareWrapper(assessmentInProgress, 'assessment-client-name')
          expect(wrapper.find('div.assessment-record-client-name').exists()).toBe(true)
        })
      })
    })

    it('renders 5 paragraphs', () => {
      expect(wrapper.find('p').length).toBe(5)
    })
  })

  describe('component info', () => {
    describe('with an assessment status header', () => {
      const header = 'assessment-status'

      it('renders a Card component with assessment info', () => {
        const { id } = assessmentInProgress
        const wrapper = prepareWrapper(assessmentInProgress, header)
        const assessmentInfoChildren = wrapper.find('div.assessment-record-info').children()

        expect(wrapper.find(Ellipsis).props().id).toBe(97500)
        expect(assessmentInfoChildren.at(0).matchesElement(<AssessmentRecordStatus status="IN_PROGRESS" />)).toEqual(
          true
        )
        expect(assessmentInfoChildren.at(1).props().children).toEqual(
          <AssessmentLink assessment={assessmentInProgress} key={id} />
        )
        expect(assessmentInfoChildren.at(2).props().children).toEqual('Saved on 06/06/2015 by')
        expect(assessmentInfoChildren.at(3).props().children).toEqual('Name 1 Last_Name 1')
        expect(assessmentInfoChildren.at(4).props().children).toEqual('Case: 4444-333-4444-88888888')
        expect(assessmentInfoChildren.at(5).props().children).toEqual('County: Alameda')
      })

      it('renders a Card component with no updated_by info (create info only)', () => {
        const { id } = assessmentWithNoUpdateInfo
        const wrapper = prepareWrapper(assessmentWithNoUpdateInfo, header)
        const assessmentInfoChildren = wrapper.find('div.assessment-record-info').children()

        expect(wrapper.find(Ellipsis).props().id).toBe(97502)
        expect(assessmentInfoChildren.at(0).matchesElement(<AssessmentRecordStatus status="IN_PROGRESS" />)).toEqual(
          true
        )
        expect(assessmentInfoChildren.at(1).props().children).toEqual(
          <AssessmentLink assessment={assessmentWithNoUpdateInfo} key={id} />
        )
        expect(assessmentInfoChildren.at(2).props().children).toEqual('Saved on 06/06/2018 by')
        expect(assessmentInfoChildren.at(3).props().children).toEqual('Name 3 Last_Name 3')
        expect(assessmentInfoChildren.at(4).props().children).toEqual('Case: ')
        expect(assessmentInfoChildren.at(5).props().children).toEqual('County: Alameda')
      })

      it('renders when there is no county', () => {
        const { county, ...noCountyAssessment } = assessmentWithNoUpdateInfo
        const { id } = noCountyAssessment
        const wrapper = prepareWrapper(noCountyAssessment, header)
        const assessmentInfoChildren = wrapper.find('div.assessment-record-info').children()

        expect(wrapper.find(Ellipsis).props().id).toBe(97502)
        expect(assessmentInfoChildren.at(0).matchesElement(<AssessmentRecordStatus status="IN_PROGRESS" />)).toEqual(
          true
        )
        expect(assessmentInfoChildren.at(1).props().children).toEqual(
          <AssessmentLink assessment={noCountyAssessment} key={id} />
        )
        expect(assessmentInfoChildren.at(2).props().children).toEqual('Saved on 06/06/2018 by')
        expect(assessmentInfoChildren.at(3).props().children).toEqual('Name 3 Last_Name 3')
        expect(assessmentInfoChildren.at(4).props().children).toEqual('Case: ')
        expect(assessmentInfoChildren.at(5).props().children).toEqual('County: ')
      })
    })

    describe('with a client name header', () => {
      const header = 'assessment-client-name'

      it('renders a Card component with assessment info', () => {
        const { id } = assessmentInProgress
        const wrapper = prepareWrapper(assessmentInProgress, header)
        const assessmentInfo = wrapper
          .find('div.assessment-record-info')
          .children()
          .map(child => child.props().children)

        expect(wrapper.find(Ellipsis).props().id).toBe(97500)
        expect(assessmentInfo).toEqual([
          'Client name: Casey Middle Test, Jr',
          <AssessmentLink assessment={assessmentInProgress} key={id} />,
          'Saved on 06/06/2015 by',
          'Name 1 Last_Name 1',
          'Case: 4444-333-4444-88888888',
          'County: Alameda',
        ])
      })

      it('renders a Card component with no updated_by info (create info only)', () => {
        const { id } = assessmentWithNoUpdateInfo
        const wrapper = prepareWrapper(assessmentWithNoUpdateInfo, header)
        const assessmentInfo = wrapper
          .find('div.assessment-record-info')
          .children()
          .map(child => child.props().children)

        expect(wrapper.find(Ellipsis).props().id).toBe(97502)
        expect(assessmentInfo).toEqual([
          'Client name: Casey Middle Test, Jr',
          <AssessmentLink assessment={assessmentWithNoUpdateInfo} key={id} />,
          'Saved on 06/06/2018 by',
          'Name 3 Last_Name 3',
          'Case: ',
          'County: Alameda',
        ])
      })

      it('renders when there is no county', () => {
        const { county, ...noCountyAssessment } = assessmentWithNoUpdateInfo
        const { id } = noCountyAssessment
        const wrapper = prepareWrapper(noCountyAssessment, header)
        const assessmentInfo = wrapper
          .find('div.assessment-record-info')
          .children()
          .map(child => child.props().children)

        expect(wrapper.find(Ellipsis).props().id).toBe(97502)
        expect(assessmentInfo).toEqual([
          'Client name: Casey Middle Test, Jr',
          <AssessmentLink assessment={noCountyAssessment} key={id} />,
          'Saved on 06/06/2018 by',
          'Name 3 Last_Name 3',
          'Case: ',
          'County: ',
        ])
      })
    })
  })
})
