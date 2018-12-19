import React from 'react'
import { shallow } from 'enzyme'
import { Card, CardHeader, CardTitle, CardBody, DataGrid } from '@cwds/components'
import { Row } from 'reactstrap'
import AssessmentChangeLog from './AssessmentChangeLog'
import { assessmentCompletedWithReferralNumber } from '../assessment.mocks.test'

describe('<AssessmentChangeLog />', () => {
  const defaultProps = {
    client: {
      first_name: 'See',
      middle_name: 'K',
      last_name: 'Abbott',
      suffix: '',
      identifier: 'AdE0PWu0X5',
      external_id: '0603-9385-0313-2002051',
      dob: '2005-08-14',
    },
  }

  const defaultChangeHistory = [{ changed_at: '2018-11-01T17:07:10.043Z' }]

  const render = (
    changeHistory = defaultChangeHistory,
    assessment = assessmentCompletedWithReferralNumber,
    updateHeaderButtons = () => {},
    updateHeaderButtonsToDefault = () => {}
  ) => {
    const props = {
      assessmentWithHistory: { changeHistory, assessment },
      pageHeaderButtonsController: {
        updateHeaderButtons,
        updateHeaderButtonsToDefault,
      },
      ...defaultProps,
    }
    return shallow(<AssessmentChangeLog {...props} />)
  }

  describe('page layout', () => {
    it('renders nothing when there is no change history', () => {
      const changeHistory = []
      const wrapper = render(changeHistory)
      expect(wrapper.type()).toBe(null)
    })

    it('renders nothing when the assessment is null', () => {
      const assessment = null
      const wrapper = render(defaultChangeHistory, assessment)
      expect(wrapper.type()).toBe(null)
    })

    let wrapper

    beforeEach(() => {
      wrapper = render()
    })

    it('renders a Row', () => {
      expect(wrapper.find(Row).length).toBe(1)
    })

    it('renders a card when there is change log data', () => {
      expect(wrapper.find(Card).exists()).toBe(true)
    })

    it('renders a card header when there is change log data', () => {
      expect(wrapper.find(CardHeader).exists()).toBe(true)
    })

    it('renders a card body there is change log data', () => {
      expect(wrapper.find(CardBody).exists()).toBe(true)
    })

    it('renders a card title there is change log data', () => {
      expect(wrapper.find(CardTitle).exists()).toBe(true)
    })

    it('renders a data grid when there is change log data', () => {
      expect(wrapper.find(DataGrid).exists()).toBe(true)
    })
  })

  describe('page info', () => {
    let wrapper

    beforeEach(() => {
      wrapper = render()
    })

    it('renders the card title with client name and assessment date', () => {
      expect(
        wrapper
          .find(CardTitle)
          .dive()
          .html()
      ).toBe(
        '<div class="change-log-title card-title"><div><span>CANS Change Log: Abbott, See K</span><span>Assessment Date: 06/06/2018</span></div></div>'
      )
    })

    it('passes change history data to DataGrid', () => {
      expect(wrapper.find(DataGrid).props().data).toEqual(defaultChangeHistory)
    })
  })

  describe('page header buttons', () => {
    let wrapper
    const updateHeaderButtonsMock = jest.fn()

    describe('componentDidMount', () => {
      it('should update page header buttons', () => {
        render(defaultChangeHistory, assessmentCompletedWithReferralNumber, updateHeaderButtonsMock)
        expect(updateHeaderButtonsMock).toHaveBeenCalledTimes(1)
        updateHeaderButtonsMock.mockClear()
      })
    })

    describe('componentDidUpdate', () => {
      describe('changeHistory prop was updated', () => {
        it('should update page header buttons', () => {
          wrapper = render([], assessmentCompletedWithReferralNumber, updateHeaderButtonsMock)
          expect(updateHeaderButtonsMock).toHaveBeenCalledTimes(1)
          wrapper.setProps({
            assessmentWithHistory: {
              changeHistory: defaultChangeHistory,
              assessment: assessmentCompletedWithReferralNumber,
            },
          })
          expect(updateHeaderButtonsMock).toHaveBeenCalledTimes(2)
          updateHeaderButtonsMock.mockClear()
        })
      })

      describe('changeHistory prop was not updated', () => {
        it('should not update page header buttons', () => {
          const wrapper = render(defaultChangeHistory, assessmentCompletedWithReferralNumber, updateHeaderButtonsMock)
          expect(updateHeaderButtonsMock).toHaveBeenCalledTimes(1)
          wrapper.setProps({
            assessmentWithHistory: {
              changeHistory: defaultChangeHistory,
              assessment: assessmentCompletedWithReferralNumber,
            },
          })
          expect(updateHeaderButtonsMock).toHaveBeenCalledTimes(1)
          updateHeaderButtonsMock.mockClear()
        })
      })
    })

    describe('componentWillUnmount', () => {
      it('should reset page header buttons to default values', () => {
        const updateToDefaultMock = jest.fn()
        const wrapper = render(
          defaultChangeHistory,
          assessmentCompletedWithReferralNumber,
          () => {},
          updateToDefaultMock
        )
        wrapper.unmount()
        expect(updateToDefaultMock).toHaveBeenCalledTimes(1)
      })
    })

    describe('print button status', () => {
      describe('change log data exists', () => {
        it('print button should be enabled', () => {
          const wrapper = render()
          const spy = jest.spyOn(wrapper.instance(), 'initHeaderButtons')
          wrapper.instance().componentDidMount()
          expect(spy).toHaveBeenCalledWith(true)
        })
      })

      describe('change log data does not exist', () => {
        it('print button should be disabled', () => {
          const changeHistory = []
          const wrapper = render(changeHistory)
          const spy = jest.spyOn(wrapper.instance(), 'initHeaderButtons')
          wrapper.instance().componentDidMount()
          expect(spy).toHaveBeenCalledWith(false)
        })
      })
    })
  })
})
