import React from 'react'
import SuggestionHeader from './SuggestionHeader'
import { shallow } from 'enzyme'

describe('<SuggestionHeader />', () => {
  const defaultProps = {
    currentNumberOfResults: 10,
    totalResults: 100,
    searchTerm: 'casey',
  }

  describe('init SuggestionHeader', () => {
    describe('page layout', () => {
      it('renders with 1 <div> element', () => {
        const wrapper = shallow(<SuggestionHeader {...defaultProps} />)
        expect(wrapper.find('div').length).toBe(1)
      })

      it('renders with 1 <strong> element', () => {
        const wrapper = shallow(<SuggestionHeader {...defaultProps} />)
        expect(wrapper.find('strong').length).toBe(1)
      })
    })

    describe('renders text in the suggestion header', () => {
      it('renders the number of results', () => {
        const wrapper = shallow(<SuggestionHeader {...defaultProps} />)
        expect(wrapper.find('strong').text()).toEqual(`Showing 1-10 of 100 results for "casey"`)
      })

      it('renders no results when currentNumberOfResults is less than 1', () => {
        const props = {
          currentNumberOfResults: 0,
          totalResults: 0,
          searchTerm: 'casey',
        }
        const wrapper = shallow(<SuggestionHeader {...props} />)
        expect(wrapper.find('strong').text()).toEqual(`No results were found for "casey"`)
      })

      it('renders null when totalResults is null', () => {
        const props = {
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
