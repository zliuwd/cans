import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody, CardTitle } from '@cwds/components'
import { Redirect } from 'react-router-dom'
import { ClientFetcher, ClientSearch } from './ClientSearch'

class PersonSearchForm extends PureComponent {
  constructor() {
    super()
    this.state = {
      selectedClientId: null,
    }
  }

  onSelect = client => this.setState({ selectedClientId: client.legacy_id })

  render() {
    const { searchTitle, searchPrompt } = this.props

    if (this.state.selectedClientId) {
      return <Redirect push to={`search/clients/${this.state.selectedClientId}`} />
    }

    return (
      <Card className="card hidden-print client-search-card">
        <CardHeader className="card-header-search">
          <CardTitle>{searchTitle}</CardTitle>
        </CardHeader>
        <CardBody className="card-body-search">
          <ClientFetcher>
            <ClientSearch labelText={searchPrompt} onSelect={this.onSelect} />
          </ClientFetcher>
        </CardBody>
      </Card>
    )
  }
}

PersonSearchForm.propTypes = {
  searchPrompt: PropTypes.string.isRequired,
  searchTitle: PropTypes.string.isRequired,
}

export default PersonSearchForm
