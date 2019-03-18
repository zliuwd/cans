import ComparisonOuterTableExpander from './ComparisonOuterTableExpander'
import { getI18nByCode } from '../../../common/I18nHelper'

export const CP_TABLE_COL_WIDTHS = Object.freeze({
  DOMAIN_NAME: 350,
  EXPANDER: 50,
  ITEM_NAME: 350,
})

export const getTitle = (i18n, code) => {
  return i18n ? getI18nByCode(i18n, code)._title_ : null
}

export const expander = {
  id: 'expander',
  width: CP_TABLE_COL_WIDTHS.EXPANDER,
  expander: true,
  Expander: ComparisonOuterTableExpander,
  className: 'outer-expander',
  headerClassName: 'text-center',
}

export const expanderPlaceHolder = {
  id: 'expander-place-holder',
  width: CP_TABLE_COL_WIDTHS.EXPANDER,
}

export const requiredDomainColumnsAmount = 5

export const blankColFiller = (targetCols, keyWords, amount) => {
  const blankColumn = { id: `${keyWords}-blank-column`, header: null, sortable: false }
  const checker = amount - targetCols.length
  if (checker > 0) [...Array(checker)].map(() => targetCols.push(blankColumn))
}

const dashes = '--'

export const domainRatingSwitcher = (ratingTotal, type) => {
  return ratingTotal === undefined ? dashes : ratingTotal
}

export const itemRatingSwitcher = (itemRatings, index, type) => {
  const itemRating = itemRatings[index]
  return itemRating && itemRating.value !== undefined ? itemRating.value : dashes
}
