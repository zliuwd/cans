import React from 'react'
import ItemRating from './ItemRating'

const options = ['0', '1', '2', '3']

const ItemRegularRating = props => <ItemRating {...props} type="regular" shortType="reg" options={options} />

ItemRegularRating.defaultProps = {
  disabled: false,
}

export default ItemRegularRating
