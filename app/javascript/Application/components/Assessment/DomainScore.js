import React from 'react'
import PropTypes from 'prop-types'
import { Badge } from '@cwds/components'
import Typography from '@material-ui/core/Typography'
import './style.sass'
const DomainScore = props => {
  return (
    <div className={'domain-score'}>
      <Typography style={{ fontSize: '0.75rem', alignSelf: 'center', whiteSpace: 'nowrap' }}>Domain Total:</Typography>
      <Badge color={'info'} className={'domain-score-badge'}>
        {props.totalScore}
      </Badge>
    </div>
  )
}

DomainScore.propTypes = {
  totalScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default DomainScore
