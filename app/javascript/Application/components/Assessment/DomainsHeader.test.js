import React from 'react'
import { shallow } from 'enzyme'
import { Button, CardHeader } from '@cwds/components'
import DomainsHeader from './DomainsHeader'

describe('DomainsHeader Card', () => {
  describe('when loading', () => {
    const props = { isUnderSix: false, isDefaultExpanded: false }
    const domainsHeaderWrapper = shallow(<DomainsHeader {...props} />)
    it('has a card header', () => {
      expect(domainsHeaderWrapper.find(CardHeader).exists()).toBe(true)
    })
  })
})

describe('Expand and Collapse Domains based on isDefaultExpanded logic', () => {
  it('Collapse all domains when isDefaultExpanded is false ', () => {
    const props = {
      isUnderSix: false,
      isDefaultExpanded: false,
    }
    const domainsHeaderWrapper = shallow(<DomainsHeader {...props} />)
    expect(domainsHeaderWrapper.find(Button).props().children).toEqual('Expand All')
  })

  it('Expands all domains when isDefaultExpanded is true ', () => {
    const props = {
      isUnderSix: true,
      isDefaultExpanded: true,
    }
    const domainsHeaderWrapper = shallow(<DomainsHeader {...props} />)
    expect(domainsHeaderWrapper.find(Button).props().children).toEqual('Collapse All')
  })
})

describe('Age Range based on age range selection', () => {
  it('Displays Age Range 0-5 when isUnderSix is true ', () => {
    const props = {
      isUnderSix: true,
    }
    const domainsHeaderWrapper = shallow(<DomainsHeader {...props} />)
    expect(domainsHeaderWrapper.find('span').text()).toEqual('Age Range 0-5')
  })

  it('Displays Age Range 6-21 when isUnderSix is false ', () => {
    const props = {
      isUnderSix: false,
    }
    const domainsHeaderWrapper = shallow(<DomainsHeader {...props} />)
    expect(domainsHeaderWrapper.find('span').text()).toEqual('Age Range 6-21')
  })
})
