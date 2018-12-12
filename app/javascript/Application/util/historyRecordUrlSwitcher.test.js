import { historyRecordUrlSwitcher } from './historyRecordUrlSwitcher'
import { navigation } from './constants'
describe('historyRecordUrlSwitcher', () => {
  const result = []
  const expectResult = [
    '/staff/userId/clients/clientId/assessments/assessmentId',
    '/search/clients/clientId/assessments/assessmentId',
    '/clients/clientId/assessments/assessmentId',
    'search/clients/clientId/assessments/assessmentId',
  ]
  const testData = [
    [navigation.STAFF_CHILD_PROFILE, 'userId', 'clientId', 'assessmentId'],
    [navigation.SEARCH_CHILD_PROFILE, 'userId', 'clientId', 'assessmentId'],
    ['someWhere', 'userId', 'clientId', 'assessmentId'],
    [navigation.CLIENT_SEARCH, 'userId', 'clientId', 'assessmentId'],
  ]

  it('will generate correct url', () => {
    testData.forEach(data => {
      result.push(historyRecordUrlSwitcher(...data))
    })

    expect(result).toEqual(expectResult)
  })
})
