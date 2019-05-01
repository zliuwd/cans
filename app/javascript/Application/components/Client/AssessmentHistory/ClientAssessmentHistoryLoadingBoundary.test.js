import React from 'react'
import { shallow } from 'enzyme'
import ClientAssessmentHistoryLoadingBoundary from './ClientAssessmentHistoryLoadingBoundary'
import LoadingBoundary from '../../common/LoadingBoundary'
import { AssessmentService } from '../../Assessment/'

jest.mock('../../Assessment/')

describe('<ClientAssessmentHistoryLoadingBoundary />', () => {
  const render = (id, callback = () => {}) =>
    shallow(
      <ClientAssessmentHistoryLoadingBoundary clientIdentifier={id} dataFetchCallback={callback}>
        <div />
      </ClientAssessmentHistoryLoadingBoundary>
    )

  beforeEach(() => {
    AssessmentService.mockClear()
  })

  it('renders LoadingBoundary and sets props', () => {
    const wrapper = render('0PcpFQu0QM')
    const loadingBoundary = wrapper.find(LoadingBoundary)
    expect(loadingBoundary.exists()).toBeTruthy()
    expect(loadingBoundary.props().childNodeFetchedPropName).toBe('assessments')
    expect(loadingBoundary.props().fetch).toBeDefined()
    expect(loadingBoundary.props().children.type).toBe('div')
    expect(loadingBoundary.props().isHiddenWhileLoading).toEqual(false)
  })

  it('does not update if the id does not change', () => {
    const wrapper = render('XYZ')
    const firstFetch = wrapper.find(LoadingBoundary).props().fetch
    wrapper.setProps({ children: <span /> })
    const secondFetch = wrapper.find(LoadingBoundary).props().fetch
    expect(secondFetch).toBe(firstFetch)
  })

  it('calls callback after loading', async () => {
    const returnValue = ['one', 'two']
    const callbackSpy = jest.fn()
    const assessmentServiceMock = jest.spyOn(AssessmentService, 'search').mockReturnValue(Promise.resolve(returnValue))
    const wrapper = render('0PcpFQu0QM', callbackSpy)
    await wrapper.props().fetch()
    wrapper.update()
    expect(assessmentServiceMock).toHaveBeenCalledTimes(1)
    expect(callbackSpy).toHaveBeenCalledWith({ assessments: returnValue })
  })
})
