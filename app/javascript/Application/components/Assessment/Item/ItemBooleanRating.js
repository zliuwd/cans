import React from 'react'
import ItemRating from './ItemRating'

const options = ['No', 'Yes']

const ItemBooleanRating = props => <ItemRating {...props} type="bool" shortType="bool" options={options} />

export default ItemBooleanRating
