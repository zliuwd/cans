import React from 'react'
import { shallow } from 'enzyme'
import { LoadingState } from '../../util/loadingHelper'
import AssessmentStatusMessages from './AssessmentStatusMessages'
import * as AssessmentHelper from './AssessmentHelper'

jest.mock('./AssessmentHelper')

describe('AssessmentStatusMessages', () => {
  const render = ({
    loadingState = LoadingState.waiting,
    isCompleted = false,
    isEditable = true,
    url = '/path',
  } = {}) =>
    shallow(
      <AssessmentStatusMessages
        loadingState={loadingState}
        isCompleted={isCompleted}
        isEditable={isEditable}
        url={url}
      />
    )

  it('posts a save success message when the loading state transitions from updating to ready', () => {
    const postSuccessMessageSpy = jest.spyOn(AssessmentHelper, 'postSuccessMessage')

    const wrapper = render({ loadingState: LoadingState.updating, url: '/path/to/here' })
    wrapper.setProps({ loadingState: LoadingState.ready })

    expect(postSuccessMessageSpy).toHaveBeenCalledWith('/path/to/here', AssessmentHelper.successMsgFrom.SAVE)
  })

  it('closes messages on unmount', () => {
    const postCloseMessageSpy = jest.spyOn(AssessmentHelper, 'postCloseMessage')
    const wrapper = render()
    wrapper.unmount()

    expect(postCloseMessageSpy).toHaveBeenCalledWith('readonlyMessage')
  })

  it('posts a readonly message if the assessment is not editable and not completed', () => {
    const postInfoMessageSpy = jest.spyOn(AssessmentHelper, 'postInfoMessage').mockReset()
    render({ isCompleted: false, isEditable: false })

    expect(postInfoMessageSpy).toHaveBeenCalledWith({
      messageId: 'readonlyMessage',
      message: 'This CANS is under the jurisdiction of another county. Available for view only.',
    })
  })

  it('posts a readonly message if the assessment is completed', () => {
    const postInfoMessageSpy = jest.spyOn(AssessmentHelper, 'postInfoMessage').mockReset()
    render({ isCompleted: true, isEditable: false })

    expect(postInfoMessageSpy).toHaveBeenCalledWith({
      messageId: 'readonlyMessage',
      message: 'This assessment was completed and is available for view only.',
    })
  })

  it('posts a readonly message if the assessment transitions from in progress to completed', () => {
    const postInfoMessageSpy = jest.spyOn(AssessmentHelper, 'postInfoMessage').mockReset()
    const wrapper = render({ isCompleted: false, isEditable: true })
    expect(postInfoMessageSpy).not.toHaveBeenCalled()

    wrapper.setProps({ isCompleted: true, isEditable: false })

    expect(postInfoMessageSpy).toHaveBeenCalledWith({
      messageId: 'readonlyMessage',
      message: 'This assessment was completed and is available for view only.',
    })
  })

  it('posts no readonly message if the assessment is editable', () => {
    const postInfoMessageSpy = jest.spyOn(AssessmentHelper, 'postInfoMessage').mockReset()
    render({ isEditable: true })

    expect(postInfoMessageSpy).not.toHaveBeenCalled()
  })

  it('renders nothing directly', () => {
    const wrapper = render()
    expect(wrapper.type()).toBe(null)
  })
})
