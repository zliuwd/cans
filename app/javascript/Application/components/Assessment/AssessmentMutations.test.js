import { updateCaregiverDomainsIndices } from './AssessmentMutations'

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
})
