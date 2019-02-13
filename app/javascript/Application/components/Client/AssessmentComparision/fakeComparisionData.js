const dataExample = {
  // just four assessment record, and mixed with different age ranges, with none name caregiver domain
  // order is important, for index 0 to index 3, the earliest to current
  date_info: [
    { date: '03/01/2016', status: '' },
    { date: '09/21/2016', status: '' },
    { date: '10/11/2017', status: '' },
    { date: '01/01/2019', status: 'IN_PROGRESS' },
  ], // length equal to assessment amount, if no value use '' or null
  // order is important, for index 0 to index 3, the earliest to current
  domains: [
    {
      code: 'STR',
      under_six: true, // currently not be used, but expect to keep
      above_six: false, // currently not be used, but expect to keep
      caregiver_name: '', // if caregiver
      caregiver_index: '', // if caregiver
      rating_totals: [null, null, 20, 7], // length equal to assessment amount, if no value use  null
      items: [
        {
          under_six_id: '', // currently not be used, but expect to keep
          above_six_id: '32', // currently not be used, but expect to keep
          code: 'FAMILY_STRENGTHS',
          item_ratings: [{}, {}, { value: 1, trend: '' }, { value: 1, trend: '' }],
          // length equal to assessment amount, if no value {} or null
          // order is important, for index 0 to index 3, the earliest to current
        },
      ],
    },
  ],
}

export const fiveAssessmentWithCaregiverChange = {
  date_info: [
    { date: '10/10/2016', status: '' },
    { date: '04/11/2017', status: '' },
    { date: '10/24/2017', status: '' },
    { date: '10/24/2017', status: '' },
    { date: '10/15/2018', status: 'IN_PROGRESS' },
  ],
  domains: [
    {
      code: 'ECH',

      rating_totals: [13, 13, 12, 12, 11],
      items: [
        {
          under_six_id: 'EC01',
          above_six_id: '',
          code: 'IMPULSIVITY_HYPERACTIVITY',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'EC02',
          above_six_id: '',
          code: 'DEPRESSION',
          item_ratings: [
            { value: 3, trend: '' },
            { value: 3, trend: '' },
            { value: 3, trend: '' },
            { value: 3, trend: '' },
            { value: 3, trend: '' },
          ],
        },
        {
          under_six_id: 'EC03',
          above_six_id: '',
          code: 'ANXIETY',
          item_ratings: [
            { value: 0, trend: '' },
            { value: 0, trend: '' },
            { value: 0, trend: '' },
            { value: 0, trend: '' },
            { value: 0, trend: '' },
          ],
        },
        {
          under_six_id: 'EC04',
          above_six_id: '',
          code: 'OPPOSITIONAL',
          item_ratings: [
            { value: 3, trend: '' },
            { value: 3, trend: '' },
            { value: 3, trend: '' },
            { value: 3, trend: '' },
            { value: 3, trend: '' },
          ],
        },
        {
          under_six_id: 'EC05',
          above_six_id: '',
          code: 'ADJUSTMENT_TO_TRAUMA',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'EC06',
          above_six_id: '',
          code: 'ATTACHMENT_DIFFICULTIES',
          item_ratings: [
            { value: 0, trend: '' },
            { value: 0, trend: '' },
            { value: 0, trend: '' },
            { value: 0, trend: '' },
            { value: 0, trend: '' },
          ],
        },
        {
          under_six_id: 'EC07',
          above_six_id: '',
          code: 'REGULATORY',
          item_ratings: [
            { value: 3, trend: '' },
            { value: 3, trend: '' },
            { value: 2, trend: 'down' },
            { value: 3, trend: 'up' },
            { value: -1, trend: '' },
          ],
        },
        {
          under_six_id: 'EC08',
          above_six_id: '',
          code: 'ATYPICAL_BEHAVIORS',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: -1, trend: '' },
          ],
        },
        {
          under_six_id: 'EC09',
          above_six_id: '',
          code: 'SLEEP_CHILD',
          item_ratings: [
            { value: 0, trend: '' },
            { value: 0, trend: '' },
            { value: 0, trend: '' },
            { value: 0, trend: '' },
            { value: -1, trend: '' },
          ],
        },
      ],
    },
    {
      code: 'EFX',

      rating_totals: [12, 12, 14, 16, 14],
      items: [
        {
          under_six_id: 'EC10',
          above_six_id: '',
          code: 'FAMILY_FUNCTIONING',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 2, trend: 'up' },
            { value: 3, trend: 'up' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'EC11',
          above_six_id: '',
          code: 'EARLY_EDUCATION',
          item_ratings: [
            { value: 3, trend: '' },
            { value: 3, trend: '' },
            { value: 1, trend: 'down' },
            { value: 3, trend: '' },
            { value: 3, trend: 'down' },
          ],
        },
        {
          under_six_id: 'EC12',
          above_six_id: '',
          code: 'SOCIAL_EMOTIONAL_FUNCTIONING',
          item_ratings: [
            { value: 0, trend: '' },
            { value: 0, trend: '' },
            { value: 0, trend: '' },
            { value: 1, trend: 'up' },
            { value: 0, trend: '' },
          ],
        },
        {
          under_six_id: 'EC13',
          above_six_id: '',
          code: 'DEVELOPMENTAL_INTELLECTUAL',
          item_ratings: [
            { value: 3, trend: '' },
            { value: 1, trend: 'down' },
            { value: 3, trend: 'up' },
            { value: 2, trend: 'down' },
            { value: 3, trend: '' },
          ],
        },
        {
          under_six_id: 'EC14',
          above_six_id: '',
          code: 'MEDICAL_PHYSICAL',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 0, trend: 'down' },
          ],
        },
      ],
    },
    {
      code: 'ERB',

      rating_totals: [13, 13, 12, 12, 11],
      items: [
        {
          under_six_id: 'EC15',
          above_six_id: '',
          code: 'SELF_HARM',
          item_ratings: [
            { value: 0, trend: '' },
            { value: 1, trend: 'up' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'EC16',
          above_six_id: '',
          code: 'EXPLOITED',
          item_ratings: [
            { value: 3, trend: '' },
            { value: 3, trend: '' },
            { value: 2, trend: 'down' },
            { value: 3, trend: 'up' },
            { value: 3, trend: 'down' },
          ],
        },
        {
          under_six_id: 'EC17',
          above_six_id: '',
          code: 'PRENATAL_CARE',
          item_ratings: [
            { value: 0, trend: '' },
            { value: 0, trend: '' },
            { value: 0, trend: '' },
            { value: 1, trend: 'up' },
            { value: 0, trend: 'down' },
          ],
        },
        {
          under_six_id: 'EC18',
          above_six_id: '',
          code: 'EXPOSURE',
          item_ratings: [
            { value: 3, trend: '' },
            { value: 3, trend: '' },
            { value: 0, trend: 'down' },
            { value: 3, trend: 'up' },
            { value: 3, trend: '' },
          ],
        },
        {
          under_six_id: 'EC19',
          above_six_id: '',
          code: 'LABOR_DELIVERY',
          item_ratings: [
            { value: 0, trend: '' },
            { value: 1, trend: 'up' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'EC20',
          above_six_id: '',
          code: 'BIRTH_WEIGHT',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 3, trend: 'up' },
            { value: 1, trend: 'down' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'EC21',
          above_six_id: '',
          code: 'FAILURE_TO_THRIVE',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
      ],
    },
    {
      code: 'CGV',
      caregiver_name: 'Seaver',
      caregiver_index: 'a',

      rating_totals: [10, 8, 6, null, null],
      items: [
        {
          under_six_id: 'E34',
          above_six_id: '41',
          code: 'SUPERVISION',
          item_ratings: [{ value: 0, trend: '' }, { value: 2, trend: 'up' }, { value: 2, trend: '' }, {}, {}],
        },
        {
          under_six_id: 'E35',
          above_six_id: '42',
          code: 'INVOLVEMENT_WITH_CARE',
          item_ratings: [{ value: 1, trend: '' }, { value: 2, trend: 'up' }, { value: 0, trend: 'down' }, {}, {}],
        },
        {
          under_six_id: 'E36',
          above_six_id: '43',
          code: 'KNOWLEDGE',
          item_ratings: [{ value: 0, trend: '' }, { value: 1, trend: 'up' }, { value: 3, trend: 'up' }],
        },
      ],
    },
    {
      code: 'CGV',
      caregiver_name: 'Seaver',
      caregiver_index: 'b',

      rating_totals: [7, 12, 11, null, null],
      items: [
        {
          under_six_id: 'E34',
          above_six_id: '41',
          code: 'SUPERVISION',
          item_ratings: [{ value: 0, trend: '' }, { value: 2, trend: 'up' }, { value: 2, trend: '' }, {}, {}],
        },
        {
          under_six_id: 'E35',
          above_six_id: '42',
          code: 'INVOLVEMENT_WITH_CARE',
          item_ratings: [{ value: 1, trend: '' }, { value: 2, trend: 'up' }, { value: 0, trend: 'down' }, {}, {}],
        },
        {
          under_six_id: 'E36',
          above_six_id: '43',
          code: 'KNOWLEDGE',
          item_ratings: [{ value: 0, trend: '' }, { value: 1, trend: 'up' }, { value: 3, trend: 'up' }],
        },
      ],
    },
    {
      code: 'CGV',
      caregiver_name: 'Kirk Camero',
      caregiver_index: 'a',

      rating_totals: [null, null, null, 13, 7],
      items: [
        {
          under_six_id: 'E34',
          above_six_id: '41',
          code: 'SUPERVISION',
          item_ratings: ['', '', '', { value: 1, trend: '' }, { value: 0, trend: '' }],
        },
        {
          under_six_id: 'E35',
          above_six_id: '42',
          code: 'INVOLVEMENT_WITH_CARE',
          item_ratings: ['', '', '', { value: 0, trend: '' }, { value: 2, trend: '' }],
        },
        {
          under_six_id: 'E36',
          above_six_id: '43',
          code: 'KNOWLEDGE',
          item_ratings: ['', '', '', { value: 0, trend: '' }, { value: 3, trend: '' }],
        },
      ],
    },
    {
      code: 'TRM',

      rating_totals: [5, 4, 4, 4, 4],
      items: [
        {
          under_six_id: 'T01',
          above_six_id: 'T01',
          code: 'SEXUAL_ABUSE',
          item_ratings: [
            { value: 0, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T02',
          above_six_id: 'T02',
          code: 'PHYSICAL_ABUSE',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 0, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T03',
          above_six_id: 'T03',
          code: 'EMOTIONAL_ABUSE',
          item_ratings: [
            { value: 0, trend: '' },
            { value: 0, trend: '' },
            { value: 0, trend: '' },
            { value: 1, trend: '' },
            { value: 0, trend: '' },
          ],
        },
        {
          under_six_id: 'T04',
          above_six_id: 'T04',
          code: 'NEGLECT',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 0, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T05',
          above_six_id: 'T05',
          code: 'MEDICAL_TRAUMA',
          item_ratings: [
            { value: 0, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T06',
          above_six_id: 'T06',
          code: 'WITNESS_FAMILY_VIOLENCE',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 0, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T07',
          above_six_id: 'T07',
          code: 'WITNESS_COMMUNITY_SCHOOL_VIOLENCE',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T08',
          above_six_id: 'T08',
          code: 'NATURAL_MANMADE_DISASTER',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T09',
          above_six_id: 'T09',
          code: 'WAR_TERRORISM_AFFECTED',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T10',
          above_six_id: 'T10',
          code: 'VICTIM_WITNESS_CRIMINAL_ACTIVITY',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T11',
          above_six_id: 'T11',
          code: 'DISRUPTIONS_CG_ATTACHMENT_LOSSES',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T12',
          above_six_id: 'T12',
          code: 'CG_CRIMINAL_BEHAVIOR',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
      ],
    },
  ],
}

export const fourAssessmentCrossingAge = {
  // just four assessment record, and mixed with different age ranges, with none name caregiver domain
  // from 10/11/2017 this guy turn to 6 to 21 then get STR domain
  date_info: [
    { date: '03/01/2016', status: '' },
    { date: '09/21/2016', status: '' },
    { date: '10/11/2017', status: '' },
    { date: '01/01/2019', status: 'IN_PROGRESS' },
  ],
  domains: [
    {
      code: 'ECH',

      rating_totals: [13, 15, null, null],
      items: [
        {
          under_six_id: 'EC01',
          above_six_id: '',
          code: 'IMPULSIVITY_HYPERACTIVITY',
          item_ratings: [{ value: 1, trend: '' }, { value: 1, trend: '' }, {}, {}],
        },
        {
          under_six_id: 'EC02',
          above_six_id: '',
          code: 'DEPRESSION',
          item_ratings: [{ value: 3, trend: '' }, { value: 3, trend: '' }, {}, {}],
        },
        {
          under_six_id: 'EC03',
          above_six_id: '',
          code: 'ANXIETY',
          item_ratings: [{ value: 0, trend: '' }, { value: 0, trend: '' }, {}, {}],
        },
        {
          under_six_id: 'EC04',
          above_six_id: '',
          code: 'OPPOSITIONAL',
          item_ratings: [{ value: 3, trend: '' }, { value: 3, trend: '' }, {}, {}],
        },
        {
          under_six_id: 'EC05',
          above_six_id: '',
          code: 'ADJUSTMENT_TO_TRAUMA',
          item_ratings: [{ value: 1, trend: '' }, { value: 1, trend: '' }, {}, {}],
        },
        {
          under_six_id: 'EC06',
          above_six_id: '',
          code: 'ATTACHMENT_DIFFICULTIES',
          item_ratings: [{ value: 0, trend: '' }, { value: 0, trend: '' }, {}, {}],
        },
        {
          under_six_id: 'EC07',
          above_six_id: '',
          code: 'REGULATORY',
          item_ratings: [{ value: 3, trend: '' }, { value: 3, trend: '' }, {}, {}],
        },
        {
          under_six_id: 'EC08',
          above_six_id: '',
          code: 'ATYPICAL_BEHAVIORS',
          item_ratings: [{ value: 1, trend: '' }, { value: 1, trend: '' }, {}, {}],
        },
        {
          under_six_id: 'EC09',
          above_six_id: '',
          code: 'SLEEP_CHILD',
          item_ratings: [{ value: 0, trend: '' }, { value: 0, trend: '' }, {}, {}],
        },
      ],
    },
    {
      code: 'EST',

      rating_totals: [8, 15, null, null],
      items: [
        {
          under_six_id: 'ec25',
          above_six_id: '',
          code: 'FAMILY_STRENGTHS',
          item_ratings: [{ value: 1, trend: '' }, { value: 2, trend: 'up' }, {}, {}],
        },
        {
          under_six_id: 'ec26',
          above_six_id: '',
          code: 'INTERPERSONAL',
          item_ratings: [{ value: 2, trend: '' }, { value: 1, trend: 'down' }, {}, {}],
        },
        {
          under_six_id: 'ec27',
          above_six_id: '',
          code: 'NATURAL_SUPPORTS',
          item_ratings: [{ value: 1, trend: '' }, { value: 3, trend: 'up' }, {}, {}],
        },
        {
          under_six_id: 'ec28',
          above_six_id: '',
          code: 'RESILIENCY',
          item_ratings: [{ value: 1, trend: 'down' }, { value: 2, trend: 'up' }, {}, {}],
        },
        {
          under_six_id: 'ec29',
          above_six_id: '',
          code: 'RELATIONSHIP_PERMANENCE',
          item_ratings: [{ value: 0, trend: '' }, { value: 1, trend: 'up' }, {}, {}],
        },
        {
          under_six_id: 'ec30',
          above_six_id: '',
          code: 'PLAYFULLNESS',
          item_ratings: [{ value: 3, trend: 'up' }, { value: 1, trend: 'down' }, {}, {}],
        },
        {
          under_six_id: 'ec31',
          above_six_id: '',
          code: 'FAMILY_SPRITUAL_RELIGIOUS',
          item_ratings: [{ value: 1, trend: '' }, { value: 1, trend: '' }, {}, {}],
        },
      ],
    },
    {
      code: 'STR',

      rating_totals: [null, null, 20, 7],
      items: [
        {
          under_six_id: '',
          above_six_id: '32',
          code: 'FAMILY_STRENGTHS',
          item_ratings: [{}, {}, { value: 1, trend: '' }, { value: 1, trend: '' }],
        },
        {
          under_six_id: '',
          above_six_id: '33',
          code: 'INTERPERSONAL',
          item_ratings: [{}, {}, { value: 2, trend: 'down' }, { value: 3, trend: 'up' }],
        },
        {
          under_six_id: '',
          above_six_id: '34',
          code: 'EDUCATIONAL_SETTING',
          item_ratings: [{}, {}, { value: 0, trend: '' }, { value: 1, trend: 'up' }],
        },
        {
          under_six_id: '',
          above_six_id: '35',
          code: 'TALENTS_INTERESTS',
          item_ratings: [{}, {}, { value: 0, trend: 'down' }, { value: 3, trend: 'up' }],
        },
        {
          under_six_id: '',
          above_six_id: '36',
          code: 'SPIRITUAL_RELIGIOUS',
          item_ratings: [{}, {}, { value: 1, trend: '' }, { value: 1, trend: '' }],
        },
        {
          under_six_id: '',
          above_six_id: '37',
          code: 'CULTURAL_IDENTITY',
          item_ratings: [{}, {}, { value: 3, trend: 'up' }, { value: 1, trend: 'down' }],
        },
        {
          under_six_id: '',
          above_six_id: '38',
          code: 'COMMUNITY_LIFE',
          item_ratings: [{}, {}, { value: 1, trend: '' }, { value: 1, trend: '' }],
        },
        {
          under_six_id: '',
          above_six_id: '39',
          code: 'NATURAL_SUPPORTS',
          item_ratings: [{}, {}, { value: 1, trend: '' }, { value: 1, trend: '' }],
        },
        {
          under_six_id: '',
          above_six_id: '40',
          code: 'RESILIENCY',
          item_ratings: [{}, {}, { value: 1, trend: '' }, { value: 1, trend: '' }],
        },
      ],
    },
    {
      code: 'CGV',
      caregiver_index: 'a',

      rating_totals: [10, 8, 6, ''],
      items: [
        {
          under_six_id: 'E34',
          above_six_id: '41',
          code: 'SUPERVISION',
          item_ratings: [{ value: 0, trend: '' }, { value: 2, trend: 'up' }, { value: 2, trend: '' }, {}],
        },
        {
          under_six_id: 'E35',
          above_six_id: '42',
          code: 'INVOLVEMENT_WITH_CARE',
          item_ratings: [{ value: 1, trend: '' }, { value: 2, trend: 'up' }, { value: 0, trend: 'down' }, {}],
        },
        {
          under_six_id: 'E36',
          above_six_id: '43',
          code: 'KNOWLEDGE',
          item_ratings: [{ value: 0, trend: '' }, { value: 1, trend: 'up' }, { value: 3, trend: 'up' }, {}],
        },
      ],
    },
    {
      code: 'TRM',

      rating_totals: [5, 4, 4, 4],
      items: [
        {
          under_six_id: 'T01',
          above_six_id: 'T01',
          code: 'SEXUAL_ABUSE',
          item_ratings: [
            { value: 0, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T02',
          above_six_id: 'T02',
          code: 'PHYSICAL_ABUSE',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 0, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T03',
          above_six_id: 'T03',
          code: 'EMOTIONAL_ABUSE',
          item_ratings: [
            { value: 0, trend: '' },
            { value: 0, trend: '' },
            { value: 0, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T04',
          above_six_id: 'T04',
          code: 'NEGLECT',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 0, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T05',
          above_six_id: 'T05',
          code: 'MEDICAL_TRAUMA',
          item_ratings: [
            { value: 0, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T06',
          above_six_id: 'T06',
          code: 'WITNESS_FAMILY_VIOLENCE',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 0, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T07',
          above_six_id: 'T07',
          code: 'WITNESS_COMMUNITY_SCHOOL_VIOLENCE',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T08',
          above_six_id: 'T08',
          code: 'NATURAL_MANMADE_DISASTER',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T09',
          above_six_id: 'T09',
          code: 'WAR_TERRORISM_AFFECTED',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T10',
          above_six_id: 'T10',
          code: 'VICTIM_WITNESS_CRIMINAL_ACTIVITY',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T11',
          above_six_id: 'T11',
          code: 'DISRUPTIONS_CG_ATTACHMENT_LOSSES',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
        {
          under_six_id: 'T12',
          above_six_id: 'T12',
          code: 'CG_CRIMINAL_BEHAVIOR',
          item_ratings: [
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
            { value: 1, trend: '' },
          ],
        },
      ],
    },
  ],
}
