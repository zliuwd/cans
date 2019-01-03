import React from 'react'
import PropTypes from 'prop-types'
import { LoadingState } from '../../../../util/loadingHelper'

class Aggregator extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      items: [],
    }
  }

  // The only job that this component has is to listen and record transitions between props
  static getDerivedStateFromProps = (props, state) => {
    if (props.loadingState !== LoadingState.ready) {
      return null
    }

    if (props.query !== state.query) {
      return {
        items: props.data.items,
        query: props.query,
      }
    }

    if (props.data && props.data.items.some(newItem => !state.items.includes(newItem))) {
      return { items: state.items.concat(props.data.items) }
    }

    return null
  }

  render() {
    const childProps = this.props.data
      ? {
          ...this.props.data,
          items: this.state.items,
        }
      : undefined

    return React.cloneElement(this.props.children, {
      [this.props.childNodeFetchedPropName]: childProps,
    })
  }
}

Aggregator.propTypes = {
  childNodeFetchedPropName: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  data: PropTypes.shape({
    items: PropTypes.array.isRequired,
  }),
  loadingState: PropTypes.oneOf(Object.values(LoadingState)),
  query: PropTypes.any.isRequired,
}

Aggregator.defaultProps = {
  data: { items: [], totalResults: 0 },
  loadingState: LoadingState.waiting,
}

export default Aggregator
