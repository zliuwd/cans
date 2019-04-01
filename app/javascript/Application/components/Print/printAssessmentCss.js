const domainCss =
  'div.domain-header { width:100%; position: relative; display: flex; flex-wrap: nowrap; flex-direction: column; justify-content: center; margin: 2rem 0 0 0; min-height: 3rem; max-height:3.5rem; page-break-inside: avoid; page-break-after: avoid; }\n' +
  'div.domain-comment {margin:0.5rem 0 0.2rem 0; padding: 1rem; border: solid black 1px}\n'

const itemCss =
  'div.item-main-line { width:100%; display: flex; flex-direction: row; justify-content: flex-start; page-break-inside: avoid; min-height:2.5rem; max-height:3.5rem;}\n' +
  '.item-container {page-break-inside: avoid;}\n' +
  'div.stripe-gray {position: relative; display:flex; width:100%; }\n'

const pageHeaderCss =
  'div.header-container {margin-bottom:1rem; width:100%; align-content: flex-start; display: flex; flex-direction: column; flex-wrap: nowrap; max-height:17rem; justify-content:space-between;}\n' +
  'div.header-first {display: flex; flex-direction: row; flex-wrap: nowrap; width:100%; justify-content: space-between; align-content: flex-start;}\n' +
  'div.header-second {margin-top:0.5rem; display: flex; flex-direction: row; flex-wrap: nowrap; justify-content:space-between;}\n' +
  'div.header-third {display: flex; flex-direction: row; flex-wrap: nowrap; justify-content:space-between;}\n' +
  'div.header-first-box {min-width:15%; text-align:left; font-size:1rem; display: flex; height:5rem; flex-direction: column; flex-wrap: nowrap;}\n' +
  'div.header-sec-box {min-width:30%; text-align:left; font-size:1rem; display: flex; height:5rem; flex-direction: column; flex-wrap: nowrap;}\n' +
  'div.header-third-box {min-width:30%; text-align:left; font-size:1rem; display: flex; height:5rem; flex-direction: column; flex-wrap: nowrap; justify-content: flex-end;}\n' +
  'hr {width:100%;}\n'

const pageTitleCss =
  'div.head-line-container {margin-bottom:1.5rem; width:100%; align-content: flex-start; display: flex; align-items:center; flex-direction: row; flex-wrap: nowrap; max-height:5rem; justify-content:flex-start;}\n' +
  'div.logo-container { width:10%;}\n' +
  'div.logo {margin-right:0.5rem;}\n' +
  'div.head-title {font-size:1.7rem; width:60%; }\n' +
  'div.head-age-range {font-size:1.5rem; width:30%;}\n'

export const printAssessmentCss = pageTitleCss + pageHeaderCss + domainCss + itemCss
