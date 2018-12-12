import React from 'react'
import { shallow, mount } from 'enzyme'
import Card from '@material-ui/core/Card/Card'
import CardHeader from '@material-ui/core/CardHeader/index'
import CardContent from '@material-ui/core/CardContent/index'
import Grid from '@material-ui/core/Grid/Grid'
import { ClientAssessmentHistory } from './index'
import AssessmentService from '../Assessment/Assessment.service'
import ClientAssessmentHistoryRecord from './ClientAssessmentHistoryRecord'
import SecurityService from '../common/Security.service'

jest.mock('../Assessment/Assessment.service')
jest.mock('../common/Security.service')

const params = {
  clientIdentifier: 'aaaaaaaaaa',
  location: { pathname: '/client' },
  history: { location: '/client' },
}

const getShallowWrapper = () => {
  AssessmentService.search.mockReturnValue(
    Promise.resolve([
      { id: 1, person: { id: 1, identifier: 'aaaaaaaaaa' }, county: { name: 'Yolo' } },
      { id: 2, person: { id: 2, identifier: 'bbbbbbbbbb' }, county: { name: 'Yolo' } },
    ])
  )
  return shallow(<ClientAssessmentHistory {...params} />)
}

const prepareWrapper = async mockedAssessments => {
  // given
  AssessmentService.search.mockReturnValue(Promise.resolve(mockedAssessments))
  const wrapper = shallow(<ClientAssessmentHistory {...params} />)

  // when
  await wrapper.instance().componentDidMount()
  wrapper.update()
  return wrapper
}

describe('<ClientAssessmentHistory', () => {
  describe('components', () => {
    const getLength = component => getShallowWrapper().find(component).length

    it('renders with 1 <Grid /> component', () => {
      expect(getLength(Grid)).toBe(1)
    })

    it('renders with 1 <Card /> component', () => {
      expect(getLength(Card)).toBe(1)
    })

    it('renders with 1 <CardHeader /> component', () => {
      expect(getLength(CardHeader)).toBe(1)
    })

    it('renders with <CardContent /> component', () => {
      expect(getLength(CardContent)).toBe(1)
    })

    it('renders with <Button /> in the Card header', async () => {
      jest.spyOn(SecurityService, 'checkPermission').mockReturnValue(Promise.resolve(true))
      const wrapper = await prepareWrapper([{ id: 1 }, { id: 2 }])
      const cardHeader = wrapper.find(CardHeader)
      const actionWrapper = await mount(cardHeader.dive().props().action)
      const button = shallow(actionWrapper.prop('children'))
      expect(button.exists()).toBe(true)
      expect(
        button
          .find('#new-cans-button')
          .dive()
          .text()
      ).toBe('New CANS')
    })
  })

  describe('assessment history', () => {
    describe('when 2 records', () => {
      it('renders 2 assessments', async () => {
        // given + when
        const wrapper = await prepareWrapper([{ id: 1 }, { id: 2 }])

        // then
        expect(wrapper.find(ClientAssessmentHistoryRecord).length).toBe(2)
      })
    })

    describe('when 0 records', () => {
      it('renders the empty message', async () => {
        // given + when
        const wrapper = await prepareWrapper([])

        // then
        const message = wrapper.find('#no-data').text()
        expect(message).toBe('No assessments currently exist for this child/youth.')
      })
    })
  })
})
