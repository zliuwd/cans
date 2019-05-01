import PropTypes from 'prop-types'
import { isoToLocalDate, isValidDate } from '../../../util/dateHelper'

const ClientDateOfBirth = ({ dob, isEstimated }) =>
  isValidDate(dob) ? `DOB: ${isoToLocalDate(dob)}${isEstimated ? ' (approx.)' : ''}` : ''

ClientDateOfBirth.propTypes = {
  dob: PropTypes.string,
  isEstimated: PropTypes.bool,
}

ClientDateOfBirth.defaultProps = {
  dob: null,
  isEstimated: false,
}

export default ClientDateOfBirth
