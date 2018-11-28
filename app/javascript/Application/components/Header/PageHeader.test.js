import React from 'react'
import PageHeader from './PageHeader'
import { PageHeader as WoodDuckHeader } from 'react-wood-duck'
import { shallow } from 'enzyme'
import { navigation } from '../../util/constants'

describe('<PageHeader />', () => {
  it('should render <WoodDuckHeader /> with buttons', () => {
    const buttonLeft = <div className={'button-left'} />
    const buttonRight = <div className={'button-right'} />
    const expectedButtonsBlock = (
      <div className={'header-buttons-block'}>
        <div className={'button-left'} />
        <div className={'button-right'} />
      </div>
    )
    const wrapper = shallow(
      <PageHeader leftButton={buttonLeft} navigateTo={navigation.CHILD_PROFILE} rightButton={buttonRight} />
    )
    const woodDuckHeaderProps = wrapper.find(WoodDuckHeader).props()
    expect(woodDuckHeaderProps.button).toEqual(expectedButtonsBlock)
    expect(woodDuckHeaderProps.pageTitle).toBe('CANS Assessment Application')
  })

  describe('page title propagation to <WoodDuckHeader />', () => {
    it('should send "CANS Communimetric Assessment Form" title when new assessment page', () => {
      const wrapper = shallow(<PageHeader navigateTo={navigation.ASSESSMENT_ADD} />)
      expect(wrapper.find(WoodDuckHeader).props().pageTitle).toEqual('CANS Communimetric Assessment Form')
    })

    it('should send "CANS Communimetric Assessment Form" title when existent assessment page', () => {
      const wrapper = shallow(<PageHeader navigateTo={navigation.ASSESSMENT_EDIT} />)
      expect(wrapper.find(WoodDuckHeader).props().pageTitle).toEqual('CANS Communimetric Assessment Form')
    })

    it('should send default title for other pages', () => {
      const wrapper = shallow(<PageHeader navigateTo={navigation.CLIENT_SEARCH} />)
      expect(wrapper.find(WoodDuckHeader).props().pageTitle).toEqual('CANS Assessment Application')
    })
  })
})
