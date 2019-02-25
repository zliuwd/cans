export const ieFixedStyle = {
  radio: {
    width: '1.25rem',
    marginRight: '1.875rem',
    marginLeft: '-0.625rem',
    '&$checked': {
      color: '#09798E',
    },
    '&$disabled': {
      color: '#000000',
      opacity: 0.26,
    },
  },
  label: { marginRight: '0' },
}

export const noneIeFixedStyle = {
  radio: {
    width: '0.4375rem',
    '&$checked': {
      disabled: { color: '000000' },
      color: '#09798E',
    },
    '&$disabled': {
      color: '#000000',
      opacity: 0.26,
    },
  },
  label: null,
}

export function ieStyleFixer(isIE) {
  const isIeChecker = navigator.userAgent.indexOf('MSIE') !== -1 || Boolean(document.documentMode) === true
  let styleSetting
  isIE = isIE || isIeChecker
  if (isIE) {
    styleSetting = ieFixedStyle
  } else {
    styleSetting = noneIeFixedStyle
  }
  return styleSetting
}
