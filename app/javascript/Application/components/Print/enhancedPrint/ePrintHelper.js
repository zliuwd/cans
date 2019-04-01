import React from 'react'
import { renderToString } from 'react-dom/server'
const printContainerPreCss =
  '@page {size: auto; margin: 5mm 5mm 6mm 5mm; padding:0; }\n' +
  'html {background-color: #FFFFFF; margin:0;  }\n' +
  'body {margin:0; font-family:sans-serif; color-adjust: exact; -webkit-print-color-adjust: exact;}\n'

const printLayoutCss =
  'div.content {text-align: left;}\n' +
  'table.print-container {width:100%; }\n' +
  'tfoot.print-footer {test-align:left; margin: 0; padding: 0; color: #999999 !important; height:15mm; }\n' +
  'thead.print-header {test-align:left; margin-bottom: 5mm; padding: 0; color: #999999 !important; background-color:white; height:15mm; }\n' +
  'th.header-content {text-align: left; height:30mm; }\n' +
  '.header-with-svg-bg{  position: absolute;top: 10px; display:flex; }\n' +
  'div.cat-header {text-align: left;font-size:1.7rem; background-color:#e8e8e8 !important; padding:0.5rem; box-shadow: inset 0 0 0 1000px #e8e8e8; }\n' +
  'div.cat-header-container {page-break-inside: avoid; page-break-after: avoid;}\n' +
  'div.bottom-cover {-webkit-print-color-adjust: exact; background-color:white; height:8mm; width:120mm; position:fixed; bottom:0; margin-top:0; }\n' +
  'div.top-cover {background-color:white; height:5mm; width:80%; position:fixed; top:0; margin-bottom:3px; }\n'

export const printViewPreparation = (node, nodeCss) => {
  const cssCode = printContainerPreCss + printLayoutCss + nodeCss
  const printView = (
    <html lang="en">
      <head>
        <style type="text/css">{cssCode}</style>
      </head>
      {node}
    </html>
  )
  return renderToString(printView)
}
