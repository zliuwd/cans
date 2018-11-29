import React from 'react'
import { shallow } from 'enzyme'
import { Link, MemoryRouter } from 'react-router-dom'
import {
  buildSaveAssessmentButton,
  buildPrintAssessmentButton,
  buildSearchClientsButton,
} from './PageHeaderButtonsBuilder'

describe('<PageHeaderButtonsBuilder />', () => {
  it('#buildSaveAssessmentButton()', () => {
    const saveAssessmentButton = shallow(buildSaveAssessmentButton(jest.fn(), false))
    const buttonProps = saveAssessmentButton.find('button').props()
    expect(buttonProps.disabled).toBeTruthy()
    expect(saveAssessmentButton.find('i').props().className).toContain('fa-save')
    expect(saveAssessmentButton.find('span').text()).toBe('Save')
  })

  it('#buildPrintAssessmentButton()', () => {
    const saveAssessmentButton = shallow(buildPrintAssessmentButton(jest.fn()))
    expect(saveAssessmentButton.find('i').props().className).toContain('fa-print')
    expect(saveAssessmentButton.find('span').text()).toBe('Print')
  })

  it('#buildSearchClientsButton()', () => {
    const saveAssessmentButton = shallow(<MemoryRouter>{buildSearchClientsButton()}</MemoryRouter>)
    expect(saveAssessmentButton.find(Link).props().to).toContain('/search')
    expect(saveAssessmentButton.find('i').props().className).toContain('fa-search')
    expect(saveAssessmentButton.find('span').text()).toBe('Client Search')
  })
})
