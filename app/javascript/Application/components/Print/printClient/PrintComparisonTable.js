import React from 'react'
import PropTypes from 'prop-types'
import { getI18nByCode } from '../../common/I18nHelper'
import { comparisonTable } from './PrintClientStyle'
import { isoToLocalDate } from '../../../util/dateHelper'

const PrintComparisonTable = props => {
  const { data, i18n } = props
  return (
    <table id={'print-client-comparison-table'} style={comparisonTable.table}>
      <tr key={`header-row`}>
        <th key={'header-domain-name-col'} style={comparisonTable.header}>
          Domain Name
        </th>
        {data.event_dates.map((date, index) => (
          <th key={`header-col-${index}`} style={comparisonTable.headerRating}>
            {isoToLocalDate(date.event_date)}
          </th>
        ))}
      </tr>
      {data.domains.map((domain, index) => (
        <tr key={`domain-row-${index}`}>
          <td key={'domain-name-col'} style={comparisonTable.domainNameCol}>
            {i18n ? getI18nByCode(i18n, domain.code)._title_ : domain.code}
          </td>
          {domain.domain_ratings.map((rating, ratingIndex) => (
            <td key={`rating-col-${ratingIndex}`} style={comparisonTable.ratingCol}>
              {rating.value}
            </td>
          ))}
        </tr>
      ))}
    </table>
  )
}

PrintComparisonTable.propTypes = {
  data: PropTypes.shape({
    event_dates: PropTypes.array,
    domains: PropTypes.array,
  }).isRequired,
  i18n: PropTypes.object.isRequired,
}

export default PrintComparisonTable
