import React from 'react'
import UnsavedDataWarning from './UnsavedDataWarning'
import { shallow } from 'enzyme'
import { eventBus } from './../../util/eventBus'
import { UNSAVED_ASSESSMENT_VALIDATION_EVENT, ASSESSMENT_PRINT_EVENT } from './../../util/constants'
import { Button } from 'reactstrap'
import { breadCrumbOnClickHandler } from '../Layout/BreadCrumb/BreadCrumb'

describe('<UnsavedDataWarning />', () => {
  const action = () => {
    return jest.fn(() => {
      return {
        then: fun => {
          fun()
        },
      }
    })
  }

  const warning = (unsaved = false) => {
    return <UnsavedDataWarning discardAndContinue={action()} saveAndContinue={action()} isUnsaved={unsaved} />
  }

  const openWarning = () => {
    const wrapper = shallow(warning(true))
    eventBus.post(UNSAVED_ASSESSMENT_VALIDATION_EVENT, ASSESSMENT_PRINT_EVENT)
    return wrapper
  }

  describe('unsaved data warning presence trigger', () => {
    it('<UnsavedDataWarning /> is present when unsaved assessment validation event is received', () => {
      const wrapper = openWarning()
      expect(wrapper.instance().state.isOpened).toBeTruthy()
    })
  })

  describe('unsaved data warning breadcrums callback', () => {
    it('<UnsavedDataWarning /> sets breadcrumb callback', () => {
      const wrapper = shallow(warning(false))
      expect(wrapper.instance().onBreadCrumbsClick).toEqual(breadCrumbOnClickHandler.onClick)
    })

    it('<UnsavedDataWarning /> unsets breadcrumb callback on unload', () => {
      const wrapper = shallow(warning(false))
      wrapper.instance().componentWillUnmount()
      expect(wrapper.instance().onBreadCrumbsClick).not.toEqual(breadCrumbOnClickHandler.onClick)
    })
  })

  describe('unsaved data warning actions', () => {
    it('"Cancel" button does close warning and closes modal', () => {
      const wrapper = openWarning()
      wrapper.instance().close()
      expect(wrapper.instance().state.isOpened).toBeFalsy()
      expect(wrapper.instance().state.event).toBeUndefined()
    })

    it('"continueAction" sends callback event if one is present', () => {
      const wrapper = openWarning()
      const callbackEvent = 'CALLBACK'
      wrapper.instance().state.event = callbackEvent
      const eventBusPost = jest.spyOn(eventBus, 'post')
      wrapper.instance().continueAction()
      expect(eventBusPost).toBeCalledWith(callbackEvent)
    })

    it('"continueAction" change document href if event is not present', () => {
      const wrapper = shallow(warning(true))
      const href = '/href'
      wrapper.instance().state.href = href
      global.location.assign = jest.fn()
      const removeEventListener = jest.spyOn(global, 'removeEventListener')
      wrapper.instance().continueAction()
      expect(removeEventListener).toBeCalled()
      expect(global.location.assign).toBeCalledWith(href)
    })
  })

  describe('unsaved data warning buttons', () => {
    it('"Cancel" button does close warning', () => {
      const wrapper = openWarning()
      wrapper
        .find(Button)
        .at(0)
        .simulate('click')
      expect(wrapper.instance().state.isOpened).toBeFalsy()
    })

    it('"Save" button does call saveAndContinue and closes modal', () => {
      const wrapper = openWarning()
      wrapper
        .find(Button)
        .at(1)
        .simulate('click')
      expect(wrapper.instance().props.saveAndContinue).toBeCalled()
      expect(wrapper.instance().state.isOpened).toBeFalsy()
    })

    it('"Discard" button does call saveAndContinue and closes modal', () => {
      const wrapper = openWarning()
      wrapper
        .find(Button)
        .at(2)
        .simulate('click')
      expect(wrapper.instance().props.discardAndContinue).toBeCalled()
      expect(wrapper.instance().state.isOpened).toBeFalsy()
    })
  })
})
