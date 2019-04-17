import React from 'react'
import { mount, shallow } from 'enzyme'
import {
  assessmentWithConfidentialItem,
  assessmentWithDiscretionNeededItem,
  assessmentWithNoConfidentialItem,
  i18nPrint,
} from '../../Assessment/assessment.mocks.test'
import { getI18nByCode } from '../../common/I18nHelper'
import PrintDomain from './PrintDomain'
import PrintItem from './PrintItem'
import PrintDomainHeader from './PrintDomainHeader'
import PrintDomainCommentHeader from './PrintDomainCommentHeader'
import { redactLevels } from './PrintAssessmentHelper'
const fakePropsWithNoConfidentialItem = {
  domain: { ...assessmentWithNoConfidentialItem.state.domains[0] },
  domainI18n: getI18nByCode(i18nPrint, 'BEN'),
  i18n: i18nPrint,
  isAssessmentUnderSix: false,
}

const fakePropsWithConfidentialItem = {
  domain: { ...assessmentWithConfidentialItem.state.domains[0] },
  domainI18n: getI18nByCode(i18nPrint, 'BEN'),
  i18n: i18nPrint,
  isAssessmentUnderSix: false,
}

const fakePropsWithDiscretionNeededItem = {
  domain: { ...assessmentWithDiscretionNeededItem.state.domains[0] },
  domainI18n: getI18nByCode(i18nPrint, 'BEN'),
  i18n: i18nPrint,
  isAssessmentUnderSix: false,
}

describe('<PrintDomain />', () => {
  let wrapper
  let confidentialWrapper
  beforeEach(() => {
    wrapper = mount(<PrintDomain {...fakePropsWithNoConfidentialItem} />)
    confidentialWrapper = mount(<PrintDomain {...fakePropsWithConfidentialItem} />)
  })

  afterEach(() => {
    wrapper.unmount()
    confidentialWrapper.unmount()
  })

  it('will render a PrintDomainHeader with correct props', () => {
    const target = wrapper.find(PrintDomainHeader)
    expect(target.length).toBe(1)
    expect(Object.keys(target.props())).toContain('text', 'total')
  })

  it('will render PrintItem with correct props', () => {
    const target = wrapper.find(PrintItem)
    expect(target.length).toBeGreaterThan(0)
    expect(Object.keys(target.at(0).props())).toContain(
      'item',
      'index',
      'caregiverIndex',
      'itemI18n',
      'isAssessmentUnderSix',
      'isItemHidden',
      'redactLevel'
    )
  })

  it('will render PrintDomainCommentHeader with correct props when does not have confidential items', () => {
    const target = wrapper.find(PrintDomainCommentHeader)
    expect(target.length).toBe(1)
    expect(Object.keys(target.props())).toContain('text')
  })

  it('will not render PrintDomainCommentHeader does not have confidential items', () => {
    const target = confidentialWrapper.find(PrintDomainCommentHeader)
    expect(target.length).toBe(0)
  })

  describe('#getTotalScore', () => {
    const render = props => {
      return shallow(<PrintDomain {...props} />)
    }

    it('returns Confidential when redactLevel = all and domain has confidential item ', () => {
      const target = confidentialWrapper.find(PrintDomainHeader)
      expect(target.props().total).toEqual('Confidential')
    })

    it('returns Confidential when redactLevel = confidential and domain has confidential item ', () => {
      const target = render({ redactLevel: redactLevels.confidential, ...fakePropsWithConfidentialItem }).find(
        PrintDomainHeader
      )
      expect(target.props().total).toEqual('Confidential')
    })

    it('returns score when redactLevel = confidential and domain does not have confidential item ', () => {
      expect(
        render({ redactLevel: redactLevels.confidential, ...fakePropsWithNoConfidentialItem })
          .find(PrintDomainHeader)
          .props().total
      ).toBe(1)

      expect(
        render({ redactLevel: redactLevels.confidential, ...fakePropsWithDiscretionNeededItem })
          .find(PrintDomainHeader)
          .props().total
      ).toBe(1)
    })

    it('returns Discretion Needed when redactLevel = all and domain has Discretion Needed item ', () => {
      const target = render({ ...fakePropsWithDiscretionNeededItem }).find(PrintDomainHeader)
      expect(target.props().total).toEqual('Discretion Needed')
    })

    it('returns Discretion Needed when redactLevel = discretionNeeded and domain has discretionNeeded item ', () => {
      const target = render({ redactLevel: redactLevels.discrationNeeded, ...fakePropsWithDiscretionNeededItem }).find(
        PrintDomainHeader
      )
      expect(target.props().total).toEqual('Discretion Needed')
    })

    it('returns score when redactLevel = discretionNeeded and domain does not have discretionNeeded item ', () => {
      expect(
        render({ redactLevel: redactLevels.discrationNeeded, ...fakePropsWithNoConfidentialItem })
          .find(PrintDomainHeader)
          .props().total
      ).toBe(1)

      expect(
        render({ redactLevel: redactLevels.discrationNeeded, ...fakePropsWithConfidentialItem })
          .find(PrintDomainHeader)
          .props().total
      ).toBe(1)
    })

    it('returns score when redactLevel = doNotRedact and domain does have confidential item ', () => {
      expect(
        render({ redactLevel: redactLevels.doNotRedact, ...fakePropsWithConfidentialItem })
          .find(PrintDomainHeader)
          .props().total
      ).toBe(1)

      expect(
        render({ redactLevel: redactLevels.doNotRedact, ...fakePropsWithDiscretionNeededItem })
          .find(PrintDomainHeader)
          .props().total
      ).toBe(1)
    })
  })
})
