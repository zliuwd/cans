import React from 'react'
import { getI18nByCode } from './I18nHelper'
import Item from './Item'
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types'

const DomainItemList = props => {
  return props.items.map((item, index) => {
    const { code } = item
    const itemI18n = getI18nByCode(props.i18nAll, code)
    return (
      <div key={`${code}`}>
        <Item
          key={`${index}-${code}`}
          item={item}
          caregiverIndex={props.caregiverIndex}
          i18n={itemI18n}
          onRatingUpdate={props.onRatingUpdate}
          onCommentUpdate={props.onItemCommentUpdate}
          onConfidentialityUpdate={props.onConfidentialityUpdate}
          isAssessmentUnderSix={props.isAssessmentUnderSix}
          canReleaseConfidentialInfo={props.canReleaseConfidentialInfo}
        />
        <Divider />
      </div>
    )
  })
}

DomainItemList.propTypes = {
  canReleaseConfidentialInfo: PropTypes.bool.isRequired,
  caregiverIndex: PropTypes.string,
  i18nAll: PropTypes.object.isRequired,
  isAssessmentUnderSix: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  onConfidentialityUpdate: PropTypes.func.isRequired,
  onItemCommentUpdate: PropTypes.func.isRequired,
  onRatingUpdate: PropTypes.func.isRequired,
}

DomainItemList.defaultProps = {
  caregiverIndex: undefined,
}

export default DomainItemList
