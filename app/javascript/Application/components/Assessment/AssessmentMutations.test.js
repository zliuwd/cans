import { updateCaregiverDomainsIndices, updateItem } from './AssessmentMutations'

describe('AssessmentMutations', () => {
  describe('updateCaregiverDomainsIndices', () => {
    const caregiverA = {
      is_caregiver_domain: true,
      caregiver_index: 'a',
      id: 1,
    }
    const caregiverB = {
      is_caregiver_domain: true,
      caregiver_index: 'b',
      id: 2,
    }

    const caregiverC = {
      is_caregiver_domain: true,
      caregiver_index: 'c',
      id: 3,
    }

    const nonCaregiver = {
      is_caregiver_domain: false,
      id: 4,
    }

    it('updates the index of each caregiver domain to be in order', () => {
      const domains = [caregiverB, caregiverC, caregiverA]
      expect(domains.map(d => d.caregiver_index)).toEqual(['b', 'c', 'a'])
      const newDomains = updateCaregiverDomainsIndices(domains)
      expect(newDomains.map(d => d.caregiver_index)).toEqual(['a', 'b', 'c'])
    })

    it('leaves the domains in the same id order', () => {
      const domains = [caregiverB, caregiverC, caregiverA]
      expect(domains.map(d => d.id)).toEqual([2, 3, 1])
      const newDomains = updateCaregiverDomainsIndices(domains)
      expect(newDomains.map(d => d.id)).toEqual([2, 3, 1])
    })

    it('returns a new list of domains', () => {
      const domains = [caregiverB, caregiverA, nonCaregiver]
      const newDomains = updateCaregiverDomainsIndices(domains)
      expect(newDomains).not.toBe(domains)
    })

    it('leaves untouched any non-caregiver domains', () => {
      const domains = [caregiverB, caregiverA, nonCaregiver]
      const newDomains = updateCaregiverDomainsIndices(domains)
      expect(newDomains[2]).toBe(nonCaregiver)
    })

    it('leaves untouched any caregiver domains that were in the right order', () => {
      const domains = [caregiverC, caregiverB, caregiverA, nonCaregiver]
      const newDomains = updateCaregiverDomainsIndices(domains)
      expect(newDomains[1]).toBe(caregiverB)
    })

    it('leaves the entire array untouched if nothing changes', () => {
      const domains = [caregiverA, caregiverB, caregiverC, nonCaregiver]
      const newDomains = updateCaregiverDomainsIndices(domains)
      expect(newDomains).toBe(domains)
    })

    it('does not update domains in place', () => {
      const aJSON = JSON.stringify(caregiverA)
      const domains = [caregiverB, caregiverA, nonCaregiver]
      const newDomains = updateCaregiverDomainsIndices(domains)

      expect(newDomains[1]).not.toBe(caregiverA)
      expect(JSON.stringify(caregiverA)).toBe(aJSON)
    })
  })

  describe('updateItem', () => {
    let initial
    let initialDomains
    let initialJSON
    const key = 'myKey'
    const value = 'myValue'
    let updated

    describe('when the property is changed', () => {
      beforeEach(() => {
        initialDomains = [{ id: 1, items: [{ code: 'A' }, { code: 'B' }] }, { id: 2, items: [{ code: 'C' }] }]
        initial = { other: { foo: 'bar' }, state: { domains: initialDomains } }
        initialJSON = JSON.stringify(initial)
        updated = updateItem(initial, 'B', key, value)
      })

      it('changes the property', () => {
        expect(updated.state.domains[0].items[1][key]).toBe(value)
      })

      it('preserves references to untouched items', () => {
        expect(updated.state.domains[0].items[0]).toBe(initial.state.domains[0].items[0])
        expect(updated.state.domains[1].items[0]).toBe(initial.state.domains[1].items[0])
      })

      it('preserves references to untouched domains', () => {
        expect(updated.state.domains[1]).toBe(initial.state.domains[1])
      })

      it('preserves references to untouched assessment properties', () => {
        expect(updated.other).toBe(initial.other)
      })

      it('returns a new object without mutating original', () => {
        expect(JSON.stringify(initial)).toBe(initialJSON)
        expect(updated).not.toBe(initial)
      })
    })

    it('returns the same assessment when the property is already set', () => {
      const initialDomains = [
        { id: 1, items: [{ code: 'A' }, { code: 'B', myKey: 'myValue' }] },
        { id: 2, items: [{ code: 'C' }] },
      ]
      const initial = { other: { foo: 'bar' }, state: { domains: initialDomains } }

      const updated = updateItem(initial, 'B', 'myKey', 'myValue')

      expect(updated).toBe(initial)
    })

    describe('when updating a caregiver item', () => {
      beforeEach(() => {
        initialDomains = [
          {
            is_caregiver_domain: true,
            caregiver_index: 'a',
            id: 1,
            items: [{ code: 'A' }, { code: 'B' }],
          },
          {
            is_caregiver_domain: true,
            caregiver_index: 'b',
            id: 2,
            items: [{ code: 'A' }, { code: 'B' }],
          },
          {
            is_caregiver_domain: true,
            caregiver_index: 'c',
            id: 3,
            items: [{ code: 'A' }, { code: 'B' }],
          },
        ]
        initial = { other: { foo: 'bar' }, state: { domains: initialDomains } }
        initialJSON = JSON.stringify(initial)
        updated = updateItem(initial, 'B', key, value, 'b')
      })

      it('changes the property on the targeted caregiver domain', () => {
        expect(updated.state.domains[1].items[1][key]).toBe(value)

        expect(updated.state.domains[0].items[1][key]).not.toBe(value)
        expect(updated.state.domains[2].items[1][key]).not.toBe(value)
      })

      it('preserves references to untouched items', () => {
        expect(updated.state.domains[0].items[0]).toBe(initial.state.domains[0].items[0])
        expect(updated.state.domains[1].items[0]).toBe(initial.state.domains[1].items[0])
      })

      it('preserves references to untouched domains', () => {
        expect(updated.state.domains[0]).toBe(initial.state.domains[0])
        expect(updated.state.domains[2]).toBe(initial.state.domains[2])
      })

      it('preserves references to untouched assessment properties', () => {
        expect(updated.other).toBe(initial.other)
      })

      it('returns a new object without mutating original', () => {
        expect(JSON.stringify(initial)).toBe(initialJSON)
        expect(updated).not.toBe(initial)
      })
    })
  })
})
