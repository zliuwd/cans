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

const updateIfChanged = (obj, key, value) => {
  if (obj[key] === value) {
    return obj
  }
  return { ...obj, [key]: value }
}

const mapIfChanged = (array, updater) => {
  const result = array.reduce(
    ({ newArray, isChanged }, item) => {
      const newItem = updater(item)
      newArray.push(newItem)
      return { newArray, isChanged: isChanged || newItem !== item }
    },
    { newArray: [], isChanged: false }
  )

  const { newArray, isChanged } = result
  return isChanged ? newArray : array
}

const setDomains = (assessment, newDomains) => {
  return newDomains !== assessment.state.domains
    ? { ...assessment, state: { ...assessment.state, domains: newDomains } }
    : assessment
}

const setItems = (domain, newItems) => {
  return newItems !== domain.items ? { ...domain, items: newItems } : domain
}

export const updateItem = (assessment, itemCode, key, value, itemCaregiverIndex) => {
  return setDomains(
    assessment,
    mapIfChanged(assessment.state.domains, domain => {
      if (itemCaregiverIndex !== domain.caregiver_index) {
        return domain
      }

      return setItems(
        domain,
        mapIfChanged(domain.items, item => (item.code === itemCode ? updateIfChanged(item, key, value) : item))
      )
    })
  )
}
