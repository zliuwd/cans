import React from 'react'
import { shallow, mount } from 'enzyme'
import { BrowserRouter, Redirect } from 'react-router-dom'
import { shape } from 'prop-types'
import Autocompleter from './Autocompleter'
import Autocomplete from 'react-autocomplete'
import SuggestionHeader from './SuggestionHeader'
import PersonSuggestion from './PersonSuggestion'
import SearchPagination from './SearchPagination'
import { defaultProps, propsWithResults } from '../clientresults.mocks'

describe('<Autocompleter />', () => {
  describe('page layout', () => {
    it('renders an <Autocomplete /> component', () => {
      const wrapper = shallow(<Autocompleter {...defaultProps} />)
      expect(wrapper.find(Autocomplete).exists()).toBe(true)
    })
  })

  describe('<Autocomplete /> component', () => {
    it('renders placeholder ex: Last Name, First Name ', () => {
      const wrapper = mount(<Autocompleter {...defaultProps} />)
      expect(
        wrapper
          .find(Autocomplete)
          .find('#client-search-autocompleter')
          .props().placeholder
      ).toBe('ex: Last Name, First Name')
    })

    describe('when the searchTerm is searchable', () => {
      it('calls onChangeInput', () => {
        const handleChangeSpy = jest.spyOn(Autocompleter.prototype, 'onChangeInput')
        const wrapper = mount(<Autocompleter {...defaultProps} />)
        const autocompleteInput = wrapper.find(Autocomplete).find('#client-search-autocompleter')
        autocompleteInput.instance().value = 'annie'
        autocompleteInput.simulate('change')

        expect(handleChangeSpy).toHaveBeenCalledTimes(1)
      })

      it('calls onChange', () => {
        const spy = jest.fn()
        const props = {
          id: 'client-search-autocompleter',
          onChange: spy,
          onClear: () => {},
          results: [],
          totalResults: 0,
        }
        const wrapper = mount(<Autocompleter {...props} />)
        const autocompleteInput = wrapper.find(Autocomplete).find('#client-search-autocompleter')
        autocompleteInput.instance().value = 'annie'
        autocompleteInput.simulate('change')

        expect(spy).toHaveBeenCalledTimes(1)
      })

      it('does not call onClear', () => {
        const spy = jest.fn()
        const props = {
          id: 'client-search-autocompleter',
          onChange: () => {},
          onClear: spy,
          results: [],
          totalResults: 0,
        }
        const wrapper = mount(<Autocompleter {...props} />)
        const autocompleteInput = wrapper.find(Autocomplete).find('#client-search-autocompleter')
        autocompleteInput.instance().value = 'annie'
        autocompleteInput.simulate('change')

        expect(spy).toHaveBeenCalledTimes(1)
      })

      describe('when there are client results', () => {
        it('renders a <SuggestionHeader /> on focus', () => {
          const wrapper = mount(<Autocompleter {...propsWithResults} />)
          wrapper.setState({ searchTerm: 'annie' })
          wrapper
            .find(Autocomplete)
            .find('#client-search-autocompleter')
            .simulate('focus')

          expect(wrapper.find(SuggestionHeader).exists()).toBe(true)
        })

        it('renders a <PersonSuggestion /> on focus', () => {
          const wrapper = mount(<Autocompleter {...propsWithResults} />)
          wrapper.setState({ searchTerm: 'annie' })
          wrapper
            .find(Autocomplete)
            .find('#client-search-autocompleter')
            .simulate('focus')

          expect(wrapper.find(PersonSuggestion).exists()).toBe(true)
        })

        it('renders a <SearchPagination /> on focus', () => {
          const wrapper = mount(<Autocompleter {...propsWithResults} />)
          wrapper.setState({ searchTerm: 'annie' })
          wrapper
            .find(Autocomplete)
            .find('#client-search-autocompleter')
            .simulate('focus')
          expect(wrapper.find(SearchPagination).exists()).toBe(true)
        })
      })

      describe('when there are no client results', () => {
        it('renders a <SuggestionHeader /> on focus', () => {
          const wrapper = mount(<Autocompleter {...defaultProps} />)
          wrapper.setState({ searchTerm: 'annie' })
          wrapper
            .find(Autocomplete)
            .find('#client-search-autocompleter')
            .simulate('focus')

          expect(wrapper.find(SuggestionHeader).exists()).toBe(true)
        })

        it('does not render a <PersonSuggestion /> on focus', () => {
          const wrapper = mount(<Autocompleter {...defaultProps} />)
          wrapper.setState({ searchTerm: 'annie' })
          wrapper
            .find(Autocomplete)
            .find('#client-search-autocompleter')
            .simulate('focus')

          expect(wrapper.find(PersonSuggestion).exists()).toBe(false)
        })

        it('renders a <SearchPagination /> on focus', () => {
          const wrapper = mount(<Autocompleter {...defaultProps} />)
          wrapper.setState({ searchTerm: 'annie' })
          wrapper
            .find(Autocomplete)
            .find('#client-search-autocompleter')
            .simulate('focus')
          expect(wrapper.find(SearchPagination).exists()).toBe(true)
        })
      })
    })

    describe('when the searchTerm is not searchable', () => {
      it('calls onChangeInput', () => {
        const handleChangeSpy = jest.spyOn(Autocompleter.prototype, 'onChangeInput')
        const wrapper = mount(<Autocompleter {...defaultProps} />)
        const autocompleteInput = wrapper.find(Autocomplete).find('#client-search-autocompleter')
        autocompleteInput.instance().value = 'a'
        autocompleteInput.simulate('change')

        expect(handleChangeSpy).toHaveBeenCalledTimes(1)
      })

      it('does not call onChange', () => {
        const spy = jest.fn()
        const props = {
          id: 'client-search-autocompleter',
          onChange: spy,
          onClear: () => {},
          results: [],
          totalResults: 0,
        }
        const wrapper = mount(<Autocompleter {...props} />)
        const autocompleteInput = wrapper.find(Autocomplete).find('#client-search-autocompleter')
        autocompleteInput.instance().value = 'a'
        autocompleteInput.simulate('change')

        expect(spy).toHaveBeenCalledTimes(0)
      })

      it('calls onClear', () => {
        const spy = jest.fn()
        const props = {
          id: 'client-search-autocompleter',
          onChange: () => {},
          onClear: spy,
          results: [],
          totalResults: 0,
        }
        const wrapper = mount(<Autocompleter {...props} />)
        const autocompleteInput = wrapper.find(Autocomplete).find('#client-search-autocompleter')
        autocompleteInput.instance().value = 'a'
        autocompleteInput.simulate('change')

        expect(spy).toHaveBeenCalledTimes(1)
      })

      describe('when there are no client results', () => {
        it('does not render a <SuggestionHeader /> on focus', () => {
          const wrapper = mount(<Autocompleter {...defaultProps} />)
          wrapper
            .find(Autocomplete)
            .find('#client-search-autocompleter')
            .simulate('focus')

          expect(wrapper.find(SuggestionHeader).exists()).toBe(false)
        })

        it('does not render a <PersonSuggestion /> on focus', () => {
          const wrapper = mount(<Autocompleter {...defaultProps} />)
          wrapper
            .find(Autocomplete)
            .find('#client-search-autocompleter')
            .simulate('focus')

          expect(wrapper.find(PersonSuggestion).exists()).toBe(false)
        })

        it('does not render a <SearchPagination /> on focus', () => {
          const wrapper = mount(<Autocompleter {...defaultProps} />)
          wrapper
            .find(Autocomplete)
            .find('#client-search-autocompleter')
            .simulate('focus')
          expect(wrapper.find(SearchPagination).exists()).toBe(false)
        })
      })
    })
  })

  it('should redirect when person suggestion is clicked', () => {
    // Instantiate router context
    const router = {
      history: new BrowserRouter().history,
      route: {
        location: {},
        match: {},
      },
    }
    const wrapper = mount(<Autocompleter {...propsWithResults} />, {
      context: { router },
      childContextTypes: { router: shape({}) },
    })
    wrapper.setState({ searchTerm: 'annie' })
    wrapper
      .find(Autocomplete)
      .find('#client-search-autocompleter')
      .simulate('focus')

    const personSuggestion = wrapper.find(PersonSuggestion)
    personSuggestion.simulate('click')

    expect(wrapper.find(Redirect).exists()).toBe(true)
  })
})
