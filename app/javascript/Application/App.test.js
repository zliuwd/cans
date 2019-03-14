import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import { Routes } from './routes'
import TimeoutWarning from './components/common/TimeoutWarning'
import CurrentUserLoadingBoundary from './components/common/CurrentUserLoadingBoundary'
import UserFeatures from './util/UserFeatures'

describe('<App />', () => {
  const getWrapper = () => shallow(<App />)
  const exists = component =>
    getWrapper()
      .find(component)
      .exists()

  it('renders with <CurrentUserLoadingBoundary /> component', () => {
    expect(exists(CurrentUserLoadingBoundary)).toBeTruthy()
  })

  it('renders with <UserFeatures /> component', () => {
    expect(exists(UserFeatures)).toBeTruthy()
  })

  it('renders with <TimeoutWarning /> component', () => {
    expect(exists(TimeoutWarning)).toBeTruthy()
  })

  it('renders with <Routes /> component', () => {
    expect(exists(Routes)).toBeTruthy()
  })
})
