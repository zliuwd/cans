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

const STRENGTH_DOMAINS = ['STR', 'EST']
const TRAUMA_DOMAIN = 'TRM'

export const isStrengthsDomain = ({ code }) => STRENGTH_DOMAINS.includes(code)

export const isTraumaDomain = ({ code }) => code === TRAUMA_DOMAIN

export const isNeedsDomain = domain => !isStrengthsDomain(domain) && !isTraumaDomain(domain)
