export const staff = [
  {
    staff_person: {
      first_name: 'Jory',
      last_name: 'Cassel',
      phone_number: '9167654321',
      phone_ext_code: '4321',
      email: 'e@mail.com',
      county: {
        id: 44,
        name: 'Santa Cruz',
        external_id: '1111',
        export_id: '44',
      },
    },
    clients_count: 10,
    no_prior_cans_count: 4,
    in_progress_count: 5,
    completed_count: 1,
  },
  {
    staff_person: {
      first_name: 'Rodrik',
      last_name: 'Cassel',
      county: {
        id: 44,
        name: 'Santa Cruz',
        external_id: '1111',
        export_id: '44',
      },
    },
    clients_count: 12,
    no_prior_cans_count: 8,
    in_progress_count: 2,
    completed_count: 2,
  },
  {
    staff_person: { first_name: 'Heward', last_name: 'Wyl' },
    clients_count: 0,
    no_prior_cans_count: 0,
    in_progress_count: 0,
    completed_count: 0,
  },
]

describe('Staff mock', () => {
  it('is defined', () => {
    expect(staff).toBeDefined()
  })
})
