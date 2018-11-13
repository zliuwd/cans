import React from 'react'
import { shallow, mount } from 'enzyme'
import Domain from './Domain'
import { DomainProgressBar, DomainScore, DomainItemList, DomainCaregiverControls } from './'

const domainDefault = {
  id: '1',
  class: 'domain',
  code: 'BEHEMO',
  under_six: true,
  above_six: false,
  items: [
    {
      under_six_id: '',
      above_six_id: '1',
      code: '1',
      required: true,
      confidential: false,
      rating_type: 'REGULAR',
      rating: -1,
    },
  ],
}

const i18nDefault = {
  _title_: 'Title',
  _description_: 'Description',
}

const domainComponentDefault = (
  <Domain
    key={'1'}
    canReleaseConfidentialInfo={true}
    domain={{ ...domainDefault }}
    isAssessmentUnderSix={true}
    i18n={{ ...i18nDefault }}
    i18nAll={{ a: 'b' }}
    index={1}
    onRatingUpdate={() => {}}
    onConfidentialityUpdate={() => {}}
    onAddCaregiverDomain={() => {}}
    handleWarningShow={() => {}}
    onCaregiverNameUpdate={() => {}}
  />
)

describe('<Domain />', () => {
  it('renders with no exceptions', () => {
    expect(() => shallow(domainComponentDefault)).not.toThrow()
  })

  it('renders DomainScore', () => {
    const wrapper = shallow(domainComponentDefault)

    expect(wrapper.find(DomainScore).length).toBe(1)
  })

  it('should render ItemList when extended', () => {
    const wrapper = shallow(domainComponentDefault)
    wrapper.instance().handleExpandedChange()
    wrapper.update()
    expect(wrapper.find(DomainItemList).length).toBe(1)
  })

  describe('progress bar', () => {
    it('should render progress bar when folded', () => {
      const wrapper = shallow(domainComponentDefault)
      expect(wrapper.instance().state.expanded).toBeFalsy()
      expect(wrapper.find(DomainProgressBar).length).toBe(1)
    })

    it('should render progress bar when extended', () => {
      const wrapper = shallow(domainComponentDefault)
      wrapper.instance().handleExpandedChange()
      wrapper.update()
      expect(wrapper.instance().state.expanded).toBeTruthy()
      expect(wrapper.find(DomainProgressBar).length).toBe(1)
    })
  })

  describe('caregiver domain', () => {
    const callbackMock = jest.fn()
    const domain = {
      ...domainDefault,
      is_caregiver_domain: true,
      caregiver_index: 'a',
    }
    const domainComponent = (
      <Domain
        key={'1'}
        canReleaseConfidentialInfo={true}
        domain={{ ...domain }}
        isAssessmentUnderSix={true}
        i18n={{ ...i18nDefault }}
        i18nAll={{}}
        index={1}
        onRatingUpdate={() => {}}
        onConfidentialityUpdate={() => {}}
        onAddCaregiverDomain={callbackMock}
        handleWarningShow={() => {}}
        onCaregiverNameUpdate={() => {}}
      />
    )
    let wrapper
    beforeEach(() => {
      wrapper = mount(domainComponent)
      wrapper.instance().handleExpandedChange()
      wrapper.update()
    })

    it('will render DomainCaregiverControls', () => {
      expect(wrapper.find(DomainCaregiverControls).length).toBe(1)
    })

    it('will invoke onAddCaregiverDomain() callback', () => {
      const addCaregiverButton = wrapper.find('.caregiver-control').at(1)
      expect(wrapper.find(DomainCaregiverControls).length).toBe(1)
      addCaregiverButton.simulate('click')
      addCaregiverButton.simulate('keypress', { key: 'Enter' })
      addCaregiverButton.simulate('keypress', { key: 'Space' })
      expect(callbackMock.mock.calls.length).toBe(2)
    })

    it('invokes onRemoveCaregiverDomain() callback', () => {
      const removeCaregiverButton = wrapper.find('.caregiver-control').at(0)
      removeCaregiverButton.simulate('click')
      removeCaregiverButton.simulate('keypress', { key: 'Enter' })
      removeCaregiverButton.simulate('keypress', { key: 'Space' })
      expect(callbackMock.mock.calls.length).toBe(2)
    })

    describe('caregiver name', () => {
      describe('#handleCaregiverNameUpdate()', () => {
        describe('when caregiver name is changed', () => {
          it('updates domain header with the updated name', () => {
            // given
            const domain = {
              ...domainDefault,
              is_caregiver_domain: true,
              caregiver_index: 'a',
              caregiver_name: undefined,
            }
            const domainComponent = (
              <Domain
                key={'1'}
                canReleaseConfidentialInfo={true}
                domain={{ ...domain }}
                isAssessmentUnderSix={true}
                i18n={{ ...i18nDefault }}
                i18nAll={{}}
                index={1}
                onRatingUpdate={() => {}}
                onConfidentialityUpdate={() => {}}
                onAddCaregiverDomain={() => {}}
                handleWarningShow={() => {}}
                onCaregiverNameUpdate={() => {}}
              />
            )
            const wrapper = mount(domainComponent)
            wrapper.instance().handleExpandedChange()
            wrapper.update()
            const nameInput = wrapper.find('.caregiver-name').at(0)

            // when
            nameInput.simulate('change', { target: { value: 'Full Name' } })

            // then
            expect(wrapper.state('caregiverName')).toEqual('Full Name')
            expect(wrapper.find('ExpansionPanelSummary').text()).toMatch(/Full Name/)
          })
        })

        describe('when caregiver name input blurs', () => {
          it('invokes onCaregiverNameUpdate() callback', () => {
            // given
            const domain = {
              ...domainDefault,
              is_caregiver_domain: true,
              caregiver_index: 'a',
              caregiver_name: undefined,
            }
            const callbackMock = jest.fn()
            const domainComponent = (
              <Domain
                key={'1'}
                canReleaseConfidentialInfo={true}
                domain={{ ...domain }}
                isAssessmentUnderSix={true}
                i18n={{ ...i18nDefault }}
                i18nAll={{}}
                index={1}
                onRatingUpdate={() => {}}
                onConfidentialityUpdate={() => {}}
                onAddCaregiverDomain={() => {}}
                handleWarningShow={() => {}}
                onCaregiverNameUpdate={callbackMock}
              />
            )
            const wrapper = mount(domainComponent)
            wrapper.instance().handleExpandedChange()
            wrapper.update()
            const nameInput = wrapper.find('.caregiver-name').at(0)
            nameInput.simulate('change', { target: { value: 'Full Name' } })

            // when
            nameInput.simulate('blur')

            // then
            expect(callbackMock.mock.calls.length).toBe(1)
            expect(callbackMock.mock.calls[0][0]).toBe('a')
            expect(callbackMock.mock.calls[0][1]).toBe('Full Name')
          })
        })
      })
    })
  })
})
