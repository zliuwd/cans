import React from 'react'
import { Card, CardHeader, CardTitle, CardBody } from '@cwds/components'
import ContentLoadingPlaceholder from './ContentLoadingPlaceholder'

export const loadingCard = (
  <Card className="card-cans-client-list">
    <CardHeader>
      <ContentLoadingPlaceholder />
    </CardHeader>
    <CardBody>
      <ContentLoadingPlaceholder isGrid={true} rows={3} columns={2} />
    </CardBody>
  </Card>
)

export const loadingCardWithTitle = title => (
  <Card className="card-cans-client-list">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardBody>
      <ContentLoadingPlaceholder isGrid={true} rows={3} columns={2} />
    </CardBody>
  </Card>
)
