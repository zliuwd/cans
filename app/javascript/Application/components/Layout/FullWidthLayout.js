import React from 'react'
import { isDesignSystemLayoutEnabled } from '../../util/features'
import ReactWoodDuckLayout from './ReactWoodDuckLayout'
import DesignSystemLayout from './DesignSystemLayout'

const FullWidthLayout = props =>
  isDesignSystemLayoutEnabled() ? <DesignSystemLayout {...props} /> : <ReactWoodDuckLayout {...props} />

export default FullWidthLayout
