import React from 'react'
import PropTypes from 'prop-types'
import { headerBlock, headerRow, textAlignLeft } from './PrintAssessmentStyle'

const PrintSummary = props => {
  return (
    <div style={headerBlock}>
      <h1 style={textAlignLeft}>CANS Summary</h1>
      <div style={headerRow}>
        {props.renderSummaryRecord('Strengths', props.summaryCodes.Strengths)}
        {props.renderSummaryRecord('Action Required', props.summaryCodes['Action Required'])}
        {props.renderSummaryRecord('Immediate Action Required', props.summaryCodes['Immediate Action Required'])}
        {props.renderSummaryRecord('Trauma', props.summaryCodes.Trauma)}
      </div>
    </div>
  )
}

PrintSummary.propTypes = {
  renderSummaryRecord: PropTypes.func.isRequired,
  summaryCodes: PropTypes.object.isRequired,
}

export default PrintSummary
