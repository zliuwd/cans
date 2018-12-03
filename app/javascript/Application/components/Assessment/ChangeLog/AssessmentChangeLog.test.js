import React from 'react'
import { shallow } from 'enzyme'
import { Card, CardHeader, CardTitle, CardBody, DataGrid } from '@cwds/components'
import { Row } from 'reactstrap'
import AssessmentChangeLog from './AssessmentChangeLog'

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
    match: { params: { id: '1' } },
  }

  const defaultChangeHistory = [{ changed_at: '2018-11-01T17:07:10.043Z' }]

  const defaultPageHeaderButtonsController = {
    updateHeaderButtons: () => {},
    updateHeaderButtonsToDefault: () => {},
  }

  describe('page layout', () => {
    let wrapper
    const props = {
      changeHistory: [
        {
          user_id: 'RACFID',
          user_first_name: 'Casey',
          user_last_name: 'Test',
          changed_at: '2018-11-01T17:07:10.043Z',
          assessment_change_type: 'CREATED',
        },
      ],
      pageHeaderButtonsController: defaultPageHeaderButtonsController,
      ...defaultProps,
    }

    it('renders nothing when there is no change log data', async () => {
      const props = {
        changeHistory: [],
        pageHeaderButtonsController: defaultPageHeaderButtonsController,
        ...defaultProps,
      }
      wrapper = shallow(<AssessmentChangeLog {...props} />)

      expect(wrapper.type()).toBe(null)
    })

    beforeEach(() => {
      wrapper = shallow(<AssessmentChangeLog {...props} />)
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
      const props = {
        changeHistory: defaultChangeHistory,
        pageHeaderButtonsController: defaultPageHeaderButtonsController,
        ...defaultProps,
      }
      wrapper = shallow(<AssessmentChangeLog {...props} />)
    })

    it('renders the card title with client name and dob', () => {
      expect(
        wrapper
          .find(CardTitle)
          .dive()
          .text()
      ).toBe('CANS Change Log: Abbott, See K 08/14/2005')
    })

    it('passes change history data to DataGrid', () => {
      expect(wrapper.find(DataGrid).props().data).toEqual(defaultChangeHistory)
    })
  })

  describe('page header buttons', () => {
    const updateHeaderButtonsMock = jest.fn()
    const props = {
      changeHistory: defaultChangeHistory,
      pageHeaderButtonsController: {
        updateHeaderButtons: updateHeaderButtonsMock,
        updateHeaderButtonsToDefault: () => {},
      },
      ...defaultProps,
    }

    it('should update page header buttons on componentDidMount', () => {
      shallow(<AssessmentChangeLog {...props} />)
      expect(updateHeaderButtonsMock).toHaveBeenCalledTimes(1)
    })

    it('should reset page header buttons to default values on componentWillUnmount', () => {
      const updateToDefaultMock = jest.fn()
      const props = {
        changeHistory: defaultChangeHistory,
        pageHeaderButtonsController: {
          updateHeaderButtons: () => {},
          updateHeaderButtonsToDefault: updateToDefaultMock,
        },
        ...defaultProps,
      }
      const wrapper = shallow(<AssessmentChangeLog {...props} />)
      wrapper.instance().componentWillUnmount()
      expect(updateToDefaultMock).toHaveBeenCalledTimes(1)
    })

    describe('print button status', () => {
      it('should be enabled when there is change log data', () => {
        const wrapper = shallow(<AssessmentChangeLog {...props} />)
        const spy = jest.spyOn(wrapper.instance(), 'initHeaderButtons')
        wrapper.instance().componentDidMount()
        expect(spy).toHaveBeenCalledWith(true)
      })

      it('should be disabled when there is no change log data', () => {
        const props = {
          changeHistory: [],
          pageHeaderButtonsController: defaultPageHeaderButtonsController,
          ...defaultProps,
        }
        const wrapper = shallow(<AssessmentChangeLog {...props} />)
        const spy = jest.spyOn(wrapper.instance(), 'initHeaderButtons')
        wrapper.instance().componentDidMount()
        expect(spy).toHaveBeenCalledWith(false)
      })
    })
  })
})
