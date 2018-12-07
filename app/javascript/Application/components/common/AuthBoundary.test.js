import React from 'react'
import { shallow } from 'enzyme'
import AuthBoundary, { buildCreateAssessmentPermission, buildCompleteAssessmentPermission } from './AuthBoundary'
import SecurityService from './Security.service'
import LoadingBoundary from './LoadingBoundary'
import { Button } from '@cwds/components'

jest.mock('./Security.service')

describe('<AuthBoundary />', () => {
  const defaultProps = {
    permission: 'entity:write:id',
  }

  const render = props =>
    shallow(
      <AuthBoundary {...props}>
        <Button>Title</Button>
      </AuthBoundary>
    )

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('renders LoadingBoundary and sets props', async () => {
    const wrapper = await render(defaultProps)
    const loadingBoundary = wrapper.find(LoadingBoundary)
    expect(loadingBoundary.prop('childNodeFetchedPropName')).toEqual('disabled')
    expect(loadingBoundary.prop('fetch')).toBeDefined()
  })

  describe('fetch', () => {
    it('returns disabled=false when the user has permissions', async () => {
      const checkPermissionSpy = jest.spyOn(SecurityService, 'checkPermission').mockReturnValue(Promise.resolve(true))
      const wrapper = await render(defaultProps)
      const loadingBoundary = wrapper.find(LoadingBoundary)
      const fetch = loadingBoundary.props().fetch
      expect(await fetch()).toBe(false)
      expect(checkPermissionSpy).toHaveBeenCalledTimes(1)
    })

    it('returns disabled=true when the user does not have permissions', async () => {
      const checkPermissionSpy = jest.spyOn(SecurityService, 'checkPermission').mockReturnValue(Promise.resolve(false))
      const wrapper = await render(defaultProps)
      const loadingBoundary = wrapper.find(LoadingBoundary)
      const fetch = loadingBoundary.props().fetch
      expect(await fetch()).toBe(true)
      expect(checkPermissionSpy).toHaveBeenCalledTimes(1)
    })

    it('returns disabled=true when the user has permissions but andCondition=false', async () => {
      const checkPermissionSpy = jest.spyOn(SecurityService, 'checkPermission').mockReturnValue(Promise.resolve(true))
      const wrapper = await render({ ...defaultProps, andCondition: false })
      const loadingBoundary = wrapper.find(LoadingBoundary)
      const fetch = loadingBoundary.props().fetch
      expect(await fetch()).toBe(true)
      expect(checkPermissionSpy).toHaveBeenCalledTimes(1)
    })

    it('returns disabled=false when the user has permissions and andCondition function return true', async () => {
      const checkPermissionSpy = jest.spyOn(SecurityService, 'checkPermission').mockReturnValue(Promise.resolve(true))
      const wrapper = await render({ ...defaultProps, andCondition: () => true })
      const loadingBoundary = wrapper.find(LoadingBoundary)
      const fetch = loadingBoundary.props().fetch
      expect(await fetch()).toBe(false)
      expect(checkPermissionSpy).toHaveBeenCalledTimes(1)
    })

    it('returns disabled=false when the does not have permissions but orCondition=true', async () => {
      const checkPermissionSpy = jest.spyOn(SecurityService, 'checkPermission').mockReturnValue(Promise.resolve(false))
      const wrapper = await render({ ...defaultProps, orCondition: true })
      const loadingBoundary = wrapper.find(LoadingBoundary)
      const fetch = loadingBoundary.props().fetch
      expect(await fetch()).toBe(false)
      expect(checkPermissionSpy).toHaveBeenCalledTimes(1)
    })

    it('returns disabled=false when the does not have permissions but orCondition function return true', async () => {
      const checkPermissionSpy = jest.spyOn(SecurityService, 'checkPermission').mockReturnValue(Promise.resolve(false))
      const wrapper = await render({ ...defaultProps, orCondition: () => true })
      const loadingBoundary = wrapper.find(LoadingBoundary)
      const fetch = loadingBoundary.props().fetch
      expect(await fetch()).toBe(false)
      expect(checkPermissionSpy).toHaveBeenCalledTimes(1)
    })
  })
})

describe('buildCreateAssessmentPermission', () => {
  it('returns correct value', () => {
    const clientIdentifier = 'aaa'
    expect(buildCreateAssessmentPermission(clientIdentifier)).toEqual('client:createAssessment:aaa')
  })
})

describe('buildCompleteAssessmentPermission', () => {
  it('returns client:completeAssessment when assessment.id = null', () => {
    const assessment = {
      id: null,
      person: { identifier: 'aaa' },
    }
    expect(buildCompleteAssessmentPermission(assessment)).toEqual('client:completeAssessment:aaa')
  })

  it('returns client:completeAssessment when assessment.id = undefined', () => {
    const assessment = {
      person: { identifier: 'aaa' },
    }
    expect(buildCompleteAssessmentPermission(assessment)).toEqual('client:completeAssessment:aaa')
  })

  it('returns assessment:complete when assessment.id defined', () => {
    const assessment = {
      id: 1,
      person: { identifier: 'aaa' },
    }
    expect(buildCompleteAssessmentPermission(assessment)).toEqual('assessment:complete:1')
  })

  it('returns empty string when assessment is undefined', () => {
    expect(buildCompleteAssessmentPermission(undefined)).toEqual(undefined)
  })

  it('returns empty string when object is not an assessment object', () => {
    expect(buildCompleteAssessmentPermission({})).toEqual(undefined)
  })
})
