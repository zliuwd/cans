import React from 'react'
import { mount, shallow } from 'enzyme'
import Item from './Item'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const itemDefault = {
  code: 'lf10family',
  under_six_id: 1,
  above_six_id: 101,
  required: true,
  confidential: true,
  confidential_by_default: true,
  rating_type: 'REGULAR',
  has_na_option: false,
  rating: -1,
}

const itemWithNaChecked = {
  code: 'lf10family',
  under_six_id: 1,
  above_six_id: 101,
  required: true,
  confidential: true,
  confidential_by_default: true,
  rating_type: 'REGULAR',
  has_na_option: true,
  rating: 8,
}

const itemWithOutNaChecked = {
  code: 'lf10family',
  under_six_id: 1,
  above_six_id: 101,
  required: true,
  confidential: true,
  confidential_by_default: true,
  rating_type: 'REGULAR',
  has_na_option: true,
  rating: -1,
}

const i18nDefault = {
  _title_: 'Title',
  _description_: 'Description',
  '_to_consider_.0': 'qtc 0',
  '_to_consider_.1': 'qtc 1',
  '_rating_.0': 'rating 0 description',
  '_rating_.1': 'rating 1 description',
  '_rating_.2': 'rating 2 description',
  '_rating_.3': 'rating 3 description',
}

const propsDefault = { i18n: i18nDefault }

const itemComponentDefault = (
  <Item
    key={'1'}
    canReleaseConfidentialInfo={true}
    item={{ ...itemDefault }}
    isAssessmentUnderSix={true}
    i18n={{ ...i18nDefault }}
    onRatingUpdate={() => {}}
    onConfidentialityUpdate={() => {}}
  />
)

const mountItem = item => {
  return mount(
    <Item
      key={'1'}
      canReleaseConfidentialInfo={true}
      item={item}
      isAssessmentUnderSix={false}
      i18n={{ ...i18nDefault }}
      onRatingUpdate={() => {}}
      onConfidentialityUpdate={() => {}}
    />
  )
}

describe('<Item />', () => {
  it('can expand and fold', () => {
    const wrapper = mount({ ...itemComponentDefault })
    wrapper.setProps({ ...propsDefault })
    const foldedText = wrapper.text()
    expect(wrapper.find('#lf10family-item-expand').hasClass('fa-chevron-right')).toBe(true)
    expect(foldedText).not.toMatch(/Description/)

    wrapper.find('#lf10family-item-expand').simulate('click')
    const expandedText = wrapper.text()
    expect(wrapper.find('#lf10family-item-expand').hasClass('fa-chevron-down')).toBe(true)
    expect(expandedText).toMatch(/Description/)
  })

  it('when chevron button get focus and press tab item will not expand', async () => {
    const wrapper = mount({ ...itemComponentDefault })
    wrapper.find('i').simulate('keydown', { key: 'Tab' })
    expect(wrapper.instance().state.isExpanded).toEqual(false)
  })

  it('when chevron button get focus and press a key other than Tab, item will expand', async () => {
    const wrapper = mount({ ...itemComponentDefault })
    wrapper.find('i').simulate('keydown', { key: 'Enter' })
    expect(wrapper.instance().state.isExpanded).toEqual(true)
  })

  it('has a title, description, questions to consider and rating descriptions ', async () => {
    const wrapper = mount({ ...itemComponentDefault })
    wrapper.setProps({ ...propsDefault })
    const foldedText = wrapper.text()
    expect(foldedText).toMatch(/TITLE/)
    expect(foldedText).not.toMatch(/Description/)
    expect(foldedText).not.toMatch(/qtc/)
    expect(foldedText).not.toMatch(/rating/)

    wrapper.find('#lf10family-item-expand').simulate('click')
    const expandedText = wrapper.text()
    expect(expandedText).toMatch(/TITLE/)
    expect(expandedText).toMatch(/Description:Description/)
    expect(expandedText).toMatch(/qtc 0qtc 1/)
    expect(expandedText).toMatch(
      /0 = rating 0 description1 = rating 1 description2 = rating 2 description3 = rating 3 description/
    )
  })

  it('renders caregiver index if it exists', async () => {
    const wrapper = mount({ ...itemComponentDefault })
    wrapper.setProps({
      ...propsDefault,
      caregiverIndex: 'a',
    })
    const foldedText = wrapper.text()
    expect(foldedText).toMatch(/1a\. /)
  })

  describe('N/A option', () => {
    it('when have N/A option, N/A checkbox will be rendered. After checked, handleRatingChange will be called for 1 time', () => {
      const item = { ...itemWithOutNaChecked }
      item.has_na_option = true
      const wrapper = mountItem(item)
      const instance = wrapper.instance()
      jest.spyOn(instance, 'handleRatingChange')
      wrapper.setProps({ ...propsDefault })
      wrapper.find('#lf10family-item-expand').simulate('click')
      wrapper.find('FormControlLabel[label="N/A"]').prop('onChange')({ target: { value: 8 } })
      expect(instance.handleRatingChange).toHaveBeenCalledTimes(1)
    })

    it('after original unChecked N/A option be checked, handleNaValueSetting will set the checkbox value to 8', () => {
      const item = { ...itemWithOutNaChecked }
      item.has_na_option = true
      const wrapper = mountItem(item)
      const instance = wrapper.instance()
      jest.spyOn(instance, 'handleNaValueSetting')
      wrapper.setProps({ ...propsDefault })
      wrapper.find('#lf10family-item-expand').simulate('click')
      wrapper.find('FormControlLabel[label="N/A"]').prop('onChange')({ target: { value: 8 } })
      wrapper.update()
      expect(instance.handleNaValueSetting).toHaveBeenCalledTimes(2)
      expect(wrapper.find('FormControlLabel[label="N/A"][value="8"]').exists()).toBe(true)
    })

    it('after original Checked N/A option be unChecked, handleNaValueSetting will set the checkbox value to -1', () => {
      const item = { ...itemWithNaChecked }
      item.has_na_option = true
      const wrapper = mountItem(item)
      const instance = wrapper.instance()
      jest.spyOn(instance, 'handleNaValueSetting')
      wrapper.setProps({ ...propsDefault })
      wrapper.find('#lf10family-item-expand').simulate('click')
      wrapper.find('FormControlLabel[label="N/A"]').prop('onChange')({ target: { value: -1 } })
      wrapper.update()
      expect(instance.handleNaValueSetting).toHaveBeenCalledTimes(2)
      expect(wrapper.find('FormControlLabel[label="N/A"][value="-1"]').exists()).toBe(true)
    })

    it('when have no N/A option, N/A checkbox will #NOT# be rendered', () => {
      const item = { ...itemDefault }
      item.has_na_option = false
      const wrapper = mountItem(item)
      wrapper.setProps({ ...propsDefault })
      wrapper.find('#lf10family-item-expand').simulate('click')
      const naCheckbox = wrapper.find('FormControlLabel[label="N/A"]').find('Checkbox')
      expect(naCheckbox.length).toBe(0)
    })
  })

  describe('Rating Types label', () => {
    it('can have Regular rating', () => {
      const wrapper = mount({ ...itemComponentDefault })
      wrapper.setProps({ ...propsDefault })
      wrapper.find('#lf10family-item-expand').simulate('click')
      const expandedText = wrapper.text()
      expect(expandedText).toMatch(/0 = rating 0 description1 = rating 1 description/)
    })

    it('can have Boolean rating label', () => {
      const item = { ...itemDefault }
      item.rating_type = 'BOOLEAN'
      const wrapper = mountItem(item)
      wrapper.setProps({ ...propsDefault })
      wrapper.find('#lf10family-item-expand').simulate('click')
      const expandedText = wrapper.text()
      expect(expandedText).toMatch(/No = rating 0 descriptionYes = rating 1 description/)
    })
  })

  describe('Actions', () => {
    it('invokes onConfidentialityUpdate callback on confidentiality change', () => {
      const onConfidentialityUpdateMock = jest.fn()
      const wrapper = shallow(
        <Item
          key={'1'}
          canReleaseConfidentialInfo={true}
          item={{ ...itemDefault }}
          isAssessmentUnderSix={false}
          i18n={{ ...i18nDefault }}
          onRatingUpdate={() => {}}
          onConfidentialityUpdate={onConfidentialityUpdateMock}
        />
      )
      wrapper.setProps({ ...propsDefault })
      wrapper.instance().handleConfidentialityChange({ target: {} })
      expect(onConfidentialityUpdateMock.mock.calls.length).toBe(1)
    })
  })

  describe('canReleaseConfidentialInfo', () => {
    it('should disable the confidential checkbox when false paired with an item thats confidential_by_default', () => {
      const wrapper = shallow(
        <Item
          isAssessmentUnderSix={false}
          item={{ ...itemDefault }}
          i18n={{ ...i18nDefault }}
          canReleaseConfidentialInfo={false}
          onRatingUpdate={() => {}}
          onConfidentialityUpdate={() => {}}
        />
      )
      expect(
        wrapper
          .find(FormControlLabel)
          .dive()
          .dive()
          .find(Checkbox)
          .prop('disabled')
      ).toEqual(true)
    })
  })
})
