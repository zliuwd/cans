import React from 'react'
import { shallow } from 'enzyme'
import PrintAssessment from './PrintAssessment'
import {
  assessmentPrint,
  assessmentWithConfidentialItem,
  i18nPrint,
  printFixture,
} from '../Assessment/assessment.mocks.test'

describe('<PrintAssessment />', () => {
  it('should match fixture as plain html', () => {
    const printAssessment = shallow(
      <PrintAssessment
        assessment={assessmentPrint}
        i18n={i18nPrint}
        isUnderSix={() => {
          return { key: 'value' }
        }}
      />
    )
    const actualHtmlRaw = printAssessment.html()
    const actualHtml = actualHtmlRaw.replace(
      /<span style="text-align:right;font-style:italic">[^>]+<\/span>/g,
      '<span style="text-align:right;font-style:italic" />'
    )
    expect(actualHtml).toEqual(printFixture)
  })

  it('should render confidential item and redact comment and rating when confidential by default and confidential is true', () => {
    const printConfidential = shallow(
      <PrintAssessment
        assessment={assessmentWithConfidentialItem}
        i18n={i18nPrint}
        isUnderSix={() => {
          return { key: 'value' }
        }}
      />
    )
    const printConfidentialHtml = printConfidential.html()
    expect(printConfidentialHtml).toContain('Confidential')
    expect(printConfidentialHtml).toContain('<div style="width:7.6rem"></div>') // Redacted rating
    expect(printConfidentialHtml).not.toContain('This item comment is not supposed to be printed')
  })

  it('should redact domain comment when it contains at least one item with confidential by default and confidential is true', () => {
    const printConfidential = shallow(
      <PrintAssessment
        assessment={assessmentWithConfidentialItem}
        i18n={i18nPrint}
        isUnderSix={() => {
          return { key: 'value' }
        }}
      />
    )
    const printConfidentialHtml = printConfidential.html()
    expect(printConfidentialHtml).not.toContain('This domain comment is not supposed to be printed')
  })

  it('should not crash if the assessment has no county', () => {
    const assessment = { ...assessmentPrint, county: undefined }
    expect(() => {
      shallow(
        <PrintAssessment
          assessment={assessment}
          i18n={i18nPrint}
          isUnderSix={() => {
            return { key: 'value' }
          }}
        />
      )
    }).not.toThrow()
  })
})
