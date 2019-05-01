import React from 'react'
import { shallow } from 'enzyme'
import PrintClientInfo from './PrintClientInfo'
import { defaultClient } from '../../Client/client.mock'
import { isoToLocalDate } from '../../../util/dateHelper'

const defaultProps = { client: defaultClient }
const render = (props = defaultProps) => shallow(<PrintClientInfo {...props} />)
const defaultWrapper = render()

describe('<PrintClientInfo', () => {
  it('should be rendered', () => {
    expect(defaultWrapper.find('#print-client-info').exists()).toBeTruthy()
  })

  it('renders client`s info header', () => {
    const find = defaultWrapper.find('#print-client-info-header')
    expect(find.exists()).toBeTruthy()
    expect(find.text()).toContain('Client Information')
  })

  it('renders client`s first name', () => {
    const find = defaultWrapper.find('#client-info-firstName')
    expect(find.exists()).toBeTruthy()
    expect(find.text()).toContain(defaultClient.first_name)
  })

  it('renders client`s middle name', () => {
    const find = defaultWrapper.find('#client-info-middleName')
    expect(find.exists()).toBeTruthy()
    expect(find.text()).toContain(defaultClient.middle_name)
  })

  it('renders client`s last name', () => {
    const find = defaultWrapper.find('#client-info-lastName')
    expect(find.exists()).toBeTruthy()
    expect(find.text()).toContain(defaultClient.last_name)
  })

  it('renders client`s date of birth', () => {
    const find = defaultWrapper.find('#client-info-dob')
    expect(find.exists()).toBeTruthy()
    expect(find.text()).toContain(isoToLocalDate(defaultClient.dob))
  })

  it('renders client`s county', () => {
    const find = defaultWrapper.find('#client-info-county')
    expect(find.exists()).toBeTruthy()
    expect(find.text()).toContain(defaultClient.county.name)
  })

  it('renders client`s id', () => {
    const find = defaultWrapper.find('#client-info-id')
    expect(find.exists()).toBeTruthy()
    expect(find.text()).toContain(defaultClient.external_id)
  })
})
