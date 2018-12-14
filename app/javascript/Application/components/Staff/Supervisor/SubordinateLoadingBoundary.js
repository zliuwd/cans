import React from 'react'
import PropTypes from 'prop-types'
import { LoadingState } from '../../../util/loadingHelper'
import SubordinateService from './Subordinate.service'

class SubordinateLoadingBoundary extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      loadingState: LoadingState.waiting,
      subordinates: [],
    }
  }
  async componentDidMount() {
    await this.setState({ loadingState: LoadingState.updating })
    const subordinates = await SubordinateService.fetch()
    await this.setState({
      loadingState: LoadingState.ready,
      subordinates,
    })
  }

  render() {
    const children = this.props.children
    const { loadingState, subordinates } = this.state
    return React.cloneElement(children, { loadingState, staff: subordinates })
  }
}

SubordinateLoadingBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SubordinateLoadingBoundary
