import React, { PureComponent } from 'react'
import { container, header, fourColsRow, contentBox, fourColsBox, descriptionBox } from '../PrintStyles'
import PropTypes from 'prop-types'
import { isoToLocalDate } from '../../../util/dateHelper'

class PrintClientInfo extends PureComponent {
  renderFirstLine = () => {
    const client = this.props.client
    return (
      <div style={fourColsRow}>
        <div style={fourColsBox} id={'client-info-firstName'}>
          <div style={contentBox}>{client.first_name}</div>
          <div style={descriptionBox}>First Name</div>
        </div>
        <div style={fourColsBox} id={'client-info-middleName'}>
          <div style={contentBox}>{client.middle_name}</div>
          <div style={descriptionBox}>Middle Name</div>
        </div>
        <div style={fourColsBox} id={'client-info-lastName'}>
          <div style={contentBox}>{client.last_name}</div>
          <div style={descriptionBox}>Last Name</div>
        </div>
        <div style={fourColsBox} id={'client-info-suffix'}>
          <div style={contentBox}>{client.suffix}</div>
          <div style={descriptionBox}>Suffix</div>
        </div>
      </div>
    )
  }

  renderSecondLine = () => {
    const client = this.props.client
    return (
      <div style={fourColsRow}>
        <div style={fourColsBox} id={'client-info-dob'}>
          <div style={contentBox}>{isoToLocalDate(client.dob)}</div>
          <div style={descriptionBox}>Date of Birth</div>
        </div>
        <div style={fourColsBox} id={'client-info-county'}>
          <div style={contentBox}>{client.county ? client.county.name : ''}</div>
          <div style={descriptionBox}>County</div>
        </div>
        <div style={fourColsBox} id={'client-info-id'}>
          <div style={contentBox}>{client.external_id}</div>
          <div style={descriptionBox}>Client Id</div>
        </div>
      </div>
    )
  }

  render = () => {
    return (
      <div id={'print-client-info'} style={container}>
        <h2 style={header} id={'print-client-info-header'}>
          Client Information
        </h2>
        <div>
          {this.renderFirstLine()}
          {this.renderSecondLine()}
        </div>
      </div>
    )
  }
}

PrintClientInfo.propTypes = { client: PropTypes.object.isRequired }

export default PrintClientInfo
