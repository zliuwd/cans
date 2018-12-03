import { ClientStatus } from '../../util/constants'

export function formatClientName({ first_name: firstName, middle_name: middleName, last_name: lastName, suffix }) {
  let result = `${lastName}, ${firstName}`
  if (middleName) {
    result += ` ${middleName}`
  }
  if (suffix) {
    result += `, ${suffix}`
  }
  return result
}

export function formatClientStatus(status) {
  return !ClientStatus.hasOwnProperty(status) ? 'Unknown' : ClientStatus[status]
}

export const failedFetching = { message: 'Fail to fetch data from server side!' }

export function clientCaseReferralNumber(serviceSource) {
  let caseReferralNumber = ''
  if (serviceSource === 'CASE') {
    caseReferralNumber = 'Case Number'
  } else if (serviceSource === 'REFERRAL') {
    caseReferralNumber = 'Referral Number'
  } else {
    caseReferralNumber = 'Case/Referral Number'
  }
  return caseReferralNumber
}
