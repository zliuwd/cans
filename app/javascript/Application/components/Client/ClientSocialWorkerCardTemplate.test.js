import { SocialWorkerCardTemplate } from './ClientSocialWorkerCardTemplate'
describe(' ClientSocialWorkerCardTempate ', () => {
  const client = {
    id: 0,
    first_name: 'Jim',
    middle_name: 'Alen',
    last_name: 'Green',
    suffix: 'Mr.',
    dob: '2000-01-01',
    reminder_date: '2018-10-26',
    status: 'NO_PRIOR_CANS',
  }

  const template = SocialWorkerCardTemplate

  it('will return an array with length 4 because this a 4 columns template', () => {
    const expectedReturn = template()
    expect(expectedReturn.length).toEqual(4)
  })

  it('will return right Header', () => {
    const expectedFullNameHeader = template()[0].Header
    const expectedDoBHeader = template()[1].Header
    const expectedStatusHeader = template()[2].Header
    const expectedReminderDateHeader = template()[3].Header.props.title
    const expectedReminderDateHeaderTooltip = template()[3].Header.props.tooltip
    expect(expectedFullNameHeader).toEqual('Client Name')
    expect(expectedDoBHeader).toEqual('DOB')
    expect(expectedStatusHeader).toEqual('CANS Status')
    expect(expectedReminderDateHeader).toEqual('Reassessment Reminder Date')
    expect(expectedReminderDateHeaderTooltip).toEqual(
      'A CANS reassessment should be completed in conjunction with the case plan update or at a minimum of every six months'
    )
  })

  it('all accessor works', () => {
    const accessorFullName = template()[0].accessor(client)
    const accessorDoB = template()[1].accessor(client)
    const accessorStatus = template()[2].accessor(client)
    const accessorReminderDate = template()[3].accessor(client)
    expect(accessorFullName).toEqual('Green, Jim Alen, Mr.')
    expect(accessorDoB).toEqual('01/01/2000')
    expect(accessorStatus).toEqual('No prior CANS')
    expect(accessorReminderDate).toEqual('10/26/2018')
  })

  describe('sort method', () => {
    describe('date A is more recent than date B', () => {
      it('sorts date A before date B', () => {
        const dateA = '01/02/2018'
        const dateB = '01/01/2018'
        const clientSocialWorkerColumn = template()[1].sortMethod(dateA, dateB)

        expect(clientSocialWorkerColumn).toBe(1)
      })
    })

    describe('date A is less recent than date B', () => {
      it('sorts date B before date A', () => {
        const dateA = '01/01/2018'
        const dateB = '01/02/2018'
        const clientSocialWorkerColumn = template()[1].sortMethod(dateA, dateB)

        expect(clientSocialWorkerColumn).toBe(-1)
      })
    })
  })
})
