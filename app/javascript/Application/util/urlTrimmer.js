export function urlTrimmer(url, start, deleteCount) {
  if (!url) {
    return null
  }
  if (url.includes('/')) {
    const urlArray = url.split('/')
    urlArray.splice(start, deleteCount)
    return urlArray.join('/')
  } else {
    return url
  }
}
