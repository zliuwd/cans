import { globalAlertService } from './GlobalAlertService'
import { alertType } from '../components/common/CloseableAlert'

describe('GlobalAlertService', () => {
  describe('Subscribes and posts error', () => {
    it('has default error message', () => {
      let alert
      globalAlertService.subscribe(a => {
        alert = a
      })
      globalAlertService.postError({})
      expect(alert.type).toEqual(alertType.DANGER)
      expect(alert.message).toEqual('An error has occurred')
    })

    it('can use custom message', () => {
      let alert
      globalAlertService.subscribe(a => {
        alert = a
      })
      globalAlertService.postError({ message: 'Some message' })
      expect(alert.type).toEqual(alertType.DANGER)
      expect(alert.message).toEqual('Some message')
    })
  })

  describe('postSuccess', () => {
    it('posts success message', () => {
      let alert
      globalAlertService.subscribe(a => {
        alert = a
      })
      globalAlertService.postSuccess({ message: 'Success message' })
      expect(alert.type).toEqual(alertType.SUCCESS)
      expect(alert.message).toEqual('Success message')
      expect(alert.isAutoCloseable).toEqual(true)
    })
  })

  describe('postInfo', () => {
    it('posts info message', () => {
      let alert
      globalAlertService.subscribe(a => {
        alert = a
      })
      globalAlertService.postInfo({ message: 'Info message' })
      expect(alert.type).toEqual(alertType.INFO)
      expect(alert.message).toEqual('Info message')
      expect(alert.isAutoCloseable).toEqual(true)
    })
  })

  describe('closeAlert', () => {
    it('should post CLOSE_ALERT_EVENT', () => {
      let event
      globalAlertService.subscribeCloseAlert(a => {
        event = a
      })
      globalAlertService.closeAlert('mId')
      expect(event.messageId).toEqual('mId')
    })
  })

  describe('props propagation', () => {
    it('should propagate componentId and messageId on postError', () => {
      let alert
      globalAlertService.subscribe(a => {
        alert = a
      })
      globalAlertService.postError({ message: 'Some message', componentId: 'cId', messageId: 'mId' })
      expect(alert.message).toEqual('Some message')
      expect(alert.messageId).toEqual('mId')
      expect(alert.componentId).toEqual('cId')
    })

    it('should propagate componentId and messageId on postSuccess', () => {
      let alert
      globalAlertService.subscribe(a => {
        alert = a
      })
      globalAlertService.postSuccess({ message: 'Some message', componentId: 'cId', messageId: 'mId' })
      expect(alert.message).toEqual('Some message')
      expect(alert.messageId).toEqual('mId')
      expect(alert.componentId).toEqual('cId')
    })

    it('should propagate componentId and  messageId on postInfo', () => {
      let alert
      globalAlertService.subscribe(a => {
        alert = a
      })
      globalAlertService.postInfo({ message: 'Some message', componentId: 'cId', messageId: 'mId' })
      expect(alert.message).toEqual('Some message')
      expect(alert.messageId).toEqual('mId')
      expect(alert.componentId).toEqual('cId')
    })
  })
})
