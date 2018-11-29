import { checkPropTypes } from 'prop-types'
import { client } from '../assessment.mocks.test'
import { clientPropTypes, changeHistoryPropType } from './ChangeLogHelper'

describe('ChangeLogHelper', () => {
  describe('clientPropTypes', () => {
    const checkClientPropType = client =>
      checkPropTypes({ client: clientPropTypes }, { client }, 'client', 'MyComponent')

    it('returns no error for valid client', () => {
      expect(checkClientPropType(client)).toBeUndefined()
    })

    it('returns an error if person_role is not a string', () => {
      const person = { person_role: 1 }
      expect(() => checkClientPropType(person)).toThrow()
    })

    it('returns an error if first_name is not a string', () => {
      const person = { first_name: 1 }
      expect(() => checkClientPropType(person)).toThrow()
    })

    it('returns an error if middle_name is not a string', () => {
      const person = { middle_name: 1, ...client }
      expect(() => checkClientPropType(person)).toThrow()
    })

    it('returns an error if last_name is not a string', () => {
      const person = { last_name: 1 }
      expect(() => checkClientPropType(person)).toThrow()
    })

    it('returns an error if suffix is not a string', () => {
      const person = { suffix: 1 }
      expect(() => checkClientPropType(person)).toThrow()
    })

    it('returns an error if dob is not a string', () => {
      const person = { dob: 1 }
      expect(() => checkClientPropType(person)).toThrow()
    })

    it('returns an error if external_id is not a string', () => {
      const person = { external_id: 1 }
      expect(() => checkClientPropType(person)).toThrow()
    })

    it('returns an error if county is not an object', () => {
      const person = { county: 1 }
      expect(() => checkClientPropType(person)).toThrow()
    })

    it('returns an error if county export_id is not an string', () => {
      const person = { county: { export_id: 1 }, ...client }
      expect(() => checkClientPropType(person)).toThrow()
    })

    it('returns an error if county external_id is not an string', () => {
      const person = { county: { external_id: 1 }, ...client }
      expect(() => checkClientPropType(person)).toThrow()
    })

    it('returns an error if county id is not an number', () => {
      const person = { county: { id: '1' }, ...client }
      expect(() => checkClientPropType(person)).toThrow()
    })

    it('returns an error if county name is not an string', () => {
      const person = { county: { name: 1 }, ...client }
      expect(() => checkClientPropType(person)).toThrow()
    })
  })

  describe('changeHistoryPropType', () => {
    const changeRecord = {
      id: 710031,
      user_id: 'RACFID',
      entity_id: 582529,
      changed_at: '2018-11-26T11:18:36.518Z',
      change_type: 'MOD',
      changes: [],
      assessment_change_type: 'SAVED',
    }

    const checkChangeHistoryPropType = change =>
      checkPropTypes({ change: changeHistoryPropType }, { change }, 'change', 'MyComponent')

    it('returns no error for valid history record', () => {
      expect(checkChangeHistoryPropType(changeRecord)).toBeUndefined()
    })

    it('returns an error if assessment_change_type is not a string', () => {
      const change = { assessment_change_type: 1 }
      expect(() => checkChangeHistoryPropType(change)).toThrow()
    })

    it('returns an error if change_type is not a string', () => {
      const change = { change_type: 1 }
      expect(() => checkChangeHistoryPropType(change)).toThrow()
    })

    it('returns an error if changed_at is not a string', () => {
      const change = { changed_at: 1 }
      expect(() => checkChangeHistoryPropType(change)).toThrow()
    })

    it('returns an error if changes is not an array', () => {
      const change = { changes: {} }
      expect(() => checkChangeHistoryPropType(change)).toThrow()
    })

    it('returns an error if entity_id is not a number', () => {
      const change = { entity_id: '1' }
      expect(() => checkChangeHistoryPropType(change)).toThrow()
    })

    it('returns an error if id is not a number', () => {
      const change = { id: '1' }
      expect(() => checkChangeHistoryPropType(change)).toThrow()
    })

    it('returns an error if user_id is not a string', () => {
      const change = { user_id: 1 }
      expect(() => checkChangeHistoryPropType(change)).toThrow()
    })
  })
})
