import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CaseLoadPageTemplateNameCell = props => {
  return (
    <Link
      id="clientName"
      key={props.original.identifier}
      to={`/staff/${props.column.rol}/clients/${props.original.identifier}`}
    >
      {props.value}
    </Link>
  )
}

CaseLoadPageTemplateNameCell.propTypes = {
  column: PropTypes.shape({
    rol: PropTypes.string,
  }).isRequired,
  original: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
}

export default CaseLoadPageTemplateNameCell
