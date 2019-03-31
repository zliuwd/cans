import React from 'react'
import { renderToString } from 'react-dom/server'
export const printContainerPreCss =
  '@page {size: auto; margin: 5mm; padding:0; }\n' +
  'html {background-color: #FFFFFF; margin:0;  }\n' +
  'body {margin:0; font-family:sans-serif; color-adjust: exact; -webkit-print-color-adjust: exact;}\n'

export const printLayoutCss =
  'div.content {text-align: left;}\n' +
  'table.print-container {width:100%; }\n' +
  'tfoot.print-footer {test-align:left; margin: 0; padding: 0; color: #999999 !important; height:15mm; }\n' +
  'thead.print-header {test-align:left; margin-bottom: 5mm; padding: 0; color: #999999 !important; background-color:white; height:15mm; }\n' +
  'th.header-content {text-align: left; height:30mm; }\n' +
  'div.cat-header {text-align: left;font-size:1.7rem; background-color:#e8e8e8 !important; padding:0.5rem; box-shadow: inset 0 0 0 1000px #e8e8e8; }\n' +
  'div.cat-header-container {page-break-inside: avoid; page-break-after: avoid;}\n' +
  'div.bottom-cover {-webkit-print-color-adjust: exact; background-color:white; height:8mm; width:120mm; position:fixed; bottom:0; margin-top:0; }\n' +
  'div.top-cover {background-color:white; height:5mm; width:80%; position:fixed; top:0; margin-bottom:3px; }\n'

const restCss =
  'p.h-p {margin: 0; padding: 0; color: #999999 }\n' +
  'div.domain-header { display: flex; flex-direction: column; justify-content: center; padding: 0 1rem 0 1rem; margin: 1rem 0 0 0; min-height: 1.5rem; max-height:2rem; background-color: #f5f5f5; page-break-after: avoid; box-shadow: inset 0 0 0 1000px #f5f5f5; }\n' +
  'div.domain-comment {margin:0.5rem 0 0.2rem 0; padding: 1rem; border: solid black 1px}\n' +
  'div.item-main-line {padding:1mm 0 1mm 0; width:100%; display: flex; flex-direction: row; justify-content: flex-start; page-break-inside: avoid; min-height:1.5rem; max-height:2rem;}\n' +
  'div.stripe-gray {background-color: #f5f5f5 !important; box-shadow: inset 0 0 0 1000px #f5f5f5;}\n' +
  'div.header-container {margin-bottom:1rem; width:100%; align-content: flex-start; display: flex; flex-direction: column; flex-wrap: nowrap; max-height:17rem; justify-content:space-between;}\n' +
  'div.header-first {display: flex; flex-direction: row; flex-wrap: nowrap; width:100%; justify-content: space-between; align-content: flex-start;}\n' +
  'div.header-second {margin-top:0.5rem; display: flex; flex-direction: row; flex-wrap: nowrap; justify-content:space-between;}\n' +
  'div.header-third {display: flex; flex-direction: row; flex-wrap: nowrap; justify-content:space-between;}\n' +
  'div.header-first-box {min-width:15%; text-align:left; font-size:1rem; display: flex; height:5rem; flex-direction: column; flex-wrap: nowrap;}\n' +
  'div.header-sec-box {min-width:30%; text-align:left; font-size:1rem; display: flex; height:5rem; flex-direction: column; flex-wrap: nowrap;}\n' +
  'div.header-third-box {min-width:30%; text-align:left; font-size:1rem; display: flex; height:5rem; flex-direction: column; flex-wrap: nowrap; justify-content: flex-end;}\n' +
  'hr {width:100%;}\n' +
  'div.head-line-container {margin-bottom:1.5rem; width:100%; align-content: flex-start; display: flex; align-items:center; flex-direction: row; flex-wrap: nowrap; max-height:5rem; justify-content:flex-start;}\n' +
  'div.logo-container { width:10%;}\n' +
  'div.logo {margin-right:0.5rem;}\n' +
  'div.head-title {font-size:1.7rem; width:60%; }\n' +
  'div.head-age-range {font-size:1.5rem; width:30%;}\n'

export const printViewPreparation = node => {
  const cssCode = printContainerPreCss + printLayoutCss + restCss
  const printView = (
    <html moznomarginboxes mozdisallowselectionprint lang="en">
      <head>
        <style type="text/css">{cssCode}</style>
      </head>
      {node}
    </html>
  )
  return renderToString(printView)
}
