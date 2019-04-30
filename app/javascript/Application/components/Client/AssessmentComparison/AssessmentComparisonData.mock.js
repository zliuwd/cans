export const fakeData = {
  underSix: {
    event_dates: [
      {
        event_date: '2018-02-21',
        assessment_status: 'COMPLETED',
        assessment_id: 64006,
      },
      {
        event_date: '2018-02-21',
        assessment_status: 'COMPLETED',
        assessment_id: 64005,
      },
      {
        event_date: '2018-02-08',
        assessment_status: 'COMPLETED',
        assessment_id: 64007,
      },
      {
        event_date: '2018-02-08',
        assessment_status: 'COMPLETED',
        assessment_id: 64008,
      },
      {
        event_date: '2018-02-08',
        assessment_status: 'COMPLETED',
        assessment_id: 64009,
      },
    ],
    domains: [
      {
        code: 'ECH',
        under_six: true,
        above_six: false,
        is_caregiver_domain: false,
        domain_ratings: [
          {
            value: 13,
            type: 'REGULAR',
            assessment_id: 65005,
          },
          {
            value: 13,
            type: 'REGULAR',
            assessment_id: 65006,
          },
          {
            assessment_id: 65007,
          },
          {
            assessment_id: 65008,
          },
          {
            assessment_id: 65009,
          },
        ],
        items: [
          {
            code: 'IMPULSIVITY_HYPERACTIVITY',
            under_six_id: 'EC01',
            above_six_id: '',
            item_ratings: [
              {
                value: 1,
                type: 'REGULAR',
                assessment_id: 65005,
                trend: 'UP',
              },
              {
                value: 1,
                type: 'REGULAR',
                assessment_id: 65006,
                trend: 'DOWN',
              },
              {
                assessment_id: 65007,
                trend: 'UP',
              },
              {
                assessment_id: 65008,
                trend: 'UP',
              },
              {
                assessment_id: 65009,
                trend: 'UP',
              },
            ],
          },
        ],
      },
    ],
  },
  aboveSix: {
    event_dates: [
      {
        event_date: '2019-02-21',
        assessment_status: 'COMPLETED',
        assessment_id: 65015,
      },
      {
        event_date: '2019-02-21',
        assessment_status: 'COMPLETED',
        assessment_id: 65016,
      },
      {
        event_date: '2019-02-08',
        assessment_status: 'COMPLETED',
        assessment_id: 65017,
      },
      {
        event_date: '2019-02-08',
        assessment_status: 'COMPLETED',
        assessment_id: 65018,
      },
      {
        event_date: '2019-02-08',
        assessment_status: 'COMPLETED',
        assessment_id: 65019,
      },
    ],
    domains: [
      {
        code: 'ECH',
        under_six: false,
        above_six: true,
        is_caregiver_domain: false,
        domain_ratings: [
          {
            value: 13,
            type: 'REGULAR',
            assessment_id: 65015,
          },
          {
            value: 13,
            type: 'REGULAR',
            assessment_id: 65016,
          },
          {
            assessment_id: 65017,
          },
          {
            assessment_id: 65018,
          },
          {
            assessment_id: 65019,
          },
        ],
        items: [
          {
            code: 'IMPULSIVITY_HYPERACTIVITY',
            under_six_id: 'EC01',
            above_six_id: '',
            item_ratings: [
              {
                value: 1,
                type: 'REGULAR',
                assessment_id: 65015,
                trend: 'UP',
              },
              {
                value: 1,
                type: 'REGULAR',
                assessment_id: 65016,
                trend: 'DOWN',
              },
              {
                assessment_id: 65017,
                trend: 'UP',
              },
              {
                assessment_id: 65018,
                trend: 'UP',
              },
              {
                assessment_id: 65019,
                trend: 'UP',
              },
            ],
          },
        ],
      },
    ],
  },
}

export const fakeDataUnderSixOnly = {
  underSix: {
    event_dates: [
      {
        event_date: '2018-02-21',
        assessment_status: 'COMPLETED',
        assessment_id: 64006,
      },
      {
        event_date: '2018-02-21',
        assessment_status: 'COMPLETED',
        assessment_id: 64005,
      },
      {
        event_date: '2018-02-08',
        assessment_status: 'COMPLETED',
        assessment_id: 64007,
      },
      {
        event_date: '2018-02-08',
        assessment_status: 'COMPLETED',
        assessment_id: 64008,
      },
      {
        event_date: '2018-02-08',
        assessment_status: 'COMPLETED',
        assessment_id: 64009,
      },
    ],
    domains: [
      {
        code: 'ECH',
        under_six: true,
        above_six: false,
        is_caregiver_domain: false,
        domain_ratings: [
          {
            value: 13,
            type: 'REGULAR',
            assessment_id: 65006,
          },
          {
            value: 13,
            type: 'REGULAR',
            assessment_id: 65005,
          },
          {
            assessment_id: 65007,
          },
          {
            assessment_id: 65008,
          },
          {
            assessment_id: 65009,
          },
        ],
        items: [
          {
            code: 'IMPULSIVITY_HYPERACTIVITY',
            under_six_id: 'EC01',
            above_six_id: '',
            item_ratings: [
              {
                value: 1,
                type: 'REGULAR',
                assessment_id: 65006,
                trend: 'UP',
              },
              {
                value: 1,
                type: 'REGULAR',
                assessment_id: 65005,
                trend: 'DOWN',
              },
              {
                assessment_id: 65007,
                trend: 'UP',
              },
              {
                assessment_id: 65008,
                trend: 'UP',
              },
              {
                assessment_id: 65009,
                trend: 'UP',
              },
            ],
          },
        ],
      },
    ],
  },
}

export const fakeDataAboveSixOnly = {
  aboveSix: {
    event_dates: [
      {
        event_date: '2019-02-21',
        assessment_status: 'COMPLETED',
        assessment_id: 65005,
      },
      {
        event_date: '2019-02-22',
        assessment_status: 'COMPLETED',
        assessment_id: 65006,
      },
    ],
    domains: [
      {
        code: 'ECH',
        under_six: false,
        above_six: true,
        is_caregiver_domain: false,
        domain_ratings: [
          {
            value: 13,
            type: 'REGULAR',
            assessment_id: 65005,
          },
          {
            value: 13,
            type: 'REGULAR',
            assessment_id: 65006,
          },
        ],
        items: [
          {
            code: 'IMPULSIVITY_HYPERACTIVITY',
            under_six_id: 'EC01',
            above_six_id: '',
            item_ratings: [
              {
                value: 1,
                type: 'REGULAR',
                assessment_id: 65005,
                trend: 'UP',
              },
              {
                value: 1,
                type: 'REGULAR',
                assessment_id: 65006,
                trend: 'DOWN',
              },
            ],
          },
        ],
      },
    ],
  },
}
