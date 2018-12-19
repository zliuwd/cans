import React from 'react'
import { shallow, mount } from 'enzyme'
import DomainCommentAccordion from './DomainCommentAccordion'
import Comment from '../common/Comment'
import CommentIcon from '../common/CommentIcon'

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
}

const defaultProps = {
  id: 'commenta',
  title: 'familiaDomain',
  domain: { ...domainDefault },
  onDomainCommentUpdate: () => {},
}

const propsWithComment = {
  id: 'commenta',
  title: 'familiaDomain',
  domain: { ...domainWithComment },
  onDomainCommentUpdate: () => {},
}

const domainCommentAccordionDefault = <DomainCommentAccordion {...defaultProps} />
const domainCommentAccordionWithComment = <DomainCommentAccordion {...propsWithComment} />

describe('<DomainCommentAccordion />', () => {
  describe('Expand/Collapse', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount({ ...domainCommentAccordionDefault })
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('has chevron right icon to expand', () => {
      const foldedText = wrapper.text()
      expect(wrapper.find('#BEHEMO-comment-accordion-expand').hasClass('fa-chevron-right')).toBe(true)
      expect(foldedText).toMatch(/Comment/)
    })

    it('expands and has chevron down icon ', () => {
      wrapper.find('#BEHEMO-comment-accordion-expand').simulate('click')
      const expandedText = wrapper.text()
      expect(wrapper.find('#BEHEMO-comment-accordion-expand').hasClass('fa-chevron-down')).toBe(true)
      expect(expandedText).toMatch(/Comment/)
    })

    it('when chevron button get focus and press tab accordion will not expand', async () => {
      wrapper.find('i.fa-chevron-right').simulate('keydown', { key: 'Tab' })
      expect(wrapper.instance().state.isExpanded).toEqual(false)
    })

    it('when chevron button get focus and press a key other than Tab, accordion will expand', async () => {
      wrapper.find('i.fa-chevron-right').simulate('keydown', { key: 'Enter' })
      expect(wrapper.instance().state.isExpanded).toEqual(true)
    })
  })

  it('has a title', async () => {
    const wrapper = mount({ ...domainCommentAccordionDefault })
    const foldedText = wrapper.text()
    expect(foldedText).toMatch(/Comment/)

    wrapper.find('#BEHEMO-comment-accordion-expand').simulate('click')
    const expandedText = wrapper.text()
    expect(expandedText).toMatch(/Comment/)
  })

  describe('#handleDomainCommentChange()', () => {
    it('should propagate handleDomainCommentChange to onChange Comment prop', () => {
      const onDomainCommentUpdateMock = jest.fn()
      const wrapper = shallow(
        <DomainCommentAccordion
          id={'commenta'}
          title={'familiaDomain'}
          domain={{ ...domainWithComment }}
          onDomainCommentUpdate={onDomainCommentUpdateMock}
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

  describe('CommentIcon in the accordion', () => {
    it('should render CommentIcon with domain-comment-accordion-comment-icon style', () => {
      const wrapper = shallow(domainCommentAccordionDefault)
      const commentIcon = wrapper.find(CommentIcon)
      expect(commentIcon.props().className.includes('domain-comment-accordion-comment-icon')).toBeTruthy()
    })

    it('should render outlined CommentIcon when no comment for the domain', () => {
      const wrapper = shallow(domainCommentAccordionDefault)
      const commentIcon = wrapper.find(CommentIcon)
      expect(commentIcon.props().isSolid).toBeFalsy()
    })

    it('should render solid CommentIcon when domain has a comment', () => {
      const wrapper = shallow(domainCommentAccordionWithComment)
      const commentIcon = wrapper.find(CommentIcon)
      expect(commentIcon.props().isSolid).toBeTruthy()
    })

    it('sets ratingType prop on CommentIcon based on domain item rating type', () => {
      const wrapper = shallow(domainCommentAccordionDefault)
      const commentIcon = wrapper.find(CommentIcon)
      expect(commentIcon.props().ratingType).toBe('reg-rating')
    })
  })

  describe('Comment', () => {
    it('should be rendered with a comment in props', () => {
      const wrapper = shallow(domainCommentAccordionWithComment)
      wrapper.setState({ isExpanded: true })
      expect(wrapper.find(Comment).props().comment).toBe('Domain test comment')
    })
  })

  describe('Read only mode', () => {
    it('propagates disabled prop to <Comment/>', () => {
      const wrapper = shallow(<DomainCommentAccordion {...propsWithComment} disabled={true} />)
      wrapper.setState({ isExpanded: true })
      expect(wrapper.find('Comment').prop('disabled')).toBe(true)
    })
  })
})
