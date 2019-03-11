import React from 'react'
import { shallow } from 'enzyme'
import AssessmentPageHeader from './AssessmentPageHeader'

describe('AssessmentPageHeader', () => {
  const fakeAssessment = { state: { under_six: true } }
  const i18n = {}
  let updateHeaderButtons
  let updateHeaderButtonsToDefault
  let pageHeaderButtonsController

  const render = pageHeaderButtonsController =>
    shallow(
      <AssessmentPageHeader
        assessment={fakeAssessment}
        i18n={i18n}
        isEditable={true}
        isSaveButtonEnabled={true}
        isValidDate={true}
        onSaveAssessment={() => {}}
        pageHeaderButtonsController={pageHeaderButtonsController}
      />
    )

  beforeEach(() => {
    updateHeaderButtons = jest.fn()
    updateHeaderButtonsToDefault = jest.fn()
    pageHeaderButtonsController = {
      updateHeaderButtons,
      updateHeaderButtonsToDefault,
    }
  })

  it('renders nothing', () => {
    expect(render(pageHeaderButtonsController).type()).toBe(null)
  })

  it('needs more tests', () => {
    expect(true).toBe(false)
  })
})
