import React from 'react'
import { mount, shallow } from 'enzyme'
import HasCaregiverQuestion from './HasCaregiverQuestion'

describe('<HasCaregiverQuestion />', () => {
  const defaultProps = { hasCaregiver: false, onHasCaregiverChange: () => {}, onHasCaregiverNoClicked: () => {} }
  const render = props => shallow(<HasCaregiverQuestion {...props} />)

  it('renderHasCaregiverQuestion() returns correct label text', () => {
    const wrapper = mount(
      <HasCaregiverQuestion hasCaregiver={true} onHasCaregiverChange={() => {}} onHasCaregiverNoClicked={() => {}} />
    )
    expect(
      wrapper
        .find('Typography')
        .first()
        .text()
    ).toBe('Child/Youth has Caregiver?')
  })

  it('renders yes and no options', () => {
    const radioGroup = render({ ...defaultProps, hasCaregiver: true }).find('RadioGroup')

    expect(radioGroup.find('#has-caregiver-yes').props().value).toBe('true')
    expect(radioGroup.find('#has-caregiver-no').props().value).toBe('false')
  })

  it('selects true when assessment has a caregiver', () => {
    const wrapper = render({ ...defaultProps, hasCaregiver: true })
    expect(wrapper.find('RadioGroup').props().value).toBe('true')
  })

  it('selects false when assessment has no caregiver', () => {
    const wrapper = render({ ...defaultProps, hasCaregiver: false })
    expect(wrapper.find('RadioGroup').props().value).toBe('false')
  })

  it('calls onHasCaregiverChange when group selection changes', () => {
    const onHasCaregiverChange = jest.fn()
    const wrapper = render({ ...defaultProps, onHasCaregiverChange })
    const args = { foo: 'bar' }
    wrapper
      .find('RadioGroup')
      .props()
      .onChange(args)
    expect(onHasCaregiverChange).toHaveBeenCalledWith(args)
  })

  it('calls onHasCaregiverNoClicked when No is selected', () => {
    const onHasCaregiverNoClicked = jest.fn()
    const wrapper = render({ ...defaultProps, onHasCaregiverNoClicked })
    const args = { foo: 'bar' }
    wrapper
      .find('#has-caregiver-no')
      .props()
      .control.props.onClick(args)
    expect(onHasCaregiverNoClicked).toHaveBeenCalledWith(args)
  })

  it('propagates disabled prop to #has-caregiver', () => {
    const wrapper = render({ ...defaultProps, disabled: true })
    expect(wrapper.find('#has-caregiver').prop('disabled')).toEqual(true)
  })
})
