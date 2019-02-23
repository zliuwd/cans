import React from 'react'
import { Card, CardHeader, CardBody, CardTitle } from '@cwds/components'
import SubordinateInfoTable from './SubordinateInfoTable'
import { staffInfoPropTypes } from '../../StaffHelper'
import { formatClientName } from '../../../Client/Client.helper'

const SubordinateInfoCard = ({ staffInfo }) =>
  staffInfo && (
    <Card>
      <CardHeader>
        <CardTitle>{formatClientName(staffInfo.staff_person)}</CardTitle>
      </CardHeader>
      <CardBody>
        <SubordinateInfoTable staffInfo={staffInfo} />
      </CardBody>
    </Card>
  )

SubordinateInfoCard.propTypes = {
  staffInfo: staffInfoPropTypes,
}

SubordinateInfoCard.defaultProps = {
  staffInfo: null,
}

export default SubordinateInfoCard
