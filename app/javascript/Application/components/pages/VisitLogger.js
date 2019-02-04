import React from 'react'
import PropTypes from 'prop-types'
import { logPageAction } from '../../util/analytics'

class VisitLogger extends React.Component {
  componentDidMount() {
    if (!this.props.user) {
      return
    }

    logPageAction('visitDashboard', {
      staff_id: this.props.user.staff_id,
      staff_county: this.props.user.county_name,
      dashboard: this.props.dashboard,
    })
  }

  render() {
    return null
  }
}

VisitLogger.propTypes = {
  dashboard: PropTypes.string.isRequired,
  user: PropTypes.shape({
    staff_id: PropTypes.string.isRequired,
    county_name: PropTypes.string.isRequired,
  }),
}

VisitLogger.defaultProps = {
  user: null,
}

export default VisitLogger
