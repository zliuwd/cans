import React from 'react'
import SuggestionHeader from './SuggestionHeader'
import { shallow } from 'enzyme'

describe('<SuggestionHeader />', () => {
  const defaultProps = {
    totalResults: 106,
    searchTerm: 'casey',
  }

  describe('init SuggestionHeader', () => {
    describe('page layout', () => {
      it('renders with 1 <div> element', () => {
        const wrapper = shallow(<SuggestionHeader {...defaultProps} />)
        expect(wrapper.find('div').length).toBe(1)
      })

      it('renders with 1 <strong> element', () => {
        const props = {
          page: 2,
          currentNumberOfResults: 10,
          ...defaultProps,
        }
        const wrapper = shallow(<SuggestionHeader {...props} />)
        expect(wrapper.find('strong').length).toBe(1)
      })
    })

    describe('renders text in the suggestion header', () => {
      describe('displays the correct range of results, number of results, and search term', () => {
        it('on the second page', () => {
          const props = {
            page: 2,
            currentNumberOfResults: 10,
            ...defaultProps,
          }
          const wrapper = shallow(<SuggestionHeader {...props} />)
          expect(wrapper.find('strong').text()).toEqual(`Showing 11-20 of 106 results for "casey"`)
        })

        it('on the last page', () => {
          const props = {
            page: 11,
            currentNumberOfResults: 6,
            ...defaultProps,
          }
          const wrapper = shallow(<SuggestionHeader {...props} />)
          expect(wrapper.find('strong').text()).toEqual(`Showing 101-106 of 106 results for "casey"`)
        })
      })

      it('renders no results when currentNumberOfResults is less than 1', () => {
        const props = {
          page: 0,
          currentNumberOfResults: 0,
          totalResults: 0,
          searchTerm: 'casey',
        }
        const wrapper = shallow(<SuggestionHeader {...props} />)
        expect(wrapper.find('strong').text()).toEqual(`No results were found for "casey"`)
      })

      it('renders null when totalResults is null', () => {
        const props = {
          page: 0,
          currentNumberOfResults: 0,
          totalResults: null,
          searchTerm: 'casey',
        }
        const wrapper = shallow(<SuggestionHeader {...props} />)
        expect(wrapper.find('div').exists()).toBe(false)
      })
    })
  })
})
