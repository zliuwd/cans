export const logPageAction = (actionName, attributes) => {
  if (!window.newrelic || !actionName) {
    return
  }

  if (attributes) {
    window.newrelic.addPageAction(actionName, attributes)
  } else {
    window.newrelic.addPageAction(actionName)
  }
}
export const setNewRelicAttributes = attributes => {
  if (window.newrelic && attributes) {
    Object.keys(attributes).map(key => {
      window.newrelic.setCustomAttribute(key, attributes[key])
    })
  }
}
