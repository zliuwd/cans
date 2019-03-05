import { isoToLocalDate } from '../../util/dateHelper'
import ClientCardTemplateNameCell from './ClientCardTemplateNameCell'
import CaseLoadPageTemplateNameCell from './CaseLoadPageTemplateNameCell'
import { ISO_DATE_FORMAT, navigation } from '../../util/constants'
import moment from 'moment'

export function renderDate(datetime) {
  return !datetime || datetime === null ? null : isoToLocalDate(datetime)
}

export function sortDOB(a, b) {
  const dobA = new Date(a).getTime()
  const dobB = new Date(b).getTime()
  return dobA > dobB ? 1 : -1
}

export function renderReminderDate(date) {
  if (!date) return null
  const dateToStartShowingReminderFrom = moment(date, ISO_DATE_FORMAT).subtract(1, 'months')
  return moment().isAfter(dateToStartShowingReminderFrom) ? isoToLocalDate(date) : null
}

export function cellTempSwitcher(navFrom) {
  switch (navFrom) {
    case navigation.STAFF_LIST:
      return CaseLoadPageTemplateNameCell

    default:
      return ClientCardTemplateNameCell
  }
}
