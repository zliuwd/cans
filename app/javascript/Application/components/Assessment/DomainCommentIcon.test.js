import React from 'react'
import { shallow } from 'enzyme'
import CommentIcon from '../common/CommentIcon'
import DomainCommentIcon from './DomainCommentIcon'

const domainWithComment = {
  comment: 'Hello',
  items: [],
}

const domainWithItemComment = {
  comment: null,
  items: [{}, {}, { comment: 'This one!' }],
}

const domainWithNoComments = {
  comment: null,
  items: [{}, { comment: null }, {}],
}

describe('<DomainCommentIcon />', () => {
  const render = domain => shallow(<DomainCommentIcon domain={domain} />)

  it('renders a comment icon', () => {
    const root = render(domainWithNoComments)
    expect(root.find(CommentIcon).exists()).toBe(true)
  })

  it('has a className', () => {
    const root = render(domainWithNoComments)
    expect(root.props().className).toBe('domain-toolbar-comment-icon')
  })

  it('renders a hollow comment icon when the domain has no comments', () => {
    const root = render(domainWithNoComments)
    expect(root.props().isSolid).toBe(false)
  })

  it('renders a solid comment icon when the domain has a comment', () => {
    const root = render(domainWithComment)
    expect(root.props().isSolid).toBe(true)
  })

  it('rendres a solid comment icon when the domain has item comments', () => {
    const root = render(domainWithItemComment)
    expect(root.props().isSolid).toBe(true)
  })
})
