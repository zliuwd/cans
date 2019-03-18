import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import PageModal from '../common/PageModal'

export class ConfidentialityWarning extends PureComponent {
  render() {
    const onCompleteWarning = (
      <div>
        You selected <strong className="cargiver-text-block">&apos;no&apos;</strong> for
        <strong> Authorization for Release of Information.</strong>
      </div>
    )
    const onCompleteDescription = (
      <div style={{ lineHeight: '3rem' }}>
        In doing so items <strong>{this.props.substanceUseItemsIds.aboveSix[0]}, 48 and EC 41</strong> in this CANS
        assessment <strong className="cargiver-text-block">will be redacted </strong> when printed.
      </div>
    )
    return (
      <PageModal
        isOpen={true}
        title={'Reminder'}
        warningDescription={onCompleteWarning}
        description={onCompleteDescription}
        nextStepButtonLabel={'I Agree'}
        cancelButtonLabel={'Cancel'}
        onCancel={this.props.onCancel}
        onNextStep={this.props.onNextStep}
      />
    )
  }
}

ConfidentialityWarning.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onNextStep: PropTypes.func.isRequired,
  substanceUseItemsIds: PropTypes.shape({
    underSix: PropTypes.array.isRequired,
    aboveSix: PropTypes.array.isRequired,
  }).isRequired,
}

export default ConfidentialityWarning
