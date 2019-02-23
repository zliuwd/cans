import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import { Routes } from './routes'
import TimeoutWarning from './components/common/TimeoutWarning'

describe('<App />', () => {
  const getWrapper = () => shallow(<App />)
  const getLength = component => getWrapper().find(component).length

  it('renders with <TimeoutWarning /> component', () => {
    expect(getLength(TimeoutWarning)).toBe(1)
  })

  it('renders with <Routes /> component', () => {
    const wrapper = getWrapper()
    expect(wrapper.find(Routes).length).toBe(1)
  })
})
