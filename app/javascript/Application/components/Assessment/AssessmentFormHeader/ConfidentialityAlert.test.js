import React from 'react'
import { shallow } from 'enzyme'
import ConfidentialityAlert from './ConfidentialityAlert'

describe('<ConfidentialityAlert />', () => {
  const substanceUseItemsIds = { underSix: ['41'], aboveSix: ['8', '48'] }
  describe("when can't release information", () => {
    it('renders a warning text for 0-5 age group', () => {
      const wrapper = shallow(
        <ConfidentialityAlert
          canReleaseInformation={false}
          isUnderSix={true}
          substanceUseItemsIds={substanceUseItemsIds}
        />
      )
      const alert = wrapper.find('.warning-text')
      expect(alert.exists()).toBe(true)
      expect(alert.text()).toMatch(
        'By selecting "No" item EC 41 (Substance Use Disorder Item) from this CANS assessment will be redacted when printed.'
      )
    })

    it('renders a warning text for 6-21 age group', () => {
      const wrapper = shallow(
        <ConfidentialityAlert
          canReleaseInformation={false}
          isUnderSix={false}
          substanceUseItemsIds={substanceUseItemsIds}
        />
      )
      const alert = wrapper.find('.warning-text')
      expect(alert.exists()).toBe(true)
      expect(alert.text()).toMatch(
        'By selecting "No" items 8 and 48 (Substance Use Disorder Items) from this CANS assessment will be redacted when printed.'
      )
    })

    it("doesn't render a warning text when age group is not selected", () => {
      const wrapper = shallow(
        <ConfidentialityAlert
          canReleaseInformation={false}
          isUnderSix={null}
          substanceUseItemsIds={substanceUseItemsIds}
        />
      )
      expect(wrapper.type()).toBe(null)
    })
  })

  it('renders no warning when canReleaseInformation is true', () => {
    const wrapper = shallow(
      <ConfidentialityAlert canReleaseInformation={true} substanceUseItemsIds={substanceUseItemsIds} />
    )
    expect(wrapper.type()).toBe(null)
  })
})
