import { cellTempSwitcher, renderReminderDate } from './ClientSocialWorkerCardTemplateHelper'
import ClientCardTemplateNameCell from './ClientCardTemplateNameCell'
import CaseLoadPageTemplateNameCell from './CaseLoadPageTemplateNameCell'
import { ISO_DATE_FORMAT, navigation } from '../../util/constants'
import moment from 'moment'
import { isoToLocalDate } from '../../util/dateHelper'

describe('ClientSocialWorkerCardTemplateHelper', () => {
  it('cellTempSwitcher', () => {
    expect(cellTempSwitcher(navigation.STAFF_LIST)).toEqual(CaseLoadPageTemplateNameCell)
    expect(cellTempSwitcher(navigation.CHILD_LIST)).toEqual(ClientCardTemplateNameCell)
  })

  describe('#renderReminderDate()', () => {
    it('should return null when null/undefined/empty input', () => {
      expect(renderReminderDate(null)).toBe(null)
      expect(renderReminderDate(undefined)).toBe(null)
      expect(renderReminderDate('')).toBe(null)
    })

    describe('when reminder date is more than 1 month after today', () => {
      it('should return null when reminder date is more than 1 month and 1 day after today', () => {
        const oneMonthAndOneDayAfterToday = moment()
          .add(1, 'days')
          .add(1, 'months')
          .format(ISO_DATE_FORMAT)
        expect(renderReminderDate(oneMonthAndOneDayAfterToday)).toBe(null)
      })

      it('should return null when reminder date is more than 1 year after today', () => {
        const oneYearAfterToday = moment()
          .add(1, 'years')
          .format(ISO_DATE_FORMAT)
        expect(renderReminderDate(oneYearAfterToday)).toBe(null)
      })
    })

    describe('when reminder date is less than or exactly 1 month after today', () => {
      it('should return formatted date when reminder date is exactly 1 month after today', () => {
        const exactlyOneMonthAfterToday = moment()
          .add(1, 'months')
          .format(ISO_DATE_FORMAT)
        expect(renderReminderDate(exactlyOneMonthAfterToday)).toBe(isoToLocalDate(exactlyOneMonthAfterToday))
      })

      it('should return formatted date when reminder date is a little less than 1 month after today', () => {
        const almostOneMonthAfterToday = moment()
          .add(1, 'months')
          .subtract(1, 'days')
          .format(ISO_DATE_FORMAT)
        expect(renderReminderDate(almostOneMonthAfterToday)).toBe(isoToLocalDate(almostOneMonthAfterToday))
      })

      it('should return formatted date when reminder date is today', () => {
        const today = moment().format(ISO_DATE_FORMAT)
        expect(renderReminderDate(today)).toBe(isoToLocalDate(today))
      })

      it('should return formatted date when reminder date is one year before today', () => {
        const oneYearBeforeToday = moment()
          .subtract(1, 'years')
          .format(ISO_DATE_FORMAT)
        expect(renderReminderDate(oneYearBeforeToday)).toBe(isoToLocalDate(oneYearBeforeToday))
      })
    })
  })
})
