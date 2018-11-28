import React from 'react'
import { Card, CardHeader, CardBody, CardTitle } from '@cwds/components'
import SubordinateInfoTable from './SubordinateInfoTable'
import { staffInfoDefaultProps, staffInfoPropTypes } from '../../StaffHelper'
import { formatClientName } from '../../../Client/Client.helper'

const SubordinateInfoCard = ({ staffInfo }) => {
  return (
    <Card className={'card supervisor-card'}>
      <CardHeader>
        <CardTitle className={'card-title-fix'}>{formatClientName(staffInfo.staff_person)}</CardTitle>
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
