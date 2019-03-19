import pageLockService from './PageLockService'
import { getPageRoute } from '../../util/common'

describe('PageLockService', () => {
  let tryAction
  let unblock
  let action
  let event

  beforeEach(() => {
    tryAction = jest.fn()
    unblock = jest.fn()
    action = jest.fn()
    event = {
      preventDefault: jest.fn(),
      retrunValue: 'retrunValue',
    }
    pageLockService.history.block = jest.fn(() => {
      return unblock
    })
  })

  it('verify lock', () => {
    pageLockService.lock(tryAction)
    expect(pageLockService.pageLock.tryAction).toBe(tryAction)
    expect(pageLockService.pageLock.unblock).toBe(unblock)
  })

  it('verify that user confirmation unlocks page', () => {
    pageLockService.unlock()
    const unlock = jest.spyOn(pageLockService, 'unlock')
    pageLockService.newPath = '/'
    pageLockService.getUserConfirmation('', jest.fn())
    expect(unlock).toHaveBeenCalledTimes(1)
  })

  it('verify unlock', () => {
    pageLockService.unlock()
    expect(pageLockService.pageLock).toBeUndefined()
  })

  it('tries the action when locked and confirmed', () => {
    pageLockService.lock(tryAction)
    pageLockService.confirm(action)
    expect(tryAction).toHaveBeenCalledWith(action, {})
  })

  it('does the action when unlocked and confirmed', () => {
    pageLockService.lock(tryAction)
    pageLockService.unlock()
    pageLockService.confirm(action)
    expect(tryAction).not.toHaveBeenCalled()
    expect(action).toHaveBeenCalledTimes(1)
  })

  it('cancels unload event when locked', () => {
    pageLockService.lock(tryAction)
    pageLockService.onBeforeUnload(event)
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect(event.returnValue).toBe('')
  })

  it('does not cancel unload event when unlocked', () => {
    pageLockService.unlock()
    pageLockService.onBeforeUnload(event)
    expect(event.preventDefault).not.toHaveBeenCalled()
    expect(event.returnValue).not.toBe('')
  })

  it('postpones history change', () => {
    window.history.pushState = jest.fn()
    pageLockService.lock(tryAction)
    pageLockService.onPopState()
    expect(window.history.pushState).toHaveBeenCalledWith({}, null, pageLockService.pageLock.pageUrl)
    expect(pageLockService.newPath).toBe(getPageRoute())
  })
})
