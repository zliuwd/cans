import React from 'react'
import { shallow } from 'enzyme'
import PrintChangeLog from './PrintChangeLog'
import ChangeLogDate from './ChangeLogDate'
import ChangeLogStatus from './ChangeLogStatus'
import ChangeLogName from './ChangeLogName'

describe('<PrintChangeLog />', () => {
  const defaultProps = {
    assessmentId: 1,
    client: {
      first_name: 'Annie',
      middle_name: 'B',
      last_name: 'Doe',
      suffix: '',
    },
  }

  const defaultHistory = {
    history: [
      {
        id: 1,
        user_id: 'RACFID',
        entity_id: 1,
        changed_at: '2018-11-01T17:07:10.043Z',
        change_type: 'ADD',
        changes: [],
        assessment_change_type: 'CREATED',
      },
    ],
  }

  describe('print layout', () => {
    let wrapper

    beforeEach(() => {
      const props = {
        ...defaultHistory,
        ...defaultProps,
      }
      wrapper = shallow(<PrintChangeLog {...props} />)
    })

    it('renders a change log table wrapper', () => {
      expect(wrapper.find('.print-change-log-table-wrapper').exists()).toBe(true)
    })

    it('renders a print header', () => {
      expect(wrapper.find('.print-header').exists()).toBe(true)
    })

    it('renders a print title', () => {
      expect(wrapper.find('h2.print-title').exists()).toBe(true)
    })

    it('renders a full name header', () => {
      expect(wrapper.find('h3.print-client-name').exists()).toBe(true)
    })

    it('renders an assessment id header', () => {
      expect(wrapper.find('h3.print-assessment-id').exists()).toBe(true)
    })

    it('renders the change log table', () => {
      expect(wrapper.find('table.print-change-log-table').exists()).toBe(true)
    })

    it('renders the change log table header row', () => {
      expect(wrapper.find('tr.print-change-table-header').exists()).toBe(true)
    })

    it('renders the change log table headers ', () => {
      expect(wrapper.find('tr.print-change-table-header').find('th').length).toEqual(3)
    })

    it('renders the change log row', () => {
      expect(wrapper.find('tr.print-change-log-row').length).toEqual(1)
    })

    it('renders the change log row data cells', () => {
      expect(wrapper.find('tr.print-change-log-row').find('td').length).toEqual(3)
    })
  })

  describe('print info', () => {
    let wrapper

    beforeEach(() => {
      const props = {
        ...defaultHistory,
        ...defaultProps,
      }
      wrapper = shallow(<PrintChangeLog {...props} />)
    })

    it('renders the full name of the client', () => {
      expect(wrapper.find('h3.print-client-name').text()).toBe('Client: Doe, Annie B')
    })

    it('renders the assessment id', () => {
      expect(wrapper.find('h3.print-assessment-id').text()).toBe('Assessment ID: 1')
    })

    it('renders a formatted date', () => {
      expect(
        wrapper
          .find('tr.print-change-log-row')
          .find('td')
          .at(0)
          .find(ChangeLogDate)
          .dive()
          .find('div')
          .text()
      ).toBe('11/01/2018 5:07:10 PM')
    })

    it('renders the change type', () => {
      expect(
        wrapper
          .find('tr.print-change-log-row')
          .find('td')
          .at(2)
          .find(ChangeLogStatus)
          .dive()
          .find('div')
          .text()
      ).toBe('Saved')
    })

    describe('name column', () => {
      it('renders a user id if no first and last name', () => {
        expect(
          wrapper
            .find('tr.print-change-log-row')
            .find('td')
            .at(1)
            .find(ChangeLogName)
            .dive()
            .find('div')
            .text()
        ).toBe('RACFID')
      })

      it('renders the last and first name', () => {
        const props = {
          history: [
            {
              user_id: 'RACFID',
              user_first_name: 'Casey',
              user_last_name: 'Test',
            },
          ],
          ...defaultProps,
        }
        const wrapper = shallow(<PrintChangeLog {...props} />)
        expect(
          wrapper
            .find('tr.print-change-log-row')
            .find('td')
            .at(1)
            .find(ChangeLogName)
            .dive()
            .find('div')
            .text()
        ).toBe('Test, Casey')
      })
    })
  })
})
