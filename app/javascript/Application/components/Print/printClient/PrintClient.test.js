import React from 'react'
import { shallow } from 'enzyme'
import { defaultClient } from '../../Client/client.mock'
import PrintClient from './PrintClient'
import Print from '../Print'
import PrintClientInfo from './PrintClientInfo'
import PrintClientHistory from './PrintClientHistory'
import PrintClientAssessmentComparison from './PrintClientAssessmentComparison'
import { assessment } from '../../Assessment/assessment.mocks.test'
import { ageRange } from '../../Client/AssessmentComparison/AssessmentComparisonHelper'

describe('<PrintClient/>', () => {
  const client = { ...defaultClient }
  const printDataHistory = {
    assessments: [assessment],
  }
  const printDataComparision = {
    currentDataKey: ageRange.UNDERSIX,
    comparisonData: {
      underSix: {
        data: {
          event_dates: [],
          domains: [],
        },
      },
      aboveSix: {},
    },
    i18n: {},
  }
  const defaultProps = { client: client, printData: printDataHistory }
  const render = props => shallow(<PrintClient {...props} />)
  it('renders with correct props', () => {
    const wrapper = render(defaultProps)
    expect(wrapper.instance().props.client).toEqual(client)
    expect(wrapper.instance().props.shouldPrint).toBeFalsy()
  })

  it('should render <Print/>', () => {
    const onClose = jest.fn()
    const props = { ...defaultProps, onClose }
    const wrapper = render(props)
    const printWrapper = wrapper.find(Print)
    expect(printWrapper.exists()).toBeTruthy()
    expect(printWrapper.props().onClose).toBe(onClose)
  })

  describe('print`s node prop', () => {
    const printNode = printClientProps => {
      const wrapper = render(printClientProps)
      const printWrapper = wrapper.find(Print)
      return shallow(printWrapper.props().node)
    }
    it('should render <PrintClientInfo/>', () => {
      expect(
        printNode(defaultProps)
          .find(PrintClientInfo)
          .exists()
      ).toBeTruthy()
    })

    it('should render <PrintClientHistory/>', () => {
      expect(
        printNode(defaultProps)
          .find(PrintClientHistory)
          .exists()
      ).toBeTruthy()
    })

    it('should render <PrintClientAssessmentComparison/>', () => {
      const props = { ...defaultProps, printData: printDataComparision }
      expect(
        printNode(props)
          .find(PrintClientAssessmentComparison)
          .exists()
      ).toBeTruthy()
    })
  })
})
