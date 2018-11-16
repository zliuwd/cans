import React from 'react'
import { shallow } from 'enzyme'
import ConfidentialityAlert from './ConfidentialityAlert'

describe('<ConfidentialityAlert />', () => {
  it('renders an Alert component when canReleaseInformation is false', () => {
    const wrapper = shallow(<ConfidentialityAlert canReleaseInformation={false} />)
    const alert = wrapper.find('Alert')
    expect(alert.exists()).toBe(true)
    expect(alert.html()).toMatch(
      'By selecting NO, Items 7, 48, and EC 41 (Substance Use Disorder Items) from this CANS assessment will be redacted when printed.'
    )
  })

  it('renders no Alert component when canReleaseInformation is true', () => {
    const wrapper = shallow(<ConfidentialityAlert canReleaseInformation={true} />)
    expect(wrapper.type()).toBe(null)
  })
})
