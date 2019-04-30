import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import { shallow } from 'enzyme'
import Domain from './Domain'
import { DomainItemList, DomainCaregiverControls } from './'
import DomainComment from './DomainComment'
import { Label } from 'reactstrap'

const domainDefault = {
  id: '1',
  class: 'domain',
  code: 'BEHEMO',
  under_six: true,
  above_six: false,
  items: [
    {
      under_six_id: '',
      above_six_id: '1',
      code: '1',
      required: true,
      confidential: false,
      rating_type: 'REGULAR',
      rating: -1,
    },
  ],
}

const i18nDefault = {
  'BEHEMO._title_': 'Title',
  'BEHEMO._description_': 'Description',
}

const testExpandingEvent = {
  type: 'keydown',
  target: {
    getBoundingClientRect: () => {
      return { top: 100 }
    },
  },
}

describe('<Domain />', () => {
  jest.unmock('../../util/assessmentAutoScroll')
  const autoScroll = require.requireActual('../../util/assessmentAutoScroll')
  autoScroll.expandingThenScroll = jest.fn(() => null)
  const expandingThenScroll = autoScroll.expandingThenScroll

  const shallowRender = ({
    key = '1',
    canReleaseConfidentialInfo = true,
    domain = { ...domainDefault },
    disabled = false,
    isAssessmentUnderSix = true,
    i18nAll = { ...i18nDefault },
    index = 1,
    onItemCommentUpdate = () => {},
    onDomainCommentUpdate = () => {},
    onExpandedChange = () => {},
    onRatingUpdate = () => {},
    onConfidentialityUpdate = () => {},
    onAddCaregiverDomain = () => {},
    handleWarningShow = () => {},
    onCaregiverNameUpdate = () => {},
    onDomainReviewed = () => {},
    isCompletedAssessment = false,
    isUsingPriorRatings = false,
    isExpanded = false,
  } = {}) =>
    shallow(
      <Domain
        key={key}
        canReleaseConfidentialInfo={canReleaseConfidentialInfo}
        domain={domain}
        disabled={disabled}
        isAssessmentUnderSix={isAssessmentUnderSix}
        i18nAll={i18nAll}
        index={index}
        onItemCommentUpdate={onItemCommentUpdate}
        onDomainCommentUpdate={onDomainCommentUpdate}
        onExpandedChange={onExpandedChange}
        onRatingUpdate={onRatingUpdate}
        onConfidentialityUpdate={onConfidentialityUpdate}
        onAddCaregiverDomain={onAddCaregiverDomain}
        handleWarningShow={handleWarningShow}
        onCaregiverNameUpdate={onCaregiverNameUpdate}
        onDomainReviewed={onDomainReviewed}
        isCompletedAssessment={isCompletedAssessment}
        isUsingPriorRatings={isUsingPriorRatings}
        isExpanded={isExpanded}
      />
    )

  afterEach(() => {
    expandingThenScroll.mockReset()
  })

  it('renders with no exceptions', () => {
    expect(() => shallowRender()).not.toThrow()
  })

  it('renders nothing when there is no title', () => {
    const i18n = { ...i18nDefault, 'BEHEMO._title_': undefined }
    const wrapper = shallowRender({ i18nAll: i18n })
    expect(wrapper.type()).toBe(null)
  })

  it('defaults the description to "No Description"', () => {
    const i18n = { ...i18nDefault, 'BEHEMO._description_': undefined }
    const wrapper = shallowRender({ i18nAll: i18n })
    expect(wrapper.find('DomainPanelSummary').props().description).toBe('No Description')
  })

  describe('Open to review', () => {
    const onDomainReviewed = jest.fn()
    const onExpandedChange = jest.fn()
    let wrapper

    beforeEach(() => {
      onDomainReviewed.mockReset()
      wrapper = shallowRender({
        onDomainReviewed,
        onExpandedChange,
        isUsingPriorRatings: true,
      })
    })

    it('passes isReviewed false to DomainPanelSummary when domain.is_reviewed is undefined', () => {
      expect(wrapper.find('DomainPanelSummary').props().isReviewed).toBe(false)
    })

    it('calls onDomainReviewed when expanded if not already reviewed', () => {
      wrapper.instance().handleExpandedChange(testExpandingEvent)
      expect(onDomainReviewed.mock.calls.length).toBe(1)
    })

    it('does not call onDomainReviewed when expanded if already reviewed', () => {
      const originalDomain = wrapper.instance().props.domain
      wrapper.setProps({ domain: { ...originalDomain, is_reviewed: true } })
      wrapper.instance().handleExpandedChange(testExpandingEvent)
      expect(onDomainReviewed).not.toHaveBeenCalled()
    })

    it('does not call onDomainReviewed when expanded if not using previous ratings', () => {
      onDomainReviewed.mockReset()
      wrapper.setProps({ isUsingPriorRatings: false })
      wrapper.instance().handleExpandedChange(testExpandingEvent)
      expect(onDomainReviewed).not.toHaveBeenCalled()
    })

    it('calls onExpandedChange callback when expand is toggled', () => {
      wrapper.setProps({ isExpanded: false })
      wrapper
        .find(ExpansionPanel)
        .props()
        .onChange(testExpandingEvent)
      expect(onExpandedChange).toHaveBeenCalledWith(1, true)
    })

    it('calls onExpandedChange callback when collapse is toggled', () => {
      wrapper.setProps({ isExpanded: true })
      wrapper
        .find(ExpansionPanel)
        .props()
        .onChange(testExpandingEvent)
      expect(onExpandedChange).toHaveBeenCalledWith(1, false)
    })

    it('can be collapsed from domain comment', () => {
      const handleExpandedChange = jest.fn()
      wrapper.setProps({ onExpandedChange: handleExpandedChange, isExpanded: true })
      wrapper
        .find(DomainComment)
        .props()
        .domainBottomCollapseClick(testExpandingEvent)
      expect(handleExpandedChange).toHaveBeenCalledWith(1, false)
    })
  })

  it('when domain expands expandingThenScroll will be invoked', () => {
    const wrapper = shallowRender()
    wrapper.instance().handleExpandedChange(testExpandingEvent)
    expect(expandingThenScroll).toHaveBeenCalledTimes(1)
  })

  it('should propagate onItemCommentUpdate from props to DomainItemList props', () => {
    const onItemCommentUpdateMock = jest.fn()
    const wrapper = shallowRender({
      onItemCommentUpdate: onItemCommentUpdateMock,
      isExpanded: true,
    })
    expect(wrapper.find(DomainItemList).props().onItemCommentUpdate).toBe(onItemCommentUpdateMock)
  })

  it('should render ItemList when extended', () => {
    const wrapper = shallowRender({ isExpanded: true })
    expect(wrapper.find(DomainItemList).exists()).toBe(true)
  })

  it('should skip rendering ItemList on mount if collapsed', () => {
    // This is to speed up initial rendering of the assessment
    const wrapper = shallowRender()
    expect(wrapper.find(DomainItemList).exists()).toBe(false)
  })

  it('should render ItemList in second cycle after mount if collapsed', async () => {
    const wrapper = shallowRender()
    await wrapper.instance().componentDidUpdate()
    wrapper.update()
    expect(wrapper.find(DomainItemList).exists()).toBe(true)
  })

  describe('DomainComment', () => {
    it('should render domain comment when extended', () => {
      const wrapper = shallowRender({ isExpanded: true })
      expect(wrapper.find(DomainComment).length).toBe(1)
    })

    it('should propogate onDomainCommentUpdate prop to DomainComment props', () => {
      const onDomainCommentUpdateMock = jest.fn()
      const wrapper = shallowRender({
        isExpanded: true,
        onDomainCommentUpdate: onDomainCommentUpdateMock,
      })
      expect(wrapper.find(DomainComment).props().onDomainCommentUpdate).toBe(onDomainCommentUpdateMock)
    })

    it('should propogate props domainBottomCollapseClick to DomainComment', () => {
      const wrapper = shallowRender({ isExpanded: true })
      const target = wrapper.find(DomainComment)
      expect(Object.keys(target.props()).includes('domainBottomCollapseClick')).toBe(true)
    })
  })

  describe('caregiver domain', () => {
    const callbackMock = jest.fn()
    const handleWarningShow = jest.fn()
    const domain = { ...domainDefault, is_caregiver_domain: true, caregiver_index: 'a' }
    let wrapper
    beforeEach(() => {
      wrapper = shallowRender({
        domain: { ...domain },
        handleWarningShow,
        isExpanded: true,
        onAddCaregiverDomain: callbackMock,
      })
    })

    it('will render DomainCaregiverControls', () => {
      expect(wrapper.find(DomainCaregiverControls).exists()).toBe(true)
    })

    it('warning modal will show when remove caregiver domain', () => {
      wrapper.instance().handleRemoveCaregiverDomain(testExpandingEvent)
      expect(handleWarningShow.mock.calls.length).toBe(1)
    })

    it('invokes handleWarningShow() callback', () => {
      handleWarningShow.mockReset()
      const onRemoveCaregiverDomain = wrapper.find(DomainCaregiverControls).props().onRemoveCaregiverDomain
      onRemoveCaregiverDomain({ type: 'click' })
      onRemoveCaregiverDomain({ type: 'keypress', key: 'Enter' })
      onRemoveCaregiverDomain({ type: 'keypress', key: 'Space' }) // Ignored, not a11y allowed
      expect(handleWarningShow).toHaveBeenCalledTimes(2)
    })

    it('will invoke onAddCaregiverDomain() callback', () => {
      const onAddCaregiverDomain = wrapper.find(DomainCaregiverControls).props().onAddCaregiverDomain
      onAddCaregiverDomain({ type: 'click' })
      onAddCaregiverDomain({ type: 'keypress', key: 'Enter' })
      onAddCaregiverDomain({ type: 'keypress', key: 'Space' }) // Ignored, not a11y allowed
      expect(callbackMock.mock.calls.length).toBe(2)
    })

    describe('caregiver name', () => {
      describe('#handleCaregiverNameUpdate()', () => {
        describe('when caregiver name is changed', () => {
          it('updates domain header with the updated name', () => {
            // given
            const domain = {
              ...domainDefault,
              is_caregiver_domain: true,
              caregiver_index: 'a',
              caregiver_name: undefined,
            }
            const wrapper = shallowRender({
              domain,
              isExpanded: true,
            })
            const nameInput = wrapper.find('.caregiver-name')

            // when
            nameInput.props().onChange({
              target: { value: 'Full Name' },
            })

            // then
            expect(wrapper.state().caregiverName).toEqual('Full Name')
            expect(wrapper.find('DomainPanelSummary').props().caregiverName).toMatch(/Full Name/)
            expect(wrapper.find(Label).text()).toEqual('Caregiver Name *')
          })
        })

        describe('when caregiver name input blurs', () => {
          it('invokes onCaregiverNameUpdate() callback', () => {
            // given
            const domain = {
              ...domainDefault,
              is_caregiver_domain: true,
              caregiver_index: 'a',
              caregiver_name: undefined,
            }
            const callbackMock = jest.fn()
            const wrapper = shallowRender({
              domain,
              isExpanded: true,
              onCaregiverNameUpdate: callbackMock,
            })
            const nameInput = wrapper.find('.caregiver-name')
            nameInput.props().onChange({
              target: { value: 'Full Name' },
            })

            // when
            nameInput.props().onBlur()

            // then
            expect(callbackMock.mock.calls.length).toBe(1)
            expect(callbackMock.mock.calls[0][0]).toBe('a')
            expect(callbackMock.mock.calls[0][1]).toBe('Full Name')
          })
        })
      })
    })
  })

  describe('read only mode', () => {
    const callbackMock = jest.fn()
    const domain = { ...domainDefault, is_caregiver_domain: true, caregiver_index: 'a' }
    let domainWrapper

    beforeEach(() => {
      domainWrapper = shallowRender({
        domain: { ...domain },
        isExpanded: true,
        onAddCaregiverDomain: callbackMock,
        disabled: true,
      })
    })

    it('should propagate disabled prop to caregiver-name input', () => {
      expect(domainWrapper.find('.caregiver-name').prop('disabled')).toBe(true)
    })

    it('should propagate disabled prop to <DomainItemList/>', () => {
      expect(domainWrapper.find(DomainItemList).prop('disabled')).toBe(true)
    })

    it('should propagate disabled prop to <DomainComment/>', () => {
      expect(domainWrapper.find('DomainComment').prop('disabled')).toBe(true)
    })

    it('should hide <DomainCaregiverControls/> when disables=true ', () => {
      expect(domainWrapper.find(DomainCaregiverControls).length).toBe(0)
    })
  })

  it('should collapse when isExpanded is false ', () => {
    const onItemCommentUpdateMock = jest.fn()
    const domainWrapper = shallowRender({
      onItemCommentUpdate: onItemCommentUpdateMock,
    })
    expect(domainWrapper.find(ExpansionPanel).props().expanded).toBe(false)
  })

  it('should expand the domain when isExpanded is true', () => {
    const onItemCommentUpdateMock = jest.fn()
    const domainWrapper = shallowRender({
      isExpanded: true,
      onItemCommentUpdate: onItemCommentUpdateMock,
    })
    expect(domainWrapper.find(ExpansionPanel).props().expanded).toBe(true)
  })
})
