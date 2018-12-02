import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CaseLoadPageTempNameCell = props => {
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

CaseLoadPageTempNameCell.propTypes = {
  column: PropTypes.object.isRequired,
  original: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
}

export default CaseLoadPageTempNameCell
