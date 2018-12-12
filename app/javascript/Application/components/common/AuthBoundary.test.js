import React from 'react'
import { shallow, mount } from 'enzyme'
import AuthBoundary from './AuthBoundary'
import SecurityService from './Security.service'
import { Button } from '@cwds/components'

jest.mock('./Security.service')

describe('<AuthBoundary />', () => {
  const defaultPermission = 'entity:write:id'
  const defaultProps = {
    permission: defaultPermission,
  }

  const checkPermissionSpy = jest.spyOn(SecurityService, 'checkPermission')

  const render = props =>
    shallow(
      <AuthBoundary {...props}>
        <Button>Title</Button>
      </AuthBoundary>
    )

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('renders AuthBoundary and children', async () => {
    checkPermissionSpy.mockReturnValue(Promise.resolve(true))
    const wrapper = await render(defaultProps)
    expect(wrapper.instance().props.permission).toEqual(defaultPermission)
  })

  it('rerenders on permission change', async () => {
    checkPermissionSpy.mockReturnValue(Promise.resolve(true))
    const authBoundary = mount(
      <AuthBoundary {...defaultProps}>
        <Button>Title</Button>
      </AuthBoundary>
    )
    await authBoundary.setProps({ permission: 'other:permission', eagerRefreshFlagObject: { value: 'changed' } })
    await authBoundary.setProps({ permission: 'other:permission', eagerRefreshFlagObject: { value: 'changed' } })
    expect(checkPermissionSpy).toHaveBeenCalledTimes(2)
    await authBoundary.setProps({ permission: 'other:permission', eagerRefreshFlagObject: { value: 'changed2' } })
    expect(checkPermissionSpy).toHaveBeenCalledTimes(3)
  })

  describe('fetch', () => {
    it('returns disabled=false when the user has permissions', async () => {
      checkPermissionSpy.mockReturnValue(Promise.resolve(true))
      const wrapper = await render(defaultProps)
      expect(wrapper.instance().isDisabled()).toBe(false)
      expect(checkPermissionSpy).toHaveBeenCalledTimes(1)
    })

    it('returns disabled=true when the user does not have permissions', async () => {
      const checkPermissionSpy = jest.spyOn(SecurityService, 'checkPermission').mockReturnValue(Promise.resolve(false))
      const wrapper = await render(defaultProps)
      expect(wrapper.instance().isDisabled()).toBe(true)
      expect(checkPermissionSpy).toHaveBeenCalledTimes(1)
    })

    it('returns disabled=true when the user has permissions but andCondition=false', async () => {
      const checkPermissionSpy = jest.spyOn(SecurityService, 'checkPermission').mockReturnValue(Promise.resolve(true))
      const wrapper = await render({ ...defaultProps, andCondition: false })
      expect(wrapper.instance().isDisabled()).toBe(true)
      expect(checkPermissionSpy).toHaveBeenCalledTimes(1)
    })

    it('returns disabled=false when the does not have permissions but orCondition=true', async () => {
      const checkPermissionSpy = jest.spyOn(SecurityService, 'checkPermission').mockReturnValue(Promise.resolve(false))
      const wrapper = await render({ ...defaultProps, orCondition: true })
      expect(wrapper.instance().isDisabled()).toBe(false)
      expect(checkPermissionSpy).toHaveBeenCalledTimes(1)
    })
  })
})
