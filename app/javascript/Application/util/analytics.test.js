import { logPageAction, setNewRelicAttributes } from './analytics'

describe('Analytics', () => {
  describe('addPageAction event', () => {
    let newrelic
    beforeEach(() => {
      newrelic = { addPageAction: jest.fn() }
      window.newrelic = newrelic
    })

    it('logs an event to New Relic', () => {
      logPageAction('someAction', { key1: 'val1' })
      expect(window.newrelic.addPageAction).toHaveBeenCalledWith('someAction', { key1: 'val1' })
    })

    it('does not crash when newrelic is undefined', () => {
      window.newrelic = undefined

      expect(() => logPageAction('someAction', { key1: 'val1' })).not.toThrow()
    })

    it('does not log if an event or action is not defined', () => {
      logPageAction(null, { key1: 'val1' })
      logPageAction(undefined, { key1: 'val1' })
      expect(window.newrelic.addPageAction).not.toHaveBeenCalled()
    })

    it('logs an event when no attributes are passed', () => {
      logPageAction('someAction')
      expect(window.newrelic.addPageAction).toHaveBeenCalledWith('someAction')
    })
  })

  describe('sets custom New Relic attributes', () => {
    let newrelic
    beforeEach(() => {
      newrelic = { setCustomAttribute: jest.fn() }
      window.newrelic = newrelic
    })

    it('does not crash when newrelic is undefined', () => {
      window.newrelic = undefined

      expect(() => setNewRelicAttributes({ key1: 'val1' })).not.toThrow()
    })

    it('sets a custom attribute on New Relic', () => {
      setNewRelicAttributes({ key1: 'val1' })
      expect(window.newrelic.setCustomAttribute).toHaveBeenCalledWith('key1', 'val1')
    })

    it('does not set any attribute if attributes hash is empty', () => {
      setNewRelicAttributes({})
      expect(window.newrelic.setCustomAttribute).not.toHaveBeenCalled()
    })

    it('does not set any attribute if the attributes hash is undefined', () => {
      setNewRelicAttributes(undefined)
      setNewRelicAttributes(null)
      expect(window.newrelic.setCustomAttribute).not.toHaveBeenCalled()
    })
  })
})
