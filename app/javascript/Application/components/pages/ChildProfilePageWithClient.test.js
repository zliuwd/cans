import React from 'react'
import { shallow } from 'enzyme'
import ChildProfilePageWithClient from './ChildProfilePageWithClient'
import ClientLoadingBoundary from './ClientLoadingBoundary'
import ChildProfilePage from './ChildProfilePage'

describe('ChildProfilePageLoadingBoundary', () => {
  it('renders a ChildProfilePage within a ClientLoadingBoundary', () => {
    const match = { params: { staffId: 'ABC', clientId: '123' }, url: '/my/url' }
    const wrapper = shallow(<ChildProfilePageWithClient match={match} />)
    const page = wrapper.find(ChildProfilePage)
    expect(page.exists()).toBe(true)
    expect(page.parent().type()).toBe(ClientLoadingBoundary)
  })

  it('uses the clientId from match params', () => {
    const clientId = 'zxcvbn'
    const match = { params: { staffId: 'ABC', clientId }, url: '/my/url' }
    const wrapper = shallow(<ChildProfilePageWithClient match={match} />)

    expect(wrapper.find(ClientLoadingBoundary).props().clientId).toBe(clientId)
  })
})
