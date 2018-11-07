import React from 'react'
import { Card, CardHeader, CardBody } from '@cwds/components/lib/Cards'
import CardTitle from '@cwds/components/lib/Cards/CardTitle'
import SubordinateInfoTable from './SubordinateInfoTable'
import { staffInfoDefaultProps, staffInfoPropTypes } from '../../StaffHelper'
import { formatClientName } from '../../../Client/Client.helper'

const SubordinateInfoCard = ({ staffInfo }) => {
  return (
    <Card className={'card supervisor-card'}>
      <CardHeader>
        <CardTitle tag="h4">{formatClientName(staffInfo.staff_person)}</CardTitle>
      </CardHeader>
      <CardBody>
        <SubordinateInfoTable staffInfo={staffInfo} />
      </CardBody>
    </Card>
  )
}

SubordinateInfoCard.propTypes = staffInfoPropTypes

SubordinateInfoCard.defaultProps = staffInfoDefaultProps

export default SubordinateInfoCard
