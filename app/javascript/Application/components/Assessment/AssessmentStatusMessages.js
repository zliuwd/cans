import React from 'react'
import PropTypes from 'prop-types'
import { LoadingState } from '../../util/loadingHelper'
import { postCloseMessage, postInfoMessage, postSuccessMessage, successMsgFrom } from './AssessmentHelper'

const readOnlyMessageId = 'readonlyMessage'
const postReadOnlyMessage = (isEditable, isCompleted) => {
  if (isEditable) {
    return
  }
  const message = isCompleted
    ? 'This assessment was completed and is available for view only.'
    : 'This CANS is under the jurisdiction of another county. Available for view only.'

  postInfoMessage({
    messageId: readOnlyMessageId,
    message,
  })
}

class AssessmentStatusMessages extends React.Component {
  componentDidMount() {
    postReadOnlyMessage(this.props.isEditable, this.props.isCompleted)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loadingState === LoadingState.updating && this.props.loadingState === LoadingState.ready) {
      postSuccessMessage(this.props.url, successMsgFrom.SAVE)
    }

    postReadOnlyMessage(this.props.isEditable, this.props.isCompleted)
  }

  componentWillUnmount() {
    postCloseMessage(readOnlyMessageId)
  }

  render() {
    return null
  }
}

AssessmentStatusMessages.propTypes = {
  isCompleted: PropTypes.bool.isRequired,
  isEditable: PropTypes.bool.isRequired,
  loadingState: PropTypes.oneOf(Object.values(LoadingState)).isRequired,
  url: PropTypes.string.isRequired,
}

export default AssessmentStatusMessages
