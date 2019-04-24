const INDICES = 'abcdefghijklmnopqrstuvwxyz'

export const updateCaregiverDomainsIndices = domains => {
  const result = domains.reduce(
    ({ newDomains, nextCaregiverIndex }, domain) => {
      let newDomain
      let newNextCaregiverIndex

      const nextCaregiverChar = INDICES.charAt(nextCaregiverIndex)

      if (domain.is_caregiver_domain === false) {
        newDomain = domain
        newNextCaregiverIndex = nextCaregiverIndex
      } else {
        newDomain = {
          ...domain,
          caregiver_index: nextCaregiverChar,
        }
        newNextCaregiverIndex = nextCaregiverIndex + 1
      }

      newDomains.push(newDomain)
      return { newDomains, nextCaregiverIndex: newNextCaregiverIndex }
    },
    { newDomains: [], nextCaregiverIndex: 0 }
  )

  return result.newDomains
}

const updateIfChanged = (obj, key, value) => {
  if (obj[key] === value) {
    return obj
  }
  return { ...obj, [key]: value }
}

export const updateItem = (assessment, itemCode, key, value, itemCaregiverIndex) => ({
  ...assessment,
  state: {
    ...assessment.state,
    domains: assessment.state.domains.map(domain => {
      if (itemCaregiverIndex !== domain.caregiver_index) {
        return domain
      }
      return {
        ...domain,
        items: domain.items.map(item => {
          if (item.code !== itemCode) {
            return item
          }
          return updateIfChanged(item, key, value)
        }),
      }
    }),
  },
})
