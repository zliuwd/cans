import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody } from '@cwds/components'
import ContentLoadingDiv from './ContentLoadingDiv'
import ContentLoadingGrid from './ContentLoadingGrid'

const LoadableCard = ({
  className,
  isHeaderLoadable,
  isLoading,
  renderCardBody,
  renderCardHeader,
  loadingGridRows,
  loadingGridColumns,
}) => {
  return (
    <Card className={className}>
      {isHeaderLoadable && isLoading ? (
        <CardHeader>
          <ContentLoadingDiv />
        </CardHeader>
      ) : (
        renderCardHeader()
      )}
      {isLoading ? (
        <CardBody>
          <ContentLoadingGrid isGrid={true} rows={loadingGridRows} columns={loadingGridColumns} />
        </CardBody>
      ) : (
        renderCardBody()
      )}
    </Card>
  )
}

LoadableCard.propTypes = {
  className: PropTypes.string,
  isHeaderLoadable: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadingGridColumns: PropTypes.number,
  loadingGridRows: PropTypes.number,
  renderCardBody: PropTypes.func.isRequired,
  renderCardHeader: PropTypes.func.isRequired,
}

LoadableCard.defaultProps = {
  className: '',
  isHeaderLoadable: false,
  isLoading: false,
  loadingGridRows: 3,
  loadingGridColumns: 2,
}

export default LoadableCard
