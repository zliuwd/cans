import React from 'react'
import ExternalLink from './ExternalLink'
import { shallow } from 'enzyme'
import pageLockService from './PageLockService'

describe('<ExternalLink>', () => {
  const props = { href: 'href', text: 'text' }
  const event = { preventDefault: jest.fn() }
  let externalLink

  beforeEach(() => {
    externalLink = shallow(<ExternalLink {...props} />)
  })

  it('confirmLeavePage prevents event, asks for confirmation', () => {
    pageLockService.confirm = jest.fn()
    externalLink.instance().confirmLeavePage(event)
    expect(pageLockService.confirm).toHaveBeenCalledWith(externalLink.instance().leavePage)
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
  })

  it('leavePage changes location', () => {
    pageLockService.unlock = jest.fn()
    global.document.location.assign = jest.fn()
    externalLink.instance().leavePage()
    expect(pageLockService.unlock).toHaveBeenCalledTimes(1)
    expect(global.document.location.assign).toHaveBeenCalledWith(externalLink.instance().props.href)
  })

  it('ExternalLink renders link with onClick event handler', () => {
    expect(externalLink.find('a').length).toBe(1)
    expect(
      externalLink
        .find('a')
        .at(0)
        .props().onClick
    ).toBe(externalLink.instance().confirmLeavePage)
  })
})
