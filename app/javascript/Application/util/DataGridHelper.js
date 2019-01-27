const PAGE_SIZE_MAP = {
  SMALL: 10,
  MEDIUM: 25,
  LARGE: 50,
}

export const PAGE_SIZES = Object.values(PAGE_SIZE_MAP).sort()

export const gridMinRows = data => {
  let minRows
  const emptyGridMinRows = 3
  if (!data) {
    return emptyGridMinRows
  }
  const len = data.length
  if (len > 0 && len < emptyGridMinRows) {
    minRows = len
  } else if (len === 0) {
    minRows = emptyGridMinRows
  } else {
    minRows = 1
  }
  return minRows
}
