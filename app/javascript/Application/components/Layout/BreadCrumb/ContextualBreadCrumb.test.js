import React from 'react'
import { shallow } from 'enzyme'
import { navigation } from '../../../util/constants'
import ContextualBreadCrumb from './ContextualBreadCrumb'
import CurrentUserLoadingBoundary from '../../common/CurrentUserLoadingBoundary'
import BreadCrumbsBuilder from './BreadCrumbsBuilder'

describe('ContextualBreadCrumb', () => {
  it('renders a BreadCrumbsBuilder inside a CurrentUserLoadingBoundary', () => {
    const wrapper = shallow(<ContextualBreadCrumb navigateTo={navigation.STAFF_LIST} />)
    const breadcrumb = wrapper.find(BreadCrumbsBuilder)
    expect(breadcrumb.exists()).toBe(true)
    expect(breadcrumb.parent().type()).toBe(CurrentUserLoadingBoundary)
  })

  it('passes all props to BreadCrumbsBuilder', () => {
    const props = {
      string: 'ABC',
      number: 123,
      object: { key: 'value', otherKey: 42 },
      array: [1, 'A', {}],
      navigateTo: navigation.STAFF_LIST,
    }

    const builder = shallow(<ContextualBreadCrumb {...props} />).find(BreadCrumbsBuilder)

    Object.entries(props).forEach(([prop, value]) => {
      expect(builder.prop(prop)).toBe(value)
    })
  })
})
