import { isFirefox } from '../../util/common'

const firefoxPrint = (frame, contentString) => {
  const oldTitle = document.title
  document.title = '\u200E'
  const curURL = window.location.href
  history.replaceState(history.state, '', '/')
  frame.focus()
  frame.contentDocument.body.innerHTML = ''
  frame.contentDocument.write('<!DOCTYPE html>')
  frame.contentDocument.write(contentString)
  frame.contentWindow.print()
  history.replaceState(history.state, '', curURL)
  document.title = oldTitle
}

const nonFirefoxPrint = (frame, contentString) => {
  const frameContentWindow = frame.contentWindow
  const oldTitle = document.title
  document.title = '\u200E'
  const curURL = window.location.href
  history.replaceState(history.state, '', '/')
  frameContentWindow.focus()
  frameContentWindow.document.open()
  frameContentWindow.document.write('<!DOCTYPE html>')
  frameContentWindow.document.write(contentString)
  frameContentWindow.document.close()
  frameContentWindow.print()
  history.replaceState(history.state, '', curURL)
  document.title = oldTitle
}

export const print = (printFrameId, contentString) => {
  const frame = document.getElementById(printFrameId)
  if (isFirefox) {
    return firefoxPrint(frame, contentString)
  }
  return nonFirefoxPrint(frame, contentString)
}
