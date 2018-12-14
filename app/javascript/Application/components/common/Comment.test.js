import React from 'react'
import { shallow } from 'enzyme'
import Comment from '../common/Comment'
import CommentIcon from '../common/CommentIcon'
import * as Common from '../../util/common'

jest.mock('../../util/common')

describe('<Comment />', () => {
  const maxCommentLength = 250

  const getWrapper = (comment, onChange = () => {}) =>
    shallow(
      <Comment
        comment={comment}
        id={'ele-id'}
        prefix={'ele-comment'}
        onChange={onChange}
        maxCommentLength={maxCommentLength}
      />
    )

  describe('initialization', () => {
    it('should propagate comment prop to state`s value', () => {
      const instance = getWrapper('a comment').instance()
      expect(instance.state).toEqual({
        value: 'a comment',
        isFocused: false,
        safariMaxLengthCompensation: 0,
      })
    })
  })

  describe('textarea character length', () => {
    const wrapperWithInputLength = (comment, maxCommentLength, onChange = () => {}) =>
      shallow(
        <Comment
          comment={comment}
          id={'ele-id'}
          prefix={'ele-comment'}
          onChange={onChange}
          maxCommentLength={maxCommentLength || 250}
        />
      )

    it('allows 250 max chars by default', () => {
      const wrapper = wrapperWithInputLength('')
      const input = wrapper.find('textarea')
      expect(input.props().maxLength).toEqual(250)
    })

    it('passes maxCommentLength prop to set maxLength on textarea', () => {
      const wrapper = wrapperWithInputLength('', 2500)
      const input = wrapper.find('textarea')
      expect(input.props().maxLength).toEqual(2500)
    })
  })

  describe('styling', () => {
    describe('when not focused', () => {
      describe('and has an empty value', () => {
        it('should render a folded version of the component', () => {
          const wrapper = getWrapper('')
          const input = wrapper.find('textarea')
          expect(input.props().className.includes('ele-comment-textarea-empty')).toBeTruthy()
        })
      })

      describe('and has a value that is not empty', () => {
        it('should render an extended version of the component', () => {
          const wrapper = getWrapper('a comment')
          const input = wrapper.find('textarea')
          expect(input.props().className.includes('ele-comment-textarea-empty')).toBeFalsy()
          expect(input.props().className.includes('ele-comment-textarea')).toBeTruthy()
        })
      })
    })

    describe('when focused', () => {
      describe('and has an empty value', () => {
        it('should render a extended version of the component', () => {
          const wrapper = getWrapper('')
          wrapper.setState({ isFocused: true })
          const input = wrapper.find('textarea')
          expect(input.props().className.includes('ele-comment-textarea-empty')).toBeFalsy()
          expect(input.props().className.includes('ele-comment-textarea')).toBeTruthy()
        })
      })

      describe('and has a value that is not empty', () => {
        it('should render an extended version of the component', () => {
          const wrapper = getWrapper('a comment')
          wrapper.setState({ isFocused: true })
          const input = wrapper.find('textarea')
          expect(input.props().className.includes('ele-comment-textarea-empty')).toBeFalsy()
          expect(input.props().className.includes('ele-comment-textarea')).toBeTruthy()
        })
      })
    })

    describe('ItemCommentIcon', () => {
      it('should be solid when a comment is not empty', () => {
        const wrapper = getWrapper('a comment')
        expect(wrapper.find(CommentIcon).props().isSolid).toBeTruthy()
      })

      it('should be outlined when a comment is empty', () => {
        const wrapper = getWrapper('')
        expect(wrapper.find(CommentIcon).props().isSolid).toBeFalsy()
      })
    })

    describe('comment length indicator', () => {
      it('should be rendered and have an `ele-comment-text-length` style when ItemComment is focused', () => {
        const wrapper = getWrapper('a comment')
        wrapper.setState({ isFocused: true })
        expect(wrapper.find('span.ele-comment-text-length').exists()).toBeTruthy()
      })

      it('should have hidden style when ItemComment is not focused', () => {
        const wrapper = getWrapper('a comment')
        expect(wrapper.find('span.ele-comment-text-length-hidden').exists()).toBeTruthy()
      })
    })
  })

  describe('#handleInternalValueUpdate()', () => {
    it('should be propagated to textarea onChange prop', () => {
      const wrapper = getWrapper()
      wrapper
        .find('textarea')
        .props()
        .onChange({ target: { value: 'new value' } })
      expect(wrapper.state().value).toBe('new value')
    })
  })

  describe('#handleOnFocus()', () => {
    it('should be propagated to textarea onFocus prop', () => {
      const wrapper = getWrapper()
      wrapper
        .find('textarea')
        .props()
        .onFocus()
      expect(wrapper.state().isFocused).toBeTruthy()
    })
  })

  describe('#handleOnBlur()', () => {
    it('should be propagated to textarea onBlur prop', () => {
      const wrapper = getWrapper()
      wrapper
        .find('textarea')
        .props()
        .onBlur()
      expect(wrapper.state().isFocused).toBeFalsy()
    })

    describe('invoking onChange callback', () => {
      it('should invoke onChange callback when the comment value is changed', () => {
        const onChangeMock = jest.fn()
        const wrapper = getWrapper('old value', onChangeMock)
        wrapper.setState({ value: 'new value' })
        wrapper.instance().handleOnBlur()
        expect(onChangeMock).toHaveBeenCalledTimes(1)
        expect(onChangeMock).toHaveBeenCalledWith('new value')
      })

      it('should not invoke onChange callback when the comment value is the same', () => {
        const onChangeMock = jest.fn()
        const wrapper = getWrapper('same value', onChangeMock)
        wrapper.setState({ value: 'same value' })
        wrapper.instance().handleOnBlur()
        expect(onChangeMock).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('Safari textarea length workaround', () => {
    describe('on init', () => {
      it('should compensate textarea maxlength when textarea value contains `newline` symbols', () => {
        Common.isSafari = true
        const wrapper = getWrapper('\n\n')
        expect(wrapper.find('textarea').props().maxLength).toBe(maxCommentLength + 2)
      })
    })

    describe('on textarea value change', () => {
      it('should compensate textarea maxlength when textarea value contains `newline` symbols', () => {
        Common.isSafari = true
        const wrapper = getWrapper('Hello')
        const textArea = wrapper.find('textarea')
        expect(textArea.props().maxLength).toBe(maxCommentLength)
        textArea.simulate('change', { target: { value: '\nWorld' } })
        expect(wrapper.find('textarea').props().maxLength).toBe(maxCommentLength + 1)
      })
    })
  })
})
