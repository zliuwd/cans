import React from 'react'
import { shallow } from 'enzyme'
import ClientDateOfBirth from './ClientDateOfBirth'

describe('ClientDateOfBirth', () => {
  const render = ({ dob, isEstimated } = {}) => shallow(<ClientDateOfBirth dob={dob} isEstimated={isEstimated} />)

  it('renders an empty string with date of birth is not valid', () => {
    expect(render().text()).toBe('')
  })

  it('renders the date of birth when valid', () => {
    expect(render({ dob: '2017-02-01' }).text()).toBe('DOB: 02/01/2017')
  })

  it('renders an estimated date of birth', () => {
    expect(render({ dob: '2017-02-01', isEstimated: true }).text()).toBe('DOB: 02/01/2017 (approx.)')
  })
})
