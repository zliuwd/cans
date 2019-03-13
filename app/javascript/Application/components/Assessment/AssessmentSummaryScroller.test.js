import React from 'react'
import { shallow } from 'enzyme'
import { LoadingState } from '../../util/loadingHelper'
import * as AssessmentAutoScroll from '../../util/assessmentAutoScroll'
import AssessmentSummaryScroller from './AssessmentSummaryScroller'

jest.mock('../../util/assessmentAutoScroll')

describe('AssessmentSummaryScroller', () => {
  const render = ({
    canDisplaySummaryOnSave = true,
    loadingState = LoadingState.waiting,
    scrollTarget = 0,
    targetAdjustment = 0,
  } = {}) =>
    shallow(
      <AssessmentSummaryScroller
        canDisplaySummaryOnSave={canDisplaySummaryOnSave}
        loadingState={loadingState}
        scrollTarget={scrollTarget}
        targetAdjustment={targetAdjustment}
      />
    )

  it('renders nothing directly', () => {
    const wrapper = render()
    expect(wrapper.type()).toBe(null)
  })

  it('scrolls to the assessment summary when the assessment is saved', () => {
    const completeAutoScrollSpy = jest.spyOn(AssessmentAutoScroll, 'completeAutoScroll').mockReset()
    const scrollTarget = 100
    const targetAdjustment = 15

    const wrapper = render({ loadingState: LoadingState.updating, scrollTarget, targetAdjustment })
    wrapper.setProps({ loadingState: LoadingState.ready })

    expect(completeAutoScrollSpy).toHaveBeenCalledWith(scrollTarget, targetAdjustment)
  })

  it('does not scroll if the assessment cannot be displayed on save', () => {
    const completeAutoScrollSpy = jest.spyOn(AssessmentAutoScroll, 'completeAutoScroll').mockReset()
    const scrollTarget = 100
    const targetAdjustment = 15

    const wrapper = render({
      canDisplaySummaryOnSave: false,
      loadingState: LoadingState.updating,
      scrollTarget,
      targetAdjustment,
    })
    wrapper.setProps({ loadingState: LoadingState.ready })

    expect(completeAutoScrollSpy).not.toHaveBeenCalled()
  })

})
