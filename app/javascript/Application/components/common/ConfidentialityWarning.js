import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import PageModal from '../common/PageModal'

export class ConfidentialityWarning extends PureComponent {
  render() {
    const onCompleteWarning = (
      <div>
        You selected <strong className="cargiver-text-block">no</strong> for
        <strong>Authorization for Release of Information.</strong>
      </div>
    )
    const onCompleteDescription = (
      <div>
        In doing so items <strong className="cargiver-text-block">7, 48 and ec 41</strong> in this CANS assessment{' '}
        <strong className="cargiver-text-block">will be redacted </strong> when printed.
      </div>
    )
    return (
      <PageModal
        isOpen={true}
        title={'Reminder'}
        warningDescription={onCompleteWarning}
        description={onCompleteDescription}
        removeButtonLabel={'I Agree'}
        cancelButtonLabel={'Cancel'}
        onCancel={this.props.onCancel}
        onRemove={this.props.onRemove}
      />
    )
  }
}

ConfidentialityWarning.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default ConfidentialityWarning
