import React from 'react'
import { shallow } from 'enzyme'
import ItemComment from './ItemComment'
import { Input } from '@cwds/components'
import ItemCommentIcon from './ItemCommentIcon'

describe('<ItemComment />', () => {
  const getWrapper = (comment, onChange = () => {}) =>
    shallow(<ItemComment comment={comment} itemCode={'a-code'} onChange={onChange} />)

  describe('initialization', () => {
    it('should propagate comment prop to state`s value', () => {
      const instance = getWrapper('a comment').instance()
      expect(instance.state).toEqual({
        value: 'a comment',
        isFocused: false,
      })
    })
  })

  describe('styling', () => {
    describe('when not focused', () => {
      describe('and has an empty value', () => {
        it('should render a folded version of the component', () => {
          const wrapper = getWrapper()
          const input = wrapper.find(Input).dive()
          expect(input.props().className.includes('item-comment-textarea-empty')).toBeTruthy()
        })
      })

      describe('and has a value that is not empty', () => {
        it('should render an extended version of the component', () => {
          const wrapper = getWrapper('a comment')
          const input = wrapper.find(Input).dive()
          expect(input.props().className.includes('item-comment-textarea-empty')).toBeFalsy()
          expect(input.props().className.includes('item-comment-textarea')).toBeTruthy()
        })
      })
    })

    describe('when focused', () => {
      describe('and has an empty value', () => {
        it('should render a extended version of the component', () => {
          const wrapper = getWrapper('')
          wrapper.setState({ isFocused: true })
          const input = wrapper.find(Input).dive()
          expect(input.props().className.includes('item-comment-textarea-empty')).toBeFalsy()
          expect(input.props().className.includes('item-comment-textarea')).toBeTruthy()
        })
      })

      describe('and has a value that is not empty', () => {
        it('should render an extended version of the component', () => {
          const wrapper = getWrapper('a comment')
          wrapper.setState({ isFocused: true })
          const input = wrapper.find(Input).dive()
          expect(input.props().className.includes('item-comment-textarea-empty')).toBeFalsy()
          expect(input.props().className.includes('item-comment-textarea')).toBeTruthy()
        })
      })
    })

    describe('ItemCommentIcon', () => {
      it('should be solid when a comment is not empty', () => {
        const wrapper = getWrapper('a comment')
        expect(wrapper.find(ItemCommentIcon).props().isSolid).toBeTruthy()
      })

      it('should be outlined when a comment is empty', () => {
        const wrapper = getWrapper('')
        expect(wrapper.find(ItemCommentIcon).props().isSolid).toBeFalsy()
      })
    })

    describe('comment length indicator', () => {
      it('should be rendered when ItemComment is focused', () => {
        const wrapper = getWrapper('a comment')
        wrapper.setState({ isFocused: true })
        expect(wrapper.find('span.item-comment-text-length').exists()).toBeTruthy()
      })

      it('should be hidden when ItemComment is not focused', () => {
        const wrapper = getWrapper('a comment')
        expect(wrapper.find('span.item-comment-text-length').exists()).toBeFalsy()
      })
    })
  })

  describe('#handleInternalValueUpdate()', () => {
    it('should be propagated to Input onChange prop', () => {
      const wrapper = getWrapper()
      wrapper
        .find(Input)
        .props()
        .onChange({ target: { value: 'new value' } })
      expect(wrapper.state().value).toBe('new value')
    })
  })

  describe('#handleOnFocus()', () => {
    it('should be propagated to Input onFocus prop', () => {
      const wrapper = getWrapper()
      wrapper
        .find(Input)
        .props()
        .onFocus()
      expect(wrapper.state().isFocused).toBeTruthy()
    })
  })

  describe('#handleOnBlur()', () => {
    it('should be propagated to Input onBlur prop', () => {
      const wrapper = getWrapper()
      wrapper
        .find(Input)
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
})
