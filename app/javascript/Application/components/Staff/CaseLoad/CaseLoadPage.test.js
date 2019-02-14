import React from 'react'
import { shallow } from 'enzyme'
import CaseLoadPage from './CaseLoadPage'
import ClientsLoadingBoundary from './ClientsLoadingBoundary'
import { ClientListCard } from '../../Client'
import StaffLoadingBoundary from '../StaffLoadingBoundary'
import SubordinateInfoCard from './SubordinateInfoCard/SubordinateInfoCard'

jest.mock('../../../util/CurrentUser')

describe('<CaseLoadPage />', () => {
  const render = staffId => shallow(<CaseLoadPage staffId={staffId} />, { disableLifecycleMethods: true })

  it('renders SubordinateInfoCard within a StaffLoadingBoundary', async () => {
    const wrapper = render('ABC')
    expect(
      wrapper
        .find(StaffLoadingBoundary)
        .find(SubordinateInfoCard)
        .exists()
    ).toBeTruthy()
  })

  it('passes its staffId to the StaffLoadingBoundary', () => {
    const wrapper = render('WWW')
    expect(wrapper.find(StaffLoadingBoundary).props().staffId).toBe('WWW')
  })

  it('renders ClientListCard within a ClientsLoadingBoundary', () => {
    const wrapper = render('ABC')
    expect(
      wrapper
        .find(ClientsLoadingBoundary)
        .find(ClientListCard)
        .exists()
    ).toBe(true)
  })

  it('passes its staffId to the ClientsLoadingBoundary', () => {
    const wrapper = render('WWW')
    expect(wrapper.find(ClientsLoadingBoundary).props().staffId).toBe('WWW')
  })
})
