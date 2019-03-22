import React from 'react'
import { shallow } from 'enzyme'
import PrintAssessment from './PrintAssessment'
import { clone } from '../../util/common'
import {
  assessmentPrint,
  assessmentWithConfidentialItem,
  i18nPrint,
  printFixture,
} from '../Assessment/assessment.mocks.test'

describe('<PrintAssessment />', () => {
  const substanceUseItemsIds = { underSix: ['41'], aboveSix: ['8', '48'] }
  const redactedItemHtml = '<div style="width:7.6rem"></div>'
  const discretionNeededTotalHtml =
    '<span>Domain Total Score: <strong style="font-size:1.2rem">Discretion Needed</strong></span>'
  const confidentialTotalHtml =
    '<span>Domain Total Score: <strong style="font-size:1.2rem">Confidential</strong></span>'
  it('should match fixture as plain html', () => {
    const printAssessment = shallow(
      <PrintAssessment assessment={assessmentPrint} i18n={i18nPrint} substanceUseItemsIds={substanceUseItemsIds} />
    )
    const actualHtmlRaw = printAssessment.html()
    const actualHtml = actualHtmlRaw.replace(
      /<span style="text-align:right;font-style:italic">[^>]+<\/span>/g,
      '<span style="text-align:right;font-style:italic" />'
    )
    expect(actualHtml).toEqual(printFixture)
  })

  it('should render redact rating and show Discretion Needed in domain total when domain has discretion needed items', () => {
    const assessmentWithDiscretionNeededItem = clone(assessmentWithConfidentialItem)
    assessmentWithDiscretionNeededItem.state.domains[0].items[0].confidential_by_default = false
    const printDiscretionNeeded = shallow(
      <PrintAssessment
        assessment={assessmentWithDiscretionNeededItem}
        i18n={i18nPrint}
        substanceUseItemsIds={substanceUseItemsIds}
      />
    )
    const printDiscretionNeededHtml = printDiscretionNeeded.html()
    expect(printDiscretionNeededHtml).toContain(discretionNeededTotalHtml)
    expect(printDiscretionNeededHtml).toContain(redactedItemHtml)
    expect(printDiscretionNeededHtml).not.toContain('This item comment is not supposed to be printed')
  })

  it('should show Confidential in domain total when domain has both confidential and discretion needed items', () => {
    const assessmentWithDiscretionNeededAndConfidentialItems = clone(assessmentWithConfidentialItem)
    const discretionNeededItem = clone(assessmentWithDiscretionNeededAndConfidentialItems.state.domains[0].items[0])
    discretionNeededItem.confidential_by_default = false
    assessmentWithDiscretionNeededAndConfidentialItems.state.domains[0].items.push(discretionNeededItem)
    const printAssessment = shallow(
      <PrintAssessment
        assessment={assessmentWithDiscretionNeededAndConfidentialItems}
        i18n={i18nPrint}
        substanceUseItemsIds={substanceUseItemsIds}
      />
    )
    const printAssessmentHtml = printAssessment.html()
    expect(printAssessmentHtml).toContain(confidentialTotalHtml)
  })

  it('should render confidential item and redact comment and rating when confidential by default and confidential is true', () => {
    const printConfidential = shallow(
      <PrintAssessment
        assessment={assessmentWithConfidentialItem}
        i18n={i18nPrint}
        substanceUseItemsIds={substanceUseItemsIds}
      />
    )
    const printConfidentialHtml = printConfidential.html()
    expect(printConfidentialHtml).toContain('Confidential')
    expect(printConfidentialHtml).toContain(redactedItemHtml) // Redacted rating
    expect(printConfidentialHtml).not.toContain('This item comment is not supposed to be printed')
  })

  it('should redact domain comment when it contains at least one item with confidential by default and confidential is true', () => {
    const printConfidential = shallow(
      <PrintAssessment
        assessment={assessmentWithConfidentialItem}
        i18n={i18nPrint}
        substanceUseItemsIds={substanceUseItemsIds}
      />
    )
    const printConfidentialHtml = printConfidential.html()
    expect(printConfidentialHtml).not.toContain('This domain comment is not supposed to be printed')
  })

  it('should not crash if the assessment has no county', () => {
    const assessment = { ...assessmentPrint, county: undefined }
    expect(() => {
      shallow(<PrintAssessment assessment={assessment} i18n={i18nPrint} substanceUseItemsIds={substanceUseItemsIds} />)
    }).not.toThrow()
  })

  it("renders 'Confidential' for domain total score if atleast one item with confidential by default or confidential is true", () => {
    const printConfidential = shallow(
      <PrintAssessment
        assessment={assessmentWithConfidentialItem}
        i18n={i18nPrint}
        substanceUseItemsIds={substanceUseItemsIds}
      />
    )
    const printConfidentialHtml = printConfidential.html()
    expect(printConfidentialHtml).toContain('Confidential')
  })
})
