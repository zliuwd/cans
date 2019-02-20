import React from 'react'
import { GlobalAlert } from './GlobalAlert'
import { globalAlertService } from '../../util/GlobalAlertService'
import { shallow, mount } from 'enzyme'

describe('<GlobalAlert>', () => {
  describe('render', () => {
    let globalAlerts
    const findAlerts = () => globalAlerts.find('.global-alert')

    beforeEach(() => {
      globalAlerts = shallow(<GlobalAlert />)
    })

    it('does not show content when empty errors', () => {
      expect(findAlerts().length).toBe(0)
      expect(globalAlerts.render().text()).toBe('')
    })

    it('shows alert', () => {
      globalAlertService.postError({ message: 'Error message' })
      const alert = findAlerts()
      expect(alert.length).toBe(1)
      expect(alert.render().text()).toBe('Error message')
    })

    it('shows autocloseable success alert', () => {
      globalAlertService.postSuccess({ message: 'Success message', isAutoCloseable: true })
      const alert = findAlerts()
      expect(alert.length).toBe(1)
      expect(alert.props().isAutoCloseable).toBeTruthy()
    })

    it('shows multiple alerts', () => {
      globalAlertService.postError({ message: 'Error message' })
      globalAlertService.postError({ message: 'Other Error message' })
      expect(findAlerts().length).toBe(2)
    })

    it('can close alert', () => {
      globalAlertService.postError({ message: 'Error message' })
      globalAlertService.postError({ message: 'Other Error message' })
      globalAlertService.postError({ message: 'One more Error message' })

      const closeTopAlert = () => {
        findAlerts()
          .at(0)
          .props()
          .onClose()
      }

      closeTopAlert()
      const alerts = findAlerts()
      expect(alerts.length).toBe(2)
      const at0 = alerts.at(0)
      expect(at0.render().text()).toBe('Other Error message')
      const at1 = alerts.at(1)
      expect(at1.render().text()).toBe('One more Error message')

      // Close second alert
      closeTopAlert()
      // Close last alert
      closeTopAlert()
      expect(findAlerts().length).toBe(0)
    })

    it('should close alert by messageId', () => {
      const instance = globalAlerts.instance()
      instance.setState({ alerts: [] })
      globalAlertService.postError({ message: 'Error message', messageId: 'mId1' })
      globalAlertService.postError({ message: 'Other Error message', messageId: 'mId2' })
      globalAlertService.postError({ message: 'One more Error message' })
      expect(instance.state.alerts.length).toEqual(3)

      globalAlertService.closeAlert('mId1')
      expect(instance.state.alerts.length).toEqual(2)
      globalAlertService.closeAlert('mId2')
      expect(instance.state.alerts.length).toEqual(1)
    })

    it('should not show alerts with the same id', () => {
      const instance = globalAlerts.instance()
      instance.setState({ alerts: [] })

      globalAlertService.postError({ message: 'Error message' })
      globalAlertService.postError({ message: 'Error message' })
      expect(instance.state.alerts.length).toEqual(2)

      instance.setState({ alerts: [] })
      globalAlertService.postError({ message: 'Error message', messageId: 'mId' })
      globalAlertService.postError({ message: 'Error message', messageId: 'mId' })
      expect(instance.state.alerts.length).toEqual(1)
    })
  })

  describe('multiple globalAlerts', () => {
    const wrapper = mount(
      <div>
        <GlobalAlert />
        <GlobalAlert id={'second'} />
      </div>
    )

    it('renders alerts according to componentId', () => {
      wrapper.find('GlobalAlert').forEach(globalAlert => {
        globalAlert.instance().setState({ alerts: [] })
      })
      globalAlertService.postError({ message: 'Error message #1' })
      globalAlertService.postError({ message: 'Error message #2', componentId: 'second' })
      globalAlertService.postError({ message: 'Error message #3' })
      wrapper.find('GlobalAlert').forEach(globalAlert => {
        const alerts = globalAlert.instance().state.alerts
        if (globalAlert.prop('id') === 'second') {
          expect(alerts.length).toEqual(1)
          expect(alerts[0].message).toEqual('Error message #2')
        } else {
          expect(alerts.length).toEqual(2)
          expect(alerts[0].message).toEqual('Error message #1')
          expect(alerts[1].message).toEqual('Error message #3')
        }
      })
    })
  })
})
