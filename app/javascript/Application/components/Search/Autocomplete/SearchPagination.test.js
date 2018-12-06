import React from 'react'
import { shallow } from 'enzyme'
import SearchPagination from './SearchPagination'

const propsIsDisabled = {
  page: 1,
  totalResults: 100,
  changePage: () => {},
  isDisabled: true,
}
const propsNoResults = {
  page: 0,
  totalResults: 0,
  changePage: () => {},
  isDisabled: false,
}
const propsWithResults = {
  page: 1,
  totalResults: 12,
  changePage: () => {},
  isDisabled: false,
}

describe('SearchPagination', () => {
  describe('page layout', () => {
    it('renders a suggestion-footer div', () => {
      const wrapper = shallow(<SearchPagination {...propsWithResults} />)
      expect(wrapper.find('div.suggestion-footer').length).toBe(1)
    })

    it('renders a pagination wrapper div', () => {
      const wrapper = shallow(<SearchPagination {...propsWithResults} />)
      expect(wrapper.find('div.pagination-wrapper').length).toBe(1)
    })

    it('renders a prev-page button', () => {
      const wrapper = shallow(<SearchPagination {...propsWithResults} />)
      expect(wrapper.find('button.prev-page').length).toBe(1)
    })

    it('renders a prev-page button that is disabled', () => {
      const wrapper = shallow(<SearchPagination {...propsIsDisabled} />)
      expect(wrapper.find('button.prev-page').props().disabled).toBe(true)
    })

    it('renders a font awesome caret left icon inside the prev-page button', () => {
      const wrapper = shallow(<SearchPagination {...propsWithResults} />)
      expect(wrapper.find('button.prev-page').find('i.fa-caret-left').length).toBe(1)
    })

    it('renders a current-page-number input', () => {
      const wrapper = shallow(<SearchPagination {...propsWithResults} />)
      expect(wrapper.find('input.current-page-number').length).toBe(1)
    })

    it('renders a current-page-number input that is disabled', () => {
      const wrapper = shallow(<SearchPagination {...propsIsDisabled} />)
      expect(wrapper.find('input.current-page-number').props().disabled).toBe(true)
    })

    it('renders a current-page-number input that is readonly', () => {
      const wrapper = shallow(<SearchPagination {...propsWithResults} />)
      expect(wrapper.find('input.current-page-number').props().readOnly).toBe(true)
    })

    it('renders a total-pages-wrapper div', () => {
      const wrapper = shallow(<SearchPagination {...propsWithResults} />)
      expect(wrapper.find('div.total-pages-wrapper').length).toBe(1)
    })

    it('renders a total-pages span inside a total-pages-wrapper div', () => {
      const wrapper = shallow(<SearchPagination {...propsWithResults} />)
      expect(wrapper.find('div.total-pages-wrapper').find('span.total-pages').length).toBe(1)
    })

    it('renders a next-page button', () => {
      const wrapper = shallow(<SearchPagination {...propsWithResults} />)
      expect(wrapper.find('button.next-page').length).toBe(1)
    })

    it('renders a next-page button that is disabled', () => {
      const wrapper = shallow(<SearchPagination {...propsIsDisabled} />)
      expect(wrapper.find('button.next-page').props().disabled).toBe(true)
    })

    it('renders a font awesome caret right icon inside the next page button', () => {
      const wrapper = shallow(<SearchPagination {...propsWithResults} />)
      expect(wrapper.find('button.next-page').find('i.fa-caret-right').length).toBe(1)
    })

    it('renders nothing when total results is zero', () => {
      const wrapper = shallow(<SearchPagination {...propsNoResults} />)
      expect(wrapper.html()).toBe(null)
    })
  })

  describe('renders pagination info', () => {
    describe('current page number information', () => {
      it('renders an input that has a value of 1 when total results is greater than 0', () => {
        const wrapper = shallow(<SearchPagination {...propsWithResults} />)
        expect(wrapper.find('input.current-page-number').props().value).toBe(1)
      })
    })

    describe('total page number information', () => {
      it('total pages to be 25 when total results equals 245', () => {
        const props = {
          page: 1,
          totalResults: 245,
          changePage: () => {},
          isDisabled: false,
        }
        const wrapper = shallow(<SearchPagination {...props} />)

        expect(wrapper.find('span.total-pages').html()).toBe('<span class="total-pages">25</span>')
      })
    })
  })

  describe('prev page button', () => {
    describe('when on the first page', () => {
      it('should not call getPrevPage when clicked', () => {
        const wrapper = shallow(<SearchPagination {...propsWithResults} />)
        const spy = jest.spyOn(wrapper.instance(), 'getPrevPage')
        const button = wrapper.find('button.prev-page')
        button.simulate('click')

        expect(spy).not.toHaveBeenCalled()
      })

      it('should be disabled', () => {
        const wrapper = shallow(<SearchPagination {...propsWithResults} />)
        const button = wrapper.find('button.prev-page')

        expect(button.props().disabled).toBe(true)
      })
    })

    describe('when on the second page', () => {
      it('should call getPrevPage when clicked', () => {
        const wrapper = shallow(<SearchPagination {...propsWithResults} />)
        const spy = jest.spyOn(wrapper.instance(), 'getPrevPage')
        wrapper.setState({ pagination: { totalPages: 2 } })
        const button = wrapper.find('button.prev-page')
        button.simulate('click')

        expect(spy).toHaveBeenCalled()
      })

      it('should not be disabled', () => {
        const wrapper = shallow(<SearchPagination {...propsWithResults} />)
        wrapper.setState({ pagination: { totalPages: 2 } })
        wrapper.setProps({ page: 2 })
        const button = wrapper.find('button.prev-page')

        expect(button.props().disabled).toBe(false)
      })
    })
  })

  describe('next page button', () => {
    describe('when on the first page', () => {
      it('should call getNextPage when clicked', () => {
        const wrapper = shallow(<SearchPagination {...propsWithResults} />)
        const spy = jest.spyOn(wrapper.instance(), 'getNextPage')
        const button = wrapper.find('button.next-page')
        button.simulate('click')

        expect(spy).not.toHaveBeenCalled()
      })

      it('should not be disabled', () => {
        const wrapper = shallow(<SearchPagination {...propsWithResults} />)
        const button = wrapper.find('button.next-page')

        expect(button.props().disabled).toBe(false)
      })
    })

    describe('when on the last page', () => {
      it('should not call getNextPage when clicked', () => {
        const wrapper = shallow(<SearchPagination {...propsWithResults} />)
        const spy = jest.spyOn(wrapper.instance(), 'getNextPage')
        wrapper.setState({ pagination: { totalPages: 2 } })
        const button = wrapper.find('button.prev-page')
        button.simulate('click')

        expect(spy).not.toHaveBeenCalled()
      })

      it('should be disabled', () => {
        const wrapper = shallow(<SearchPagination {...propsWithResults} />)
        wrapper.setState({ pagination: { totalPages: 2 } })
        wrapper.setProps({ page: 2 })
        const button = wrapper.find('button.next-page')

        expect(button.props().disabled).toBe(true)
      })
    })
  })
})
