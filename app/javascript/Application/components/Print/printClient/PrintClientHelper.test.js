import { composeUpdatedByName } from './PrintClientHelper'

describe('PrintClientHelper', () => {
  describe('#composeUpdatedByName', () => {
    it('returns updated_by composed name', () => {
      expect(
        composeUpdatedByName({
          created_by: { first_name: 'First', last_name: 'Last' },
          updated_by: { first_name: 'uFirst', last_name: 'uLast' },
        })
      ).toEqual('uFirst uLast')
    })

    describe('when no updated_by', () => {
      it('returns created_by composed name', () => {
        expect(composeUpdatedByName({ created_by: { first_name: 'First', last_name: 'Last' } })).toEqual('First Last')
      })
    })

    describe('when no updated_by neither created_by', () => {
      it('returns empty string', () => {
        expect(composeUpdatedByName({})).toEqual('')
      })
    })
  })
})
