import React from 'react'
import { mount } from 'enzyme'
import PrintCaregiverName from './PrintCaregiverName'

const fakePropsWithName = {
  name: 'some name',
}

describe('<PrintCaregiverName />', () => {
  it('will render caregiver name', () => {
    const wrapper = mount(<PrintCaregiverName {...fakePropsWithName} />)
    const target = wrapper.find('#caregiverNameText')
    expect(target.text()).toContain(fakePropsWithName.name)
    wrapper.unmount()
  })
})
