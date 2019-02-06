import React from 'react'
import { shallow, mount } from 'enzyme'
import RenderWarning from '../common/RenderWarning'
import PageModal from '../common/PageModal'

const props = {
  isCaregiverWarningShown: true,
  focusedCaregiverId: 'a',
  handleCaregiverRemove: jest.fn(),
  handleWarningShow: jest.fn(),
}

describe('<RenderWarning />', () => {
  describe('page model when warning is shown', () => {
    it('should render PageModal component when warningShow is true', () => {
      const wrapper = shallow(<RenderWarning {...props} />)
      wrapper.setProps({
        isCaregiverWarningShown: true,
      })
      expect(wrapper.find('PageModal').length).toBe(1)
    })

    it('renders PageModal component when isCaregiverWarningShown false', () => {
      const wrapper = shallow(<RenderWarning {...props} />)
      wrapper.setProps({
        isCaregiverWarningShown: false,
      })
      expect(wrapper.find('PageModal').length).toBe(1)
    })

    describe('warning model when warning is shown', () => {
      it('should render cancel button label when warningShow is true', () => {
        const wrapper = shallow(<RenderWarning {...props} />)
        expect(wrapper.find(PageModal).props().cancelButtonLabel).toContain('Cancel')
      })

      it('should render remove button label when warningShow is true', () => {
        const wrapper = shallow(<RenderWarning {...props} />)
        expect(wrapper.find(PageModal).props().nextStepButtonLabel).toContain('Remove')
      })

      it('should render description when warningShow is true', () => {
        const wrapper = shallow(<RenderWarning {...props} />)
        expect(wrapper.find(PageModal).props().description).toContain('This may affect some of your entries.')
      })

      it('should render title when warningShow is true', () => {
        const wrapper = shallow(<RenderWarning {...props} />)
        expect(wrapper.find(PageModal).props().title).toContain('Warning')
      })

      it('should render isOpen when warningShow is true', () => {
        const wrapper = shallow(<RenderWarning {...props} />)
        expect(wrapper.find(PageModal).props().isOpen).toEqual(true)
      })
    })

    describe('it invokes a callback', () => {
      const render = ({
        isCaregiverWarningShown = true,
        handleCaregiverRemove = jest.fn(),
        handleWarningShow = jest.fn(),
      }) =>
        mount(
          <RenderWarning
            isCaregiverWarningShown={isCaregiverWarningShown}
            handleWarningShow={handleWarningShow}
            handleCaregiverRemove={handleCaregiverRemove}
          />
        )
      describe('cancel button', () => {
        it('invokes a cancel callback', () => {
          const mockFn = jest.fn()
          const component = render({ handleWarningShow: mockFn })
          component
            .find('button')
            .at(0)
            .simulate('click')
          expect(mockFn).toHaveBeenCalledTimes(1)
        })

        it('invokes next step call back', () => {
          const mockFn = jest.fn()
          const mockFn2 = jest.fn()
          const component = render({ handleCaregiverRemove: mockFn, handleWarningShow: mockFn2 })
          component
            .find('button')
            .at(1)
            .simulate('click')
          expect(mockFn).toHaveBeenCalledTimes(1)
          expect(mockFn2).toHaveBeenCalledTimes(1)
        })
      })
    })
  })
})
