import { ageRange, analyzeData, determineDataKey } from './AssessmentComparisonHelper'
import { fakeData, fakeDataAboveSixOnly, fakeDataUnderSixOnly } from './AssessmentComparisonData.mock'
import { clone } from '../../../util/common'

describe('AssessmentComparisonHelper', () => {
  describe('#determineDataKey', () => {
    describe('when data contains underSix only', () => {
      it('returns underSix', () => {
        expect(determineDataKey(fakeDataUnderSixOnly)).toEqual(ageRange.UNDERSIX)
      })
    })

    describe('when data contains aboveSix only', () => {
      it('returns aboveSix', () => {
        expect(determineDataKey(fakeDataAboveSixOnly)).toEqual(ageRange.ABOVESIX)
      })
    })

    describe('when data contains aboveSix and underSix', () => {
      describe('and underSix.event_date is after aboveSix.event_date', () => {
        it('returns underSix', () => {
          const data = clone(fakeData)
          data.underSix.event_dates[0].event_date = '2050-12-31'
          data.underSix.event_dates[1].event_date = '2050-12-31'
          data.underSix.event_dates[0].assessment_id = 10001
          data.underSix.event_dates[1].assessment_id = 10000
          expect(determineDataKey(data)).toEqual(ageRange.UNDERSIX)
        })
      })

      describe('and underSix.event_date is before aboveSix.event_date', () => {
        const data = clone(fakeData)
        data.aboveSix.event_dates[0].event_date = '2050-12-31'
        it('returns aboveSix', () => {
          expect(determineDataKey(data)).toEqual(ageRange.ABOVESIX)
        })
      })

      describe('and underSix.event_date and aboveSix.event_date the same', () => {
        describe('and underSix.assessment_id bigger then aboveSix.assessment_id', () => {
          it('returns underSix', () => {
            const data = clone(fakeData)
            data.underSix.event_dates[0].event_date = '2050-12-31'
            data.underSix.event_dates[0].assessment_id = 10001
            data.aboveSix.event_dates[0].event_date = '2050-12-31'
            data.aboveSix.event_dates[0].assessment_id = 10000
            expect(determineDataKey(data)).toEqual(ageRange.UNDERSIX)
          })
        })

        describe('and underSix.assessment_id less then aboveSix.assessment_id', () => {
          it('returns aboveSix', () => {
            const data = clone(fakeData)
            data.underSix.event_dates[0].event_date = '2050-12-31'
            data.underSix.event_dates[0].assessment_id = 10000
            data.aboveSix.event_dates[0].event_date = '2050-12-31'
            data.aboveSix.event_dates[0].assessment_id = 10001
            expect(determineDataKey(data)).toEqual(ageRange.ABOVESIX)
          })
        })
      })
    })

    describe('when data does not have underSix neither aboveSix', () => {
      it('returns undefined', () => {
        expect(determineDataKey({})).toBe(undefined)
        expect(determineDataKey({ underSix: {} })).toBe(undefined)
        expect(determineDataKey({ aboveSix: { event_dates: [], domains: [] } })).toBe(undefined)
        expect(determineDataKey(undefined)).toBe(undefined)
        expect(determineDataKey(null)).toBe(undefined)
      })
    })
  })

  describe('#analyzeData', () => {
    describe('when data contains aboveSix only', () => {
      it('returns key=aboveSix and showSwitch=false', () => {
        const result = analyzeData(fakeDataAboveSixOnly)
        expect(result.currentDataKey).toEqual(ageRange.ABOVESIX)
        expect(result.showSwitch).toBeFalsy()
      })
    })

    describe('when data contains underSix only', () => {
      it('returns key=underSix and showSwitch=false', () => {
        const result = analyzeData(fakeDataUnderSixOnly)
        expect(result.currentDataKey).toEqual(ageRange.UNDERSIX)
        expect(result.showSwitch).toBeFalsy()
      })
    })

    describe('when data contains both underSix and aboveSix', () => {
      it('returns key and showSwitch=true', () => {
        const result = analyzeData(fakeData)
        expect(result.currentDataKey).not.toBeUndefined()
        expect(result.showSwitch).toBeTruthy()
      })
    })
  })
})
