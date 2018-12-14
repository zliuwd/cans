import PropTypes from 'prop-types'

export const LoadingState = Object.freeze({
  idle: 'IDLE',
  error: 'ERROR',
  ready: 'READY',
  updating: 'UPDATING',
  waiting: 'WAITING',
})

export const loadingStatePropType = PropTypes.oneOf(Object.values(LoadingState))

export function isReadyForAction(status) {
  return LoadingState.idle === status || LoadingState.ready === status
}

export const isInProgress = status => LoadingState.updating === status || LoadingState.waiting === status
