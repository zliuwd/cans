import React from 'react'
import { Container, Row, Col } from '@cwds/components'
import SubordinateInfoTotalRecord from './SubordinateInfoTotalRecord'
import SubordinateInfoCountRecord from './SubordinateInfoCountRecord'
import SubordinateInfoRecord from './SubordinateInfoRecord'
import { staffInfoDefaultProps, staffInfoPropTypes } from '../../StaffHelper'
import { formatPhoneWithExtCode } from '../../../../util/formatters'

const SubordinateInfoTable = ({ staffInfo }) => {
  const { phone_number: phoneNumber, phone_ext_code: phoneExtCode, email } = staffInfo.staff_person
  const phone = formatPhoneWithExtCode(phoneNumber, phoneExtCode)
  const emailNode = email ? <a href={`mailto:${email}`}>{email}</a> : ''
  return (
    <Container>
      <Row>
        <Col xs={2}>
          <SubordinateInfoTotalRecord totalClientsCount={staffInfo.clients_count} />
        </Col>
        <Col xs={1} />
        <Col xs={3}>
          <SubordinateInfoCountRecord caption={'No Prior'} value={staffInfo.no_prior_cans_count} />
          <SubordinateInfoCountRecord caption={'In Progress'} value={staffInfo.in_progress_count} />
          <SubordinateInfoCountRecord caption={'Complete'} value={staffInfo.completed_count} />
        </Col>
        <Col xs={6}>
          <SubordinateInfoRecord caption={'County'} value={staffInfo.staff_person.county.name} />
          <SubordinateInfoRecord caption={'Phone'} value={phone} />
          <SubordinateInfoRecord caption={'Email'} value={emailNode} />
        </Col>
      </Row>
    </Container>
  )
}

SubordinateInfoTable.propTypes = staffInfoPropTypes

SubordinateInfoTable.defaultProps = staffInfoDefaultProps

export default SubordinateInfoTable
