import React from 'react'
import {
  Assessment,
  AssessmentContainer,
  AssessmentFormHeader,
  AssessmentService,
  I18nService,
  SecurityService,
} from './index'
import { childInfoJson } from '../Client/Client.helper.test'
import ClientService from '../Client/Client.service'
import { shallow, mount } from 'enzyme'
import Typography from '@material-ui/core/Typography/Typography'
import AssessmentSummaryCard from './AssessmentSummary/AssessmentSummaryCard'
import AssessmentFormFooter from './AssessmentFormFooter'
import PageModal from '../common/PageModal'
import {
  assessment,
  updatedAssessment,
  initialAssessment,
  instrument,
  updatedAssessmentDomains,
  updatedAssessmentWithDomains,
  domainWithTwoCaregiver,
} from './assessment.mocks.test'
import { LoadingState } from '../../util/loadingHelper'
import { getCurrentIsoDate } from '../../util/dateHelper'
import { globalAlertService } from '../../util/GlobalAlertService'
import * as Analytics from '../../util/analytics'
import { AssessmentStatus } from './AssessmentHelper'

jest.mock('../../util/analytics')

const defaultProps = {
  location: { childId: 1 },
  match: { params: { id: 1 } },
  pageHeaderButtonsController: {
    updateHeaderButtons: () => {},
    updateHeaderButtonsToDefault: () => {},
  },
  client: childInfoJson,
}

describe('<AssessmentContainer />', () => {
  const analyticsSpy = jest.spyOn(Analytics, 'logPageAction')
  beforeEach(() => {
    analyticsSpy.mockReset()
  })

  describe('init AssessmentContainer', () => {
    describe('page layout', () => {
      const props = {
        location: { childId: 10 },
        match: { params: { id: 1 } },
        pageHeaderButtonsController: {
          updateHeaderButtons: () => {},
          updateHeaderButtonsToDefault: () => {},
        },
        client: {},
      }

      beforeEach(() => {
        jest.spyOn(ClientService, 'fetch').mockReturnValue(Promise.resolve(childInfoJson))
        jest.spyOn(SecurityService, 'checkPermission').mockReturnValue(Promise.resolve(true))
        jest.spyOn(AssessmentService, 'fetch').mockReturnValue(Promise.resolve(assessment))
      })

      const getLength = (wrapper, component) => wrapper.find(component).length

      it('renders with 1 <AssessmentFormHeader /> component', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        expect(getLength(wrapper, AssessmentFormHeader)).toBe(1)
      })

      it('renders with 1 <AssessmentSummaryCard /> component', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        expect(getLength(wrapper, AssessmentSummaryCard)).toBe(1)
      })

      it('renders with 1 <Typography /> component', async () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        await wrapper.instance().componentDidMount()
        await wrapper.instance().setState({ assessment })
        expect(getLength(wrapper, Typography)).toBe(1)
      })

      it('renders without <AssessmentFormFooter /> component initially', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        expect(getLength(wrapper, AssessmentFormFooter)).toBe(0)
      })
    })

    describe('page header buttons', () => {
      it('should update page header buttons when all data loaded', async () => {
        const updateHeaderButtonsMock = jest.fn()
        const props = {
          ...defaultProps,
          match: { params: {} },
          pageHeaderButtonsController: {
            updateHeaderButtons: updateHeaderButtonsMock,
            updateHeaderButtonsToDefault: () => {},
          },
        }
        const wrapper = shallow(<AssessmentContainer {...props} />, { disableLifecycleMethods: true })
        await wrapper.instance().onFetchI18nSuccess({ key: 'value' })
        expect(updateHeaderButtonsMock).toHaveBeenCalledTimes(1)
      })

      it('should update page header buttons on componentDidUpdate', async () => {
        jest.spyOn(I18nService, 'fetchByInstrumentId').mockReturnValue(Promise.resolve({ key: 'value' }))
        const updateHeaderButtonsMock = jest.fn()
        const props = {
          ...defaultProps,
          match: { params: {} },
          pageHeaderButtonsController: {
            updateHeaderButtons: updateHeaderButtonsMock,
            updateHeaderButtonsToDefault: () => {},
          },
        }
        const wrapper = shallow(<AssessmentContainer {...props} />, { disableLifecycleMethods: true })
        wrapper.instance().shouldSaveButtonBeEnabled = jest.fn(() => true)
        wrapper.instance().componentDidUpdate()
        expect(updateHeaderButtonsMock).toHaveBeenCalledTimes(1)
      })

      describe('#updateSaveButtonStatusIfNeeded()', () => {
        it('should update page header buttons when needed', () => {
          const updateHeaderButtonsMock = jest.fn()
          const props = {
            ...defaultProps,
            match: { params: {} },
            pageHeaderButtonsController: {
              updateHeaderButtons: updateHeaderButtonsMock,
              updateHeaderButtonsToDefault: () => {},
            },
          }
          const wrapper = shallow(<AssessmentContainer {...props} />, { disableLifecycleMethods: true })
          wrapper.instance().shouldSaveButtonBeEnabled = jest.fn(() => true)
          wrapper.instance().componentDidUpdate()
          expect(updateHeaderButtonsMock).toHaveBeenCalledTimes(1)
        })

        it('should not update page header buttons when it is not needed', () => {
          const updateHeaderButtonsMock = jest.fn()
          const props = {
            ...defaultProps,
            match: { params: {} },
            pageHeaderButtonsController: {
              updateHeaderButtons: updateHeaderButtonsMock,
              updateHeaderButtonsToDefault: () => {},
            },
          }
          const wrapper = shallow(<AssessmentContainer {...props} />, { disableLifecycleMethods: true })
          wrapper.instance().shouldSaveButtonBeEnabled = jest.fn(() => false)
          wrapper.instance().componentDidUpdate()
          expect(updateHeaderButtonsMock).toHaveBeenCalledTimes(0)
        })
      })

      it('should reset page header buttons to default values on component will unmount ', () => {
        const updateToDefaultMock = jest.fn()
        const props = {
          ...defaultProps,
          match: { params: {} },
          pageHeaderButtonsController: {
            updateHeaderButtons: () => {},
            updateHeaderButtonsToDefault: updateToDefaultMock,
          },
        }
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().componentWillUnmount()
        expect(updateToDefaultMock).toHaveBeenCalledTimes(1)
      })
    })

    describe('renders component and shows warning', () => {
      const props = { ...defaultProps }
      it('updates state when user clicks I agree and removes warning', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().setState({
          assessment: assessment,
          isSubmitWarningShown: true,
        })
        wrapper
          .find('ConfidentialityWarning')
          .props()
          .onRemove()
        wrapper.instance().handleSubmitWarning(false)
        expect(wrapper.state().isSubmitWarningShown).toEqual(false)
      })

      it('verify warning is not shown when isSubmitWarningShown is falsy', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().setState({
          assessment: assessment,
          isSubmitWarningShown: false,
        })
        expect(wrapper.find('ConfidentialityWarning').exists()).toEqual(false)
      })
    })

    describe('renders a component which shows warning and sets the state', () => {
      const props = { ...defaultProps }
      it('verify the state is updated and removed domains ', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().setState({
          assessment: assessment,
          isCaregiverWarningShown: true,
          focusedCaregiverId: 0,
        })
        wrapper
          .find('PageModal')
          .props()
          .onRemove()
        wrapper.instance().handleWarningShow(false)
        expect(wrapper.state().isCaregiverWarningShown).toEqual(false)
        wrapper.instance().handleCaregiverRemove(1)
        wrapper.state().assessment.state.domains = updatedAssessmentDomains
        wrapper.instance().updateAssessment(wrapper.state().assessment)
        expect(wrapper.state().assessment).toEqual(updatedAssessmentWithDomains)
      })

      it('verify the state is updated and the modal is closed', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().setState({
          assessment: assessment,
          isCaregiverWarningShown: true,
          focusedCaregiverId: null,
        })
        wrapper
          .find('PageModal')
          .props()
          .onRemove()
        wrapper.instance().handleWarningShow(false)
        expect(wrapper.state().isCaregiverWarningShown).toEqual(false)
        wrapper.instance().handleCaregiverRemove(null)
        wrapper.instance().handleCaregiverRemoveAll('has_caregiver', false)
        expect(wrapper.state().assessment.has_caregiver).toEqual(false)
      })
    })

    describe('when user clicks remove or switches radio to no caregiver doamins are removed', () => {
      const props = { ...defaultProps }
      it('will delete the caregiver by id ', () => {
        const wrapper = mount(<AssessmentContainer {...props} />)
        wrapper.setState({
          assessment: {
            ...assessment,
            has_caregiver: true,
            state: {
              ...assessment.state,
              domains: [...domainWithTwoCaregiver],
            },
          },
          isCaregiverWarningShown: true,
          focusedCaregiverId: 'a',
        })
        wrapper
          .find('PageModal')
          .find('.warning-modal-stay-logged-in')
          .first()
          .simulate('click')

        wrapper.update()
        expect(wrapper.state().assessment.state.domains.length).toEqual(1)
        expect(wrapper.state().assessment.state.domains[0].caregiver_index).toEqual('b')
      })

      it('removes all caregiver domains when user confirms after switching radio button to no', () => {
        const wrapper = mount(<AssessmentContainer {...props} />)
        wrapper.setState({
          assessment: {
            ...assessment,
            has_caregiver: true,
            state: {
              ...assessment.state,
              domains: [...domainWithTwoCaregiver],
            },
          },
          isCaregiverWarningShown: true,
          focusedCaregiverId: null,
        })
        wrapper
          .find('PageModal')
          .find('.warning-modal-stay-logged-in')
          .first()
          .simulate('click')

        wrapper.update()
        expect(wrapper.state().assessment.state.domains.length).toEqual(0)
      })

      it('removes a single caregiver domain and the cargiver value is updated', () => {
        const wrapper = mount(<AssessmentContainer {...props} />)
        const single = [domainWithTwoCaregiver[1]]
        wrapper.setState({
          assessment: {
            ...assessment,
            has_caregiver: true,
            state: { ...assessment.state, domains: [...single] },
          },
          isCaregiverWarningShown: true,
          focusedCaregiverId: 'b',
        })
        wrapper
          .find('PageModal')
          .find('.warning-modal-stay-logged-in')
          .first()
          .simulate('click')

        wrapper.update()
        expect(wrapper.state().assessment.state.domains.length).toEqual(0)
        expect(wrapper.state().assessment.has_caregiver).toEqual(false)
      })
    })

    describe('verifies if caregiver id is removed when the state is updated', () => {
      const props = { ...defaultProps }
      it('should set cargiver value to null', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().setState({
          assessment: assessment,
          isCaregiverWarningShown: true,
          focusedCaregiverId: 0,
        })
        wrapper.instance().handleWarningShow(false)
        expect(wrapper.state().isCaregiverWarningShown).toEqual(false)
        expect(wrapper.state().focusedCaregiverId).toEqual(null)
      })

      it('should update cargiver value in state', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().setState({
          assessment: assessment,
          isCaregiverWarningShown: true,
          focusedCaregiverId: 1,
        })
        wrapper.instance().handleWarningShow(false, 1)
        expect(wrapper.state().isCaregiverWarningShown).toEqual(false)
        expect(wrapper.state().focusedCaregiverId).toEqual(1)
      })
    })

    describe('warning modal when warning is canceled', () => {
      const props = { ...defaultProps }
      it('should not render PageModal component when warningShow is not true', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().setState({
          assessment: assessment,
          isCaregiverWarningShown: false,
        })
        expect(wrapper.find(PageModal).length).toBe(0)
      })
    })

    describe('warning model when warning is shown', () => {
      const props = { ...defaultProps }
      it('should render PageModal component when warningShow is true', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().setState({
          assessment: assessment,
          isCaregiverWarningShown: true,
        })
        expect(wrapper.find(PageModal).length).toBe(1)
      })

      it('should render cancel button label when warningShow is true', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().setState({
          assessment: assessment,
          isCaregiverWarningShown: true,
        })
        expect(wrapper.find(PageModal).props().cancelButtonLabel).toContain('Cancel')
      })

      it('should render remove button label when warningShow is true', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().setState({
          assessment: assessment,
          isCaregiverWarningShown: true,
        })
        expect(wrapper.find(PageModal).props().removeButtonLabel).toContain('Remove')
      })

      it('should render description when warningShow is true', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().setState({
          assessment: assessment,
          isCaregiverWarningShown: true,
        })
        expect(wrapper.find(PageModal).props().description).toContain('This may effect some of your entries.')
      })

      it('should render title when warningShow is true', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().setState({
          assessment: assessment,
          isCaregiverWarningShown: true,
        })
        expect(wrapper.find(PageModal).props().title).toContain('Warning')
      })

      it('should render isOpen when warningShow is true', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().setState({
          assessment: assessment,
          isCaregiverWarningShown: true,
        })
        expect(wrapper.find(PageModal).props().isOpen).toEqual(true)
      })
    })

    describe('assessment form with no existing assessment', () => {
      const props = {
        client: childInfoJson,
        pageHeaderButtonsController: {
          updateHeaderButtons: () => {},
          updateHeaderButtonsToDefault: () => {},
        },
      }

      it('calls fetchNewAssessment', async () => {
        const assessmentServiceGetSpy = jest.spyOn(AssessmentService, 'fetchNewAssessment')
        jest.spyOn(ClientService, 'fetch').mockReturnValue(Promise.resolve(childInfoJson))
        jest.spyOn(SecurityService, 'checkPermission').mockReturnValue(Promise.resolve(true))
        const wrapper = shallow(<AssessmentContainer {...props} />)
        await wrapper.instance().componentDidMount()
        expect(assessmentServiceGetSpy).toHaveBeenCalledWith()
      })

      it('sets a new assessment on component state', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        expect(wrapper.state('assessment').instrument_id).toBeFalsy()
        wrapper.instance().onFetchNewAssessmentSuccess(instrument)
        const assessment = wrapper.state('assessment')
        expect(assessment).toEqual({
          ...initialAssessment,
          service_source: 'CASE',
          service_source_id: 'C6vN5DG0Aq',
          service_source_ui_id: '0687-9473-7673-8000672',
        })
        expect(assessment.person).toEqual(childInfoJson)
        expect(assessment.county).toEqual(childInfoJson.county)
      })

      it('passes an unset age group to the assessment component', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().onFetchNewAssessmentSuccess(instrument)
        const form = wrapper.find(Assessment)
        expect(form.props().assessment.state.under_six).toBeUndefined()
      })

      it('hides the submit validation message', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().onFetchNewAssessmentSuccess(instrument)
        expect(wrapper.find('.submit-validation-message').exists()).toBe(false)
      })

      it('hides the assessment footer', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().onFetchNewAssessmentSuccess(instrument)
        expect(wrapper.find(AssessmentFormFooter).exists()).toBeFalsy()
      })
    })

    describe('assessment form with an existing assessment', () => {
      const props = {
        location: { childId: 1 },
        pageHeaderButtonsController: {
          updateHeaderButtons: () => {},
          updateHeaderButtonsToDefault: () => {},
        },
        isSaveButtonEnabled: true,
        client: {},
        assessment,
      }

      it('calls fetchAssessment', async () => {
        const assessmentServiceGetSpy = jest.spyOn(AssessmentService, 'fetchNewAssessment')
        jest.spyOn(ClientService, 'fetch').mockReturnValue(Promise.resolve(childInfoJson))
        jest.spyOn(SecurityService, 'checkPermission').mockReturnValue(Promise.resolve(true))
        const wrapper = shallow(<AssessmentContainer {...props} />)
        await wrapper.instance().componentDidMount()
        expect(assessmentServiceGetSpy).toHaveBeenCalledWith()
      })

      it('shows the assessment footer', () => {
        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().onFetchAssessmentSuccess(assessment)
        expect(wrapper.find(AssessmentFormFooter).exists()).toBeTruthy()
      })
    })
  })

  describe('save assessment', () => {
    describe('with a new assessment', () => {
      it('should call AssessmentService.postAssessment', () => {
        const assessmentServicePostSpy = jest.spyOn(AssessmentService, 'postAssessment')
        const wrapper = shallow(<AssessmentContainer {...defaultProps} />)
        const assessment = {
          event_date: getCurrentIsoDate(),
          has_caregiver: true,
          person: childInfoJson,
          state: { domains: [] },
        }
        wrapper.instance().handleSaveAssessment()
        assessmentServicePostSpy.mockReturnValue(Promise.resolve(assessment))
        expect(assessmentServicePostSpy).toHaveBeenCalledWith(assessment)
      })

      it('should invoke globalAlertService with success message on initial save', async () => {
        // given
        const postSuccessSpy = jest.spyOn(globalAlertService, 'postSuccess')
        jest.spyOn(AssessmentService, 'postAssessment').mockReturnValue(Promise.resolve(assessment))
        const wrapper = await shallow(<AssessmentContainer {...defaultProps} />)

        // when
        await wrapper.instance().handleSaveAssessment()
        wrapper.update()

        // then
        expect(postSuccessSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('with an existing assessment', () => {
      it('should call AssessmentService.update', () => {
        const assessmentServicePutSpy = jest.spyOn(AssessmentService, 'update')
        const wrapper = shallow(<AssessmentContainer {...defaultProps} />)
        assessmentServicePutSpy.mockReturnValue(Promise.resolve(assessment))
        wrapper.setState({ assessment: { ...assessment, id: 1 } })
        wrapper.instance().handleSaveAssessment()
        expect(assessmentServicePutSpy).toHaveBeenCalledWith(1, {
          ...assessment,
          id: 1,
          person: childInfoJson,
        })
      })

      it('should update state with assessment', async () => {
        const assessmentServicePutSpy = jest.spyOn(AssessmentService, 'update')
        const wrapper = shallow(<AssessmentContainer {...defaultProps} />)
        assessmentServicePutSpy.mockReturnValue(Promise.resolve(assessment))
        wrapper.setState({ assessment: { ...assessment, id: 1 } })
        await wrapper.instance().handleSaveAssessment()
        expect(assessmentServicePutSpy).toHaveBeenCalledWith(1, {
          ...assessment,
          id: 1,
          person: childInfoJson,
        })
        expect(wrapper.state('assessment').id).toBe(1)
        expect(wrapper.state('assessment').state.domains).toBeTruthy()
      })

      it('should post success message on save', async () => {
        // given
        const postSuccessSpy = jest.spyOn(globalAlertService, 'postSuccess')
        jest.spyOn(ClientService, 'fetch').mockReturnValue(Promise.resolve(childInfoJson))
        jest.spyOn(AssessmentService, 'update').mockReturnValue(Promise.resolve(assessment))
        jest.spyOn(SecurityService, 'checkPermission').mockReturnValue(Promise.resolve(true))
        jest.spyOn(AssessmentService, 'fetchNewAssessment').mockReturnValue(Promise.resolve(instrument))
        const wrapper = await shallow(<AssessmentContainer {...defaultProps} />)
        wrapper.setState({ assessment: { ...assessment, id: 1 } })
        // when
        await wrapper.instance().handleSaveAssessment()
        wrapper.update()

        // then
        expect(postSuccessSpy).toHaveBeenCalledTimes(1)
      })

      it('should post success message on submit', async () => {
        // given
        const postSuccessSpy = jest.spyOn(globalAlertService, 'postSuccess')
        jest.spyOn(ClientService, 'fetch').mockReturnValue(Promise.resolve(childInfoJson))
        jest.spyOn(AssessmentService, 'update').mockReturnValue(Promise.resolve(assessment))
        jest.spyOn(SecurityService, 'checkPermission').mockReturnValue(Promise.resolve(true))
        jest.spyOn(AssessmentService, 'fetchNewAssessment').mockReturnValue(Promise.resolve(instrument))
        const wrapper = await shallow(<AssessmentContainer {...defaultProps} />)
        wrapper.setState({ assessment: { ...assessment, id: 1 } })
        // when
        await wrapper.instance().handleSubmitAssessment()
        wrapper.update()

        // then
        expect(postSuccessSpy).toHaveBeenCalledTimes(1)
      })
    })

    it('should log analytics to New Relic when assessment is saved', async () => {
      const assessmentServicePutSpy = jest.spyOn(AssessmentService, 'update')
      const wrapper = shallow(<AssessmentContainer {...defaultProps} />)
      assessmentServicePutSpy.mockReturnValue(Promise.resolve(assessment))
      wrapper.setState({ assessment: assessment })
      await wrapper.instance().handleSaveAssessment()
      expect(analyticsSpy).toHaveBeenCalledWith('assessmentSave', {
        assessment_id: 1,
        assessment_county: assessment.county.name,
      })
    })
  })

  describe('submit assessment', () => {
    describe('when a new assessment', () => {
      it('should call AssessmentService.postAssessment', () => {
        const assessmentServicePostSpy = jest.spyOn(AssessmentService, 'postAssessment')
        const props = {
          match: { params: { id: 1 } },
          client: childInfoJson,
          pageHeaderButtonsController: {
            updateHeaderButtons: () => {},
            updateHeaderButtonsToDefault: () => {},
          },
        }

        const wrapper = shallow(<AssessmentContainer {...props} />)
        wrapper.instance().handleSubmitAssessment()

        assessmentServicePostSpy.mockReturnValue(Promise.resolve(assessment))
        const expectedArgument = {
          event_date: getCurrentIsoDate(),
          has_caregiver: true,
          person: childInfoJson,
          state: { domains: [] },
          status: 'COMPLETED',
        }
        expect(assessmentServicePostSpy).toHaveBeenCalledWith(expectedArgument)
      })
    })

    describe('when an existing assessment', () => {
      it('should call AssessmentService.update', () => {
        const assessmentServicePutSpy = jest.spyOn(AssessmentService, 'update')
        const wrapper = shallow(<AssessmentContainer {...defaultProps} />)
        assessmentServicePutSpy.mockReturnValue(Promise.resolve(assessment))
        wrapper.setState({ assessment: { ...assessment, id: 1 } })
        wrapper.instance().handleSubmitAssessment()
        expect(assessmentServicePutSpy).toHaveBeenCalledWith(1, {
          ...assessment,
          id: 1,
          person: childInfoJson,
          status: 'COMPLETED',
        })
      })
    })

    it('should log analytics to New Relic when assessment is submitted', async () => {
      const assessmentServicePutSpy = jest.spyOn(AssessmentService, 'update')
      const wrapper = shallow(<AssessmentContainer {...defaultProps} />)
      assessmentServicePutSpy.mockReturnValue(Promise.resolve(assessment))
      wrapper.setState({ assessment: assessment })
      await wrapper.instance().handleSubmitAssessment()
      expect(analyticsSpy).toHaveBeenCalledWith('assessmentSubmit', {
        assessment_id: 1,
        assessment_county: assessment.county.name,
      })
    })
  })

  describe('update assessment', () => {
    describe('is passed updated data', () => {
      it('will update the assessment on the component state', () => {
        const wrapper = shallow(<AssessmentContainer {...defaultProps} />)
        wrapper.setState({ assessment: assessment })
        expect(wrapper.state('assessment')).toEqual(assessment)
        wrapper.instance().updateAssessment(updatedAssessment)
        expect(wrapper.state('assessment')).toEqual(updatedAssessment)
      })

      it('validates assessment for submit', () => {
        const wrapper = shallow(<AssessmentContainer {...defaultProps} />)
        wrapper.setState({ assessment: updatedAssessment })
        expect(wrapper.state('isValidForSubmit')).toEqual(false)
        wrapper.instance().updateAssessment(assessment)
        expect(wrapper.state('isValidForSubmit')).toEqual(true)
      })
    })
  })

  describe('initial save', () => {
    it('will update the assessment on the component state', () => {
      const props = {
        location: { childId: 1 },
        match: { params: { id: 1 } },
        history: { push: jest.fn() },
        client: childInfoJson,
        pageHeaderButtonsController: {
          updateHeaderButtons: () => {},
          updateHeaderButtonsToDefault: () => {},
        },
      }
      const wrapper = shallow(<AssessmentContainer {...props} />)

      wrapper.setState({ assessment: assessment })
      expect(wrapper.state('assessment')).toEqual(assessment)
      wrapper.instance().initialSave(updatedAssessment)
      expect(wrapper.state('assessment')).toEqual(updatedAssessment)
    })

    it('will update the url with the assessment id', () => {
      const historyPushMock = { push: jest.fn() }
      const wrapper = shallow(<AssessmentContainer {...defaultProps} history={historyPushMock} />)

      wrapper.setState({ child: childInfoJson })
      wrapper.instance().initialSave(updatedAssessment)

      expect(historyPushMock.push).toHaveBeenCalledWith('/clients/aaaaaaaaaa/assessments/1')
    })
  })

  describe('buttons', () => {
    describe('Cancel button', () => {
      it('redirects to client page', async () => {
        const wrapper = shallow(<AssessmentContainer {...defaultProps} />, {
          disableLifecycleMethods: true,
        })
        await wrapper.instance().handleCancelClick()
        expect(wrapper.state().shouldRedirectToClientProfile).toEqual(true)
        expect(wrapper.find('Redirect').exists()).toBe(true)
      })
    })

    describe('Submit button', () => {
      it('is disabled/enabled based on the assessment validity', () => {
        const wrapper = mount(<AssessmentContainer {...defaultProps} />)
        wrapper.setState({
          isValidForSubmit: false,
          assessmentServiceStatus: LoadingState.ready,
          isEditable: true,
          assessment,
        })
        expect(wrapper.find('AuthBoundary').props().andCondition).toBe(false)

        wrapper.setState({
          isValidForSubmit: true,
          assessmentServiceStatus: LoadingState.ready,
          isEditable: true,
          assessment,
        })
        expect(wrapper.find('AuthBoundary').props().andCondition).toBe(true)
      })
    })

    describe('handleKeyUp', () => {
      let wrapper
      let instance
      beforeEach(() => {
        wrapper = shallow(<AssessmentContainer {...defaultProps} />)
        instance = wrapper.instance()
      })

      it('should default isValidDate to true', () => {
        expect(instance.state.isValidDate).toEqual(true)
      })

      it('should set isValidDate to true when date is valid', () => {
        instance.setState({ isValidDate: false })
        instance.handleKeyUp({ target: { value: '10/09/2018' } })
        expect(instance.state.isValidDate).toEqual(true)
      })

      it('should set isValidDate to false when date is invalid', () => {
        instance.handleKeyUp({ target: { value: '325982323' } })
        expect(instance.state.isValidDate).toEqual(false)
        instance.handleKeyUp({ target: { value: '10/2019/21' } })
        expect(instance.state.isValidDate).toEqual(false)
        instance.handleKeyUp({ target: { value: '' } })
        expect(instance.state.isValidDate).toEqual(false)
        instance.handleKeyUp({ target: {} })
        expect(instance.state.isValidDate).toEqual(false)
      })
    })

    describe('complete button', () => {
      it('should be disabled when assessment service is working', () => {
        const wrapper = mount(<AssessmentContainer {...defaultProps} />)

        // when
        wrapper.setState({
          isValidForSubmit: true,
          isEditable: true,
          assessmentServiceStatus: LoadingState.waiting,
          assessment,
        })

        // then
        expect(wrapper.find('AuthBoundary').props().andCondition).toBeFalsy()
      })

      it('should be enabled when assessment service is done loading', () => {
        const wrapper = mount(<AssessmentContainer {...defaultProps} />)

        // when
        wrapper.setState({
          isValidForSubmit: true,
          assessmentServiceStatus: LoadingState.ready,
          isEditable: true,
          assessment,
        })

        // then
        expect(wrapper.find('AuthBoundary').instance().props.andCondition).toBeTruthy()
      })

      it('should not be rendered when assessment is not editable', () => {
        const wrapper = mount(<AssessmentContainer {...defaultProps} />)

        // when
        wrapper.setState({
          isValidForSubmit: true,
          assessmentServiceStatus: LoadingState.ready,
          isEditable: false,
          assessment,
        })

        // then
        expect(wrapper.find('AuthBoundary').exists()).toBeFalsy()
      })
    })
  })

  describe('#shouldSaveButtonBeEnabled()', () => {
    const getInstance = () => shallow(<AssessmentContainer {...defaultProps} />).instance()

    it('should return true when save button should be enabled', () => {
      const instance = getInstance()
      instance.setState({
        isValidDate: true,
        isEditable: true,
        assessment: {
          event_date: '2010-10-13',
          state: {
            domains: [],
            under_six: false,
          },
        },
        assessmentServiceStatus: LoadingState.ready,
      })
      expect(instance.shouldSaveButtonBeEnabled()).toBeTruthy()

      instance.setState({
        isValidDate: true,
        isEditable: true,
        assessment: {
          ...assessment,
          event_date: '2010-10-13',
          state: {
            domains: [],
            under_six: true,
          },
        },
        assessmentServiceStatus: LoadingState.idle,
      })
      expect(instance.shouldSaveButtonBeEnabled()).toBeTruthy()
    })

    describe('false response', () => {
      it('should return false when date is invalid', () => {
        const instance = getInstance()
        instance.setState({
          isValidDate: false,
          isEditable: true,
          assessment: {
            event_date: '2010-10-13',
            state: {
              domains: [],
              under_six: false,
            },
          },
          assessmentServiceStatus: LoadingState.ready,
        })
        expect(instance.shouldSaveButtonBeEnabled()).toBeFalsy()
      })

      it('should return false when is not editable by user', () => {
        const instance = getInstance()
        instance.setState({
          isValidDate: true,
          isEditable: false,
          assessment: {
            event_date: '2010-10-13',
            state: {
              domains: [],
              under_six: false,
            },
          },
          assessmentServiceStatus: LoadingState.ready,
        })
        expect(instance.shouldSaveButtonBeEnabled()).toBeFalsy()
      })

      it('should return false when is no event date', () => {
        const instance = getInstance()
        instance.setState({
          isValidDate: true,
          isEditable: true,
          assessment: {
            event_date: null,
            state: {
              domains: [],
              under_six: false,
            },
          },
          assessmentServiceStatus: LoadingState.ready,
        })
        expect(instance.shouldSaveButtonBeEnabled()).toBeFalsy()
      })

      it('should return false when under_six flag is undefined', () => {
        const instance = getInstance()
        instance.setState({
          isValidDate: true,
          isEditable: true,
          assessment: {
            event_date: '2010-10-13',
            state: {
              domains: [],
              under_six: undefined,
            },
          },
          assessmentServiceStatus: LoadingState.ready,
        })
        expect(instance.shouldSaveButtonBeEnabled()).toBeFalsy()
      })
    })
  })

  describe('isEditable', () => {
    const wrapper = shallow(<AssessmentContainer {...defaultProps} />)
    wrapper.instance().onFetchAssessmentSuccess(assessment)

    it('should enable <AssessmentFormHeader/> when isEditable=true and disable when isEditable=false', () => {
      wrapper.instance().setState({ isEditable: true })
      expect(wrapper.find('AssessmentFormHeader').prop('disabled')).toEqual(false)

      wrapper.instance().setState({ isEditable: false })
      expect(wrapper.find('AssessmentFormHeader').prop('disabled')).toEqual(true)
    })

    it('should enable  <AssessmentSummaryCard/> when isEditable=true and disable when isEditable=false', () => {
      wrapper.instance().setState({ isEditable: true })
      expect(wrapper.find('AssessmentSummaryCard').prop('disabled')).toEqual(false)

      wrapper.instance().setState({ isEditable: false })
      expect(wrapper.find('AssessmentSummaryCard').prop('disabled')).toEqual(true)
    })

    it('should enable  <Assessment/> when isEditable=true and disable when isEditable=false', () => {
      wrapper.instance().setState({ isEditable: true })
      expect(wrapper.find('Assessment').prop('disabled')).toEqual(false)

      wrapper.instance().setState({ isEditable: false })
      expect(wrapper.find('Assessment').prop('disabled')).toEqual(true)
    })

    it('should enable  <AssessmentFormFooter/> when isEditable=true and should not be rendered when isEditable=false', () => {
      wrapper.instance().setState({ isEditable: false })
      expect(wrapper.find('AssessmentFormFooter').exists()).toEqual(false)
    })

    describe('when assessment status=COMPLETED', () => {
      const wrapper = shallow(<AssessmentContainer {...defaultProps} />)
      wrapper.instance().setState({
        assessment: {
          event_date: '2010-10-13',
          state: {
            domains: [],
            under_six: undefined,
          },
          status: AssessmentStatus.completed,
        },
        isEditable: false,
      })

      it('should display alert box', () => {
        expect(wrapper.find('#top-alert-box').exists()).toBe(true)
        expect(wrapper.find('#top-alert-box').prop('message')).toEqual(
          'This assessment was completed and is available for view only.'
        )
      })
    })

    describe('when assessment status=IN_PROGRESS', () => {
      const wrapper = shallow(<AssessmentContainer {...defaultProps} />)
      wrapper.instance().setState({
        assessment: {
          event_date: '2010-10-13',
          state: {
            domains: [],
            under_six: undefined,
          },
          status: AssessmentStatus.inProgress,
        },
        isEditable: false,
      })

      it('should display alert box', () => {
        expect(wrapper.find('#top-alert-box').exists()).toBe(true)
        expect(wrapper.find('#top-alert-box').prop('message')).toEqual(
          'This CANS is under the jurisdiction of another county. Available for view only.'
        )
      })
    })
  })
})
