import React from 'react';
import {groupClientsByLastName} from './person.helper';

describe('person.helper', () => {
  describe('#groupClientsByLastName()', () => {
    it('returns clients grouped by the first letter of the last name', () => {
      const actual = groupClientsByLastName(personJson);
      expect(actual).toEqual(expectedSortedMap);
    });
  });
});

const personJson = [
  {
    "id": 1,
    "first_name": "Bruce",
    "last_name": "Wayne",
  },
  {
    "id": 3,
    "first_name": "Peter",
    "last_name": "Parker",
  },
  {
    "id": 4,
    "first_name": "Charley",
    "last_name": "Parker",
  }
];

const expectedSortedMap = [
  {
    letter: "P",
    clients: [
      {
        "id": 3,
        "first_name": "Peter",
        "last_name": "Parker"
      },
      {
        "id": 4,
        "first_name": "Charley",
        "last_name": "Parker"
      }
    ]
  },
  {
    letter: "W",
    clients: [
      {
        "id": 1,
        "first_name": "Bruce",
        "last_name": "Wayne"
      }
    ]
  }
];