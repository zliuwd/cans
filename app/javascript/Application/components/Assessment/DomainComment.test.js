import React from 'react'
import { shallow, mount } from 'enzyme'
import DomainComment from './DomainComment'
import Comment from '../common/Comment'
import CommentIcon from '../common/CommentIcon'
import BottomCollapseIcon from './BottomCollapseIcon'

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
const domainWithComment = {
  ...domainDefault,
  comment: 'Domain test comment',
  domainBottomCollapseClick: jest.fn(),
}

const defaultProps = {
  id: 'commenta',
  title: 'familiaDomain',
  domain: { ...domainDefault },
  onDomainCommentUpdate: () => {},
  domainBottomCollapseClick: jest.fn(),
}

const propsWithComment = {
  id: 'commenta',
  title: 'familiaDomain',
  domain: { ...domainWithComment },
  onDomainCommentUpdate: () => {},
  domainBottomCollapseClick: jest.fn(),
}

const domainCommentDefault = <DomainComment {...defaultProps} />
const domainCommentWithComment = <DomainComment {...propsWithComment} />

describe('<DomainComment />', () => {
  jest.unmock('../../util/assessmentAutoScroll')
  const autoScroll = require.requireActual('../../util/assessmentAutoScroll')
  autoScroll.expandingThenScroll = jest.fn(() => null)
  const expandingThenScroll = autoScroll.expandingThenScroll
  afterEach(() => {
    expandingThenScroll.mockReset()
  })

  describe('Expand/Collapse', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount({ ...domainCommentDefault })
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('has chevron right icon to expand', () => {
      const foldedText = wrapper.text()
      const chevron = wrapper.find('Icon#BEHEMO-comment-accordion-expand')
      expect(chevron.props().icon).toBe('chevron-down')
      expect(chevron.props().rotation).toBe(270)
      expect(foldedText).toMatch(/Comment/)
    })

    it('expands and has chevron down icon ', () => {
      wrapper.find('Icon#BEHEMO-comment-accordion-expand').simulate('click')
      const expandedText = wrapper.text()
      const chevron = wrapper.find('Icon#BEHEMO-comment-accordion-expand')
      expect(chevron.props().icon).toBe('chevron-down')
      expect(chevron.props().rotation).toBe(null)
      expect(expandedText).toMatch(/Comment/)
    })

    it('when chevron button get focus and press tab accordion will not expand', async () => {
      wrapper.find('Icon#BEHEMO-comment-accordion-expand').simulate('keydown', { key: 'Tab' })
      expect(wrapper.instance().state.isExpanded).toEqual(false)
    })

    it('when chevron button get focus and press a key other than Tab, accordion will expand', async () => {
      wrapper.find('Icon#BEHEMO-comment-accordion-expand').simulate('keydown', { key: 'Enter' })
      expect(wrapper.instance().state.isExpanded).toEqual(true)
    })

    it('when comment item expanded, expandingThenScroll will be invoked ', async () => {
      wrapper.find('Icon#BEHEMO-comment-accordion-expand').simulate('click')
      expect(wrapper.instance().state.isExpanded).toEqual(true)
      expect(expandingThenScroll).toHaveBeenCalledTimes(1)
    })
  })

  it('has a title', async () => {
    const wrapper = mount({ ...domainCommentDefault })
    const foldedText = wrapper.text()
    expect(foldedText).toMatch(/Comment/)

    wrapper.find('Icon#BEHEMO-comment-accordion-expand').simulate('click')
    const expandedText = wrapper.text()
    expect(expandedText).toMatch(/Comment/)
  })

  describe('#handleDomainCommentChange()', () => {
    it('should propagate handleDomainCommentChange to onChange Comment prop', () => {
      const onDomainCommentUpdateMock = jest.fn()
      const wrapper = shallow(
        <DomainComment
          id={'commenta'}
          title={'familiaDomain'}
          domain={{ ...domainWithComment }}
          onDomainCommentUpdate={onDomainCommentUpdateMock}
          domainBottomCollapseClick={jest.fn()}
        />
      )
      wrapper.setState({ isExpanded: true })
      wrapper
        .find(Comment)
        .props()
        .onChange('new comment')
      expect(onDomainCommentUpdateMock).toHaveBeenCalledTimes(1)
      expect(onDomainCommentUpdateMock).toHaveBeenCalledWith('BEHEMO', 'new comment', undefined)
    })
  })

  describe('CommentIcon in the domain comment accordion', () => {
    it('should render CommentIcon with domain-comment-accordion-comment-icon style', () => {
      const wrapper = shallow(domainCommentWithComment)
      const commentIcon = wrapper.find(CommentIcon)
      expect(commentIcon.props().className.includes('domain-comment-accordion-comment-icon')).toBeTruthy()
    })

    it('should not render CommentIcon if the domain has no comment', () => {
      const wrapper = shallow(domainCommentDefault)
      const commentIcon = wrapper.find(CommentIcon)
      expect(commentIcon.exists()).toBe(false)
    })

    it('should render CommentIcon if the domain has a comment', () => {
      const wrapper = shallow(domainCommentWithComment)
      const commentIcon = wrapper.find(CommentIcon)
      expect(commentIcon.exists()).toBe(true)
    })

    it('sets ratingType prop on CommentIcon based on domain item rating type', () => {
      const wrapper = shallow(domainCommentWithComment)
      const commentIcon = wrapper.find(CommentIcon)
      expect(commentIcon.props().ratingType).toBe('reg-rating')
    })
  })

  describe('Comment', () => {
    it('should be rendered with a comment in props', () => {
      const wrapper = shallow(domainCommentWithComment)
      wrapper.setState({ isExpanded: true })
      expect(wrapper.find(Comment).props().comment).toBe('Domain test comment')
    })
  })

  describe('Read only mode', () => {
    it('propagates disabled prop to <Comment/>', () => {
      const wrapper = shallow(<DomainComment {...propsWithComment} disabled={true} />)
      wrapper.setState({ isExpanded: true })
      expect(wrapper.find('Comment').prop('disabled')).toBe(true)
    })

    it('will render <BottomCollapseIcon/> with correct props', () => {
      const wrapper = shallow(<DomainComment {...propsWithComment} disabled={true} />)
      const target = wrapper.find(BottomCollapseIcon)
      expect(target.exists()).toBe(true)
      const expectedProps = ['code', 'onClick']
      expect(Object.keys(target.props())).toEqual(expectedProps)
    })
  })
})
