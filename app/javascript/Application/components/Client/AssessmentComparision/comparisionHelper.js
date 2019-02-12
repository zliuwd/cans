import ComparisionOuterTableExpander from './ComparisionOuterTableExpander'
import { getI18nByCode } from '../../Assessment/I18nHelper'
export const commonStyle = { className: 'text-center', headerClassName: 'text-center' }

export const verticalCenter = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}

export const CP_TABLE_COL_WIDTHS = Object.freeze({
  DOMAIN_NAME: 400,
  EXPANDER: 50,
  ITEM_NAME: 400,
})

export const getTitle = (i18n, code) => {
  if (i18n) {
    return getI18nByCode(i18n, code)._title_
  }
  return null
}

export const expander = {
  id: 'expander',
  width: CP_TABLE_COL_WIDTHS.EXPANDER,
  expander: true,
  Expander: ComparisionOuterTableExpander,
  style: {
    cursor: 'pointer',
    fontSize: 25,
    padding: '0',
    textAlign: 'center',
    userSelect: 'none',
    height: '5rem',
    ...verticalCenter,
  },
  ...commonStyle,
}

export const expanderPlaceHolder = {
  id: 'expander_place_holder',
  width: CP_TABLE_COL_WIDTHS.EXPANDER,
}
