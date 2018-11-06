import React from 'react'
import { shallow } from 'enzyme'
import ClientSocialWorkerCard from './ClientSocialWorkerCard'
import { LoadingState } from '../../util/loadingHelper'
import ClientListCard from './ClientListCard'

describe('<ClientListCard />', () => {
  const render = (clients, loadingState) => shallow(<ClientListCard clients={clients} loadingState={loadingState} />)

  it('renders a ClientSocialWorkerCard', () => {
    const card = render([]).find(ClientSocialWorkerCard)
    expect(card.exists()).toBe(true)
  })

  it('hard codes the sort props', () => {
    const card = render([]).find(ClientSocialWorkerCard)
    expect(card.props().defaultSortSetting).toEqual([
      {
        id: 'fullName',
        asc: true,
      },
    ])
  })

  it('sets loading to true when not ready', () => {
    const wrapper = render([], LoadingState.waiting)
    expect(wrapper.props().loading).toBe(true)
  })

  it('sets loading to false when ready', () => {
    const wrapper = render([], LoadingState.ready)
    expect(wrapper.props().loading).toBe(false)
  })

  it('sets loading to false when error', () => {
    const wrapper = render([], LoadingState.error)
    expect(wrapper.props().loading).toBe(false)
  })

  it('passes clients to the card as data', () => {
    const clients = [{ foo: 'foo' }, { bar: 'bar' }]
    const wrapper = render(clients, LoadingState.ready)
    expect(wrapper.props().data).toBe(clients)
  })

  it('sets the title based on the number of clients', () => {
    const clients = [{ foo: 'foo' }, { bar: 'bar' }, { baz: 'baz' }]
    const wrapper = render(clients, LoadingState.ready)
    expect(wrapper.props().title).toBe(clients.length)
  })
})
