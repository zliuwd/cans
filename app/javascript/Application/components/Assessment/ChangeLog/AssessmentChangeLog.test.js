import React from 'react'
import { shallow } from 'enzyme'
import { Card, CardHeader, CardTitle, CardBody, DataGrid } from '@cwds/components'
import { Row } from 'reactstrap'
import AssessmentChangeLog from './AssessmentChangeLog'
import PrintButton from '../../common/PrintButton'

describe('<AssessmentChangeLog />', () => {
  const defaultProps = {
    client: {
      person_role: 'CLIENT',
      first_name: 'See',
      middle_name: 'K',
      last_name: 'Abbott',
      suffix: '',
      identifier: 'AdE0PWu0X5',
      external_id: '0603-9385-0313-2002051',
      dob: '2005-08-14',
      client_index_number: '',
      metadata: {},
      county: {
        id: 20,
        name: 'Madera',
        external_id: '1087',
        export_id: '20',
      },
      service_source_id: 'Bi9FgTy0X5',
      service_source_ui_id: '0665-2491-6128-2002051',
      service_source: 'REFERRAL',
      counties: [{ id: 20, name: 'Madera', external_id: '1087', export_id: '20' }],
    },
    match: { params: { id: '1' } },
  }

  it('renders nothing when there is no change log data', async () => {
    const props = {
      changeHistory: [],
      ...defaultProps,
    }
    const wrapper = shallow(<AssessmentChangeLog {...props} />)

    expect(wrapper.type()).toBe(null)
  })

  describe('page layout', () => {
    let wrapper
    const props = {
      changeHistory: [
        {
          id: 1,
          user_id: 'RACFID',
          user_first_name: 'Casey',
          user_last_name: 'Test',
          entity_id: 1,
          changed_at: '2018-11-01T17:07:10.043Z',
          change_type: 'ADD',
          changes: [],
          assessment_change_type: 'CREATED',
        },
      ],
      ...defaultProps,
    }

    beforeEach(async () => {
      wrapper = shallow(<AssessmentChangeLog {...props} />)
    })

    it('renders two Rows', async () => {
      expect(wrapper.find(Row).length).toBe(2)
    })

    it('renders a PrintButton', () => {
      expect(wrapper.find(PrintButton).exists()).toBe(true)
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
    it('renders the card title with client name and dob', () => {
      const props = {
        changeHistory: [{ changed_at: '2018-11-01T17:07:10.043Z' }],
        ...defaultProps,
      }
      const wrapper = shallow(<AssessmentChangeLog {...props} />)
      expect(
        wrapper
          .find(CardTitle)
          .dive()
          .text()
      ).toBe('CANS Change Log: Abbott, See K 08/14/2005')
    })
  })
})
