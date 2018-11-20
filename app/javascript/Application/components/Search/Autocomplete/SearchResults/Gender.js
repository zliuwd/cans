import React from 'react'
import PropTypes from 'prop-types'
import Genders from '../../../../enums/Genders'
import { Maybe } from '../../../../util/maybe'

const Gender = ({ gender }) => {
  return Maybe.of(Genders[gender])
    .map(genderInfo => <div key={0}>{genderInfo}</div>)
    .valueOrElse(null)
}
Gender.defaultProps = {
  gender: '',
}
Gender.propTypes = {
  gender: PropTypes.string,
}

export default Gender
