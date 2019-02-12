import React from 'react'
import ChildProfilePage from './ChildProfilePage'
import { navigation } from '../../util/constants'

const SearchChildProfilePage = props => <ChildProfilePage {...props} navigateTo={navigation.SEARCH_CHILD_PROFILE} />

export default SearchChildProfilePage
