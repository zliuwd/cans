import React from 'react'
import { shallow } from 'enzyme'
import { Link, MemoryRouter } from 'react-router-dom'
import { buildSaveAssessmentButton, buildSearchClientsButton } from './PageHeaderButtonsBuilder'

describe('<PageHeaderButtonsBuilder />', () => {
  it('#buildSaveAssessmentButton()', () => {
    const saveAssessmentButton = shallow(buildSaveAssessmentButton(jest.fn(), false))
    const buttonProps = saveAssessmentButton.find('button').props()
    expect(buttonProps.disabled).toBeTruthy()
    expect(saveAssessmentButton.find('i').props().className).toContain('fa-save')
    expect(saveAssessmentButton.find('span').text()).toBe('Save')
  })

  it('#buildSearchClientsButton()', () => {
    const clientSearchButton = shallow(<MemoryRouter>{buildSearchClientsButton()}</MemoryRouter>)
    expect(clientSearchButton.find(Link).props().to).toContain('/search')
    expect(clientSearchButton.find('i').props().className).toContain('fa-search')
    expect(clientSearchButton.find('span').text()).toBe('Client Search')
  })
})
