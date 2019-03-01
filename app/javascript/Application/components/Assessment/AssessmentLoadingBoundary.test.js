import React from 'react'
import { shallow } from 'enzyme'
import AssessmentLoadingBoundary from './AssessmentLoadingBoundary'
import AssessmentService from './Assessment.service'
import I18nService from '../common/I18n.service'
import LoadingBoundary from '../common/LoadingBoundary'

jest.mock('./Assessment.service')
jest.mock('../common/I18n.service')

describe('AssessmentLoadingBoundary', () => {
  const render = (instrumentId, assessmentId) =>
    shallow(
      <AssessmentLoadingBoundary instrumentId={instrumentId} assessmentId={assessmentId}>
        <div />
      </AssessmentLoadingBoundary>
    )

  const findChild = wrapper => wrapper.find(LoadingBoundary).find('div')

  it('loads the assessment', () => {
    const wrapper = render('1', '123')
    const loadingBoundary = wrapper.find(LoadingBoundary)
    expect(loadingBoundary.exists()).toBe(true)
    expect(loadingBoundary.props().childNodeFetchedPropName).toBe('assessmentWithI18n')
    expect(loadingBoundary.props().fetch).toBeDefined()
    expect(loadingBoundary.props().children.type).toBe('div')
  })

  it('does not update if the assessmentId does not change', () => {
    const wrapper = render('1', '123')
    const firstFetch = wrapper.find(LoadingBoundary).props().fetch
    wrapper.setProps({ children: <span /> })
    const secondFetch = wrapper.find(LoadingBoundary).props().fetch
    expect(secondFetch).toBe(firstFetch)
  })

  it('is not hidden while loading', () => {
    expect(render('1', '123').props().isHiddenWhileLoading).toBe(false)
  })

  describe('when given no assessmentId', () => {
    const assessmentSpy = jest.spyOn(AssessmentService, 'fetchNewAssessment')
    const i18nSpy = jest.spyOn(I18nService, 'fetchByInstrumentId')
    const instrumentId = '12121'
    let wrapper

    beforeEach(() => {
      assessmentSpy.mockReset().mockReturnValue(Promise.resolve('Assessment'))
      i18nSpy.mockReset().mockReturnValue(Promise.resolve('i18n'))
      wrapper = render(instrumentId, null)
    })

    it('loads a new assessment', () => {
      const fetch = wrapper.find(LoadingBoundary).props().fetch
      fetch()
      expect(assessmentSpy).toHaveBeenCalledTimes(1)
    })

    it('loads i18n information for the given instrument', () => {
      const fetch = wrapper.find(LoadingBoundary).props().fetch
      fetch()
      expect(i18nSpy).toHaveBeenCalledWith('12121')
    })

    it('returns both assessment and i18n in a combined object', async () => {
      const wrapper = render('12121', null)
      const fetch = wrapper.find(LoadingBoundary).props().fetch
      const fetchedValue = await fetch()
      expect(fetchedValue).toEqual({
        assessment: 'Assessment',
        i18n: 'i18n',
      })
    })
  })

  describe('when given an existing assessmentId', () => {
    const assessmentSpy = jest.spyOn(AssessmentService, 'fetch')
    const i18nSpy = jest.spyOn(I18nService, 'fetchByInstrumentId')
    const instrumentId = '90210'
    const assessmentId = '95811'
    let wrapper

    beforeEach(() => {
      assessmentSpy.mockReset().mockReturnValue(Promise.resolve('Assessment'))
      i18nSpy.mockReset().mockReturnValue(Promise.resolve('i18n'))
      wrapper = render(instrumentId, assessmentId)
    })

    it('loads a new assessment', () => {
      const fetch = wrapper.find(LoadingBoundary).props().fetch
      fetch()
      expect(assessmentSpy).toHaveBeenCalledWith('95811')
    })

    it('loads i18n information for the given instrument', () => {
      const fetch = wrapper.find(LoadingBoundary).props().fetch
      fetch()
      expect(i18nSpy).toHaveBeenCalledWith('90210')
    })

    it('returns both assessment and i18n in a combined object', async () => {
      const fetch = wrapper.find(LoadingBoundary).props().fetch
      const fetchedValue = await fetch()
      expect(fetchedValue).toEqual({
        assessment: 'Assessment',
        i18n: 'i18n',
      })
    })
  })

  describe('onSave', () => {
    const assessmentId = '55555'
    const newAssessment = { id: null }
    const updatedAssessment = { id: assessmentId }
    const i18n = 'i18n'
    const postSpy = jest.spyOn(AssessmentService, 'postAssessment').mockReturnValue(Promise.resolve(updatedAssessment))
    const updateSpy = jest.spyOn(AssessmentService, 'update').mockReturnValue(Promise.resolve(updatedAssessment))
    const i18nSpy = jest.spyOn(I18nService, 'fetchByInstrumentId').mockReturnValue(Promise.resolve(i18n))

    beforeEach(() => {
      postSpy.mockReset()
      updateSpy.mockReset()
      i18nSpy.mockReset()
    })

    it('updates the fetch function', () => {
      const wrapper = render('1', assessmentId)
      const onSave = findChild(wrapper).props().onSave

      const firstFetch = wrapper.find(LoadingBoundary).props().fetch

      onSave(updatedAssessment)
      wrapper.update()

      const secondFetch = wrapper.find(LoadingBoundary).props().fetch
      expect(secondFetch).not.toBe(firstFetch)
    })

    it('posts the assessment when it is new', async () => {
      const wrapper = render('1', null)
      const onSave = findChild(wrapper).props().onSave

      onSave(newAssessment)
      wrapper.update()
      const newFetch = wrapper.find(LoadingBoundary).props().fetch
      newFetch()

      expect(postSpy).toHaveBeenCalledWith(newAssessment)
      expect(updateSpy).not.toHaveBeenCalled()
    })

    it('updates assessment when it already exists', () => {
      const wrapper = render('1', assessmentId)
      const onSave = findChild(wrapper).props().onSave

      onSave(updatedAssessment)
      wrapper.update()
      const newFetch = wrapper.find(LoadingBoundary).props().fetch
      newFetch()

      expect(postSpy).not.toHaveBeenCalled()
      expect(updateSpy).toHaveBeenCalledWith(assessmentId, updatedAssessment)
    })

    it('updates when a previously new assessment has been saved twice', () => {
      const wrapper = render('1', null)
      const onSave = findChild(wrapper).props().onSave

      onSave(newAssessment)
      wrapper.update()
      const postFetch = wrapper.find(LoadingBoundary).props().fetch
      postFetch()

      expect(postSpy).toHaveBeenCalledWith(newAssessment)
      expect(updateSpy).not.toHaveBeenCalled()

      onSave(updatedAssessment)
      wrapper.update()
      const updateFetch = wrapper.find(LoadingBoundary).props().fetch
      updateFetch()

      expect(updateSpy).toHaveBeenCalledWith(assessmentId, updatedAssessment)
    })
  })
})
