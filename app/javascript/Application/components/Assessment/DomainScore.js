import React from 'react'
import PropTypes from 'prop-types'
import { Badge } from '@cwds/components'
import Typography from '@material-ui/core/Typography'
import './style.sass'
const DomainScore = props => {
  return (
    <div className={'domain-score'}>
      <Typography
        style={{
          fontSize: '0.9375rem',
          alignSelf: 'center',
          whiteSpace: 'nowrap',
          width: '5.5rem',
          height: '1.125rem',
          color: '#6F6F6F',
          fontFamily: 'SourceSansPro - Regular',
          fontWeight: 'normal',
          lineHeight: '1.125rem',
          marginRight: '0.2rem',
        }}
      >
        Domain Total:
      </Typography>
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
