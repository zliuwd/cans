import React from 'react'
import { shallow } from 'enzyme'
import CommentIcon from '../common/CommentIcon'
import DomainCommentIcon from './DomainCommentIcon'

const domainWithComment = {
  comment: 'Hello',
  items: [],
}

const domainWithNoComment = {
  comment: null,
  items: [{}, { comment: null }, {}],
}

const domainWithItemComment = {
  comment: null,
  items: [{}, {}, { comment: 'This one!' }],
}

describe('<DomainCommentIcon />', () => {
  const render = domain => shallow(<DomainCommentIcon domain={domain} />)

  it('renders a comment icon when the domain has a comment', () => {
    const root = render(domainWithComment)
    expect(root.find(CommentIcon).exists()).toBe(true)
  })

  it('has a className if domain has a comment', () => {
    const root = render(domainWithComment)
    expect(root.props().className).toBe('domain-toolbar-comment-icon')
  })

  it('does not render a comment icon when the domain has no comment', () => {
    const root = render(domainWithNoComment)
    expect(root.find(CommentIcon).exists()).toBe(false)
  })

  it('rendres a comment icon when the domain has item comment', () => {
    const root = render(domainWithItemComment)
    expect(root.find(CommentIcon).exists()).toBe(true)
  })
})
