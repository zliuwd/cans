import { urlTrimmer } from './urlTrimmer'

describe('Assessment URL trimer serial function', () => {
  const start = -2
  const deleteCount = 2
  const testUrls = ['endpoint1/clients/clientId/assessments/123456', '']
  it('urlTrimmer', () => {
    const actualValues = testUrls.map(url => {
      return urlTrimmer(url, start, deleteCount)
    })
    const idealValue = ['endpoint1/clients/clientId', null]
    expect(actualValues).toEqual(idealValue)
  })
})
