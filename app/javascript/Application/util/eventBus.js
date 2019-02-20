class EventBus {
  eventCallbacksPairs = []
  subscribe(eventType, callback) {
    const eventCallbacksPair = this.findEventCallbacksPair(eventType)

    if (eventCallbacksPair) {
      eventCallbacksPair.callbacks.push(callback)
    } else {
      this.eventCallbacksPairs.push(new EventCallbacksPair(eventType, callback))
    }
  }

  post(eventType, args) {
    const eventCallbacksPair = this.findEventCallbacksPair(eventType)

    if (!eventCallbacksPair) {
      return
    }

    eventCallbacksPair.callbacks.forEach(callback => callback(args))
  }

  unsubscribe(eventType, callback) {
    const eventCallbacksPair = this.findEventCallbacksPair(eventType)
    if (eventCallbacksPair) {
      eventCallbacksPair.callbacks.splice(eventCallbacksPair.callbacks.indexOf(callback), 1)
    }
  }

  findEventCallbacksPair(eventType) {
    return this.eventCallbacksPairs.find(eventObject => eventObject.eventType === eventType)
  }
}

function EventCallbacksPair(eventType, callback) {
  this.eventType = eventType
  this.callbacks = [callback]
}

export const eventBus = new EventBus()
