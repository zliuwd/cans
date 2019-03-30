import { isFirefox } from '../../util/common'

const firefoxPrint = (frame, contentString) => {
  frame.focus()
  frame.contentDocument.body.innerHTML = ''
  frame.contentDocument.write('<!DOCTYPE html>')
  frame.contentDocument.write(contentString)
  frame.contentWindow.print()
}

const nonFirefoxPrint = (frame, contentString) => {
  const frameContentWindow = frame.contentWindow
  frameContentWindow.focus()
  frameContentWindow.document.open()
  frameContentWindow.document.write('<!DOCTYPE html>')
  frameContentWindow.document.write(contentString)
  frameContentWindow.document.close()

  frameContentWindow.print()
}

export const print = (printFrameId, contentString) => {
  const frame = document.getElementById(printFrameId)
  if (isFirefox) {
    firefoxPrint(frame, contentString)
  }
  nonFirefoxPrint(frame, contentString)
}
