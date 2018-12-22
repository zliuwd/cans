import { eventBus } from './eventBus'
import { alertType } from '../components/common'

const ALERT_EVENT = 'ALERT_EVENT'
const CLOSE_ALERT_EVENT = 'CLOSE_ALERT_EVENT'

class GlobalAlertService {
  subscribe = callback => {
    eventBus.subscribe(ALERT_EVENT, callback)
  }

  subscribeCloseAlert = callback => {
    eventBus.subscribe(CLOSE_ALERT_EVENT, callback)
  }

  postError = ({ message, isAutoCloseable = true, componentId, messageId }) => {
    this.postAlert({
      type: alertType.DANGER,
      message: message || 'An error has occurred',
      isAutoCloseable,
      componentId,
      messageId,
    })
  }

  postSuccess = ({ message, isAutoCloseable = true, componentId, messageId }) => {
    this.postAlert({ type: alertType.SUCCESS, message, isAutoCloseable, componentId, messageId })
  }

  postInfo = ({ message, isAutoCloseable = true, componentId, messageId }) => {
    this.postAlert({ type: alertType.INFO, message, isAutoCloseable, componentId, messageId })
  }

  postAlert = ({ type, message, isAutoCloseable = true, componentId, messageId }) => {
    eventBus.post(ALERT_EVENT, {
      type,
      message,
      isAutoCloseable,
      componentId,
      messageId,
    })
  }

  closeAlert = messageId => {
    eventBus.post(CLOSE_ALERT_EVENT, { messageId })
  }
}

export const globalAlertService = new GlobalAlertService()
