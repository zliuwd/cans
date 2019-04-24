const INDICES = 'abcdefghijklmnopqrstuvwxyz'

export const updateCaregiverDomainsIndices = domains => {
  const result = domains.reduce(
    ({ newDomains, numChanged, nextCaregiverIndex }, domain) => {
      let newDomain
      let newNumChanged
      let newNextCaregiverIndex

      const nextCaregiverChar = INDICES.charAt(nextCaregiverIndex)

      if (domain.is_caregiver_domain === false) {
        newDomain = domain
        newNumChanged = numChanged
        newNextCaregiverIndex = nextCaregiverIndex
      } else if (domain.caregiver_index === nextCaregiverChar) {
        newDomain = domain
        newNumChanged = numChanged
        newNextCaregiverIndex = nextCaregiverIndex + 1
      } else {
        newDomain = {
          ...domain,
          caregiver_index: nextCaregiverChar,
        }
        newNumChanged = numChanged + 1
        newNextCaregiverIndex = nextCaregiverIndex + 1
      }

      newDomains.push(newDomain)
      return { newDomains, numChanged: newNumChanged, nextCaregiverIndex: newNextCaregiverIndex }
    },
    { newDomains: [], numChanged: 0, nextCaregiverIndex: 0 }
  )

  const { newDomains, numChanged } = result
  return numChanged > 0 ? newDomains : domains
}
