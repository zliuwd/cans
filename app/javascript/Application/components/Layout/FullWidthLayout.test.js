import React from 'react'
import { shallow } from 'enzyme'
import FullWidthLayout from './FullWidthLayout'
import ReactWoodDuckLayout from './ReactWoodDuckLayout'
import DesignSystemLayout from './DesignSystemLayout'
import { navigation } from '../../util/constants'
import * as Features from '../../util/features'

jest.mock('../../util/features')

describe('Full Width Layout', () => {
  const isDesignSystemLayoutEnabled = jest.spyOn(Features, 'isDesignSystemLayoutEnabled')

  it('renders a ReactWoodDuckLayout', () => {
    isDesignSystemLayoutEnabled.mockReturnValue(false)
    expect(shallow(<FullWidthLayout navigateTo={navigation.CHILD_LIST} />).type()).toBe(ReactWoodDuckLayout)
  })

  it('renders a DesignSystemLayout when enabled', () => {
    isDesignSystemLayoutEnabled.mockReturnValue(true)
    expect(shallow(<FullWidthLayout navigateTo={navigation.CHILD_LIST} />).type()).toBe(DesignSystemLayout)
  })
})
