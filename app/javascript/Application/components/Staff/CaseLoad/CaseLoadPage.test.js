import React from 'react'
import { shallow } from 'enzyme'
import CaseLoadPage from './CaseLoadPage'
import ClientsLoadingBoundary from './ClientsLoadingBoundary'
import { ClientListCard } from '../../Client'

describe('<CaseLoadPage />', () => {
  const render = (staffId = 'ABC') => shallow(<CaseLoadPage staffId={staffId} />)

  it('renders ClientListCard within a ClientsLoadingBoundary', () => {
    const wrapper = render()
    expect(
      wrapper
        .find(ClientsLoadingBoundary)
        .find(ClientListCard)
        .exists()
    ).toBe(true)
  })

  it('passes its staffId to the loading boundary', () => {
    const wrapper = render('WWW')
    expect(wrapper.find(ClientsLoadingBoundary).props().staffId).toBe('WWW')
  })
})
