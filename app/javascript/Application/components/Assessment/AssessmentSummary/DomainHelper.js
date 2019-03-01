import PropTypes from 'prop-types'

export const DomainPropType = PropTypes.shape({
  code: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ).isRequired,
})

export const DomainsPropType = PropTypes.arrayOf(DomainPropType)

export const domainCodes = Object.freeze({
  STRENGTH_DOMAIN_UNDER_SIX: 'EST',
  STRENGTH_DOMAIN_ABOVE_SIX: 'STR',
  PTACE_DOMAIN: 'TRM',
  BEHAVIORAL_DMAIN: 'BEN',
})

const STRENGTH_DOMAINS = [domainCodes.STRENGTH_DOMAIN_UNDER_SIX, domainCodes.STRENGTH_DOMAIN_ABOVE_SIX]
const TRAUMA_DOMAIN = domainCodes.PTACE_DOMAIN
const BEN_DOMAIN = domainCodes.BEHAVIORAL_DMAIN

export const isStrengthsDomain = ({ code }) => STRENGTH_DOMAINS.includes(code)

export const isTraumaDomain = ({ code }) => code === TRAUMA_DOMAIN

export const isNeedsDomain = domain => !isStrengthsDomain(domain) && !isTraumaDomain(domain)

export const isBehavioralNeedsDomain = ({ code }) => code === BEN_DOMAIN

export const itemsValue = (domains, domainFilter, itemFilter) =>
  domains
    .filter(domainFilter)
    .reduce((allDomainItems, domain) => {
      const items = domain.items.map(item => ({ item, domain }))
      return allDomainItems.concat(items)
    }, [])
    .filter(({ item, domain }) => itemFilter(item, domain))
    .map(domainItem => domainItem.item)
