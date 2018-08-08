import { clone, stringify } from './common';

describe('common', () => {
  describe('#clone()', () => {
    it('copies the object fields values not the pointers ', () => {
      // given
      const original = {
        number: 123,
        obj: {
          a: 'b',
        },
        arr: [{ c: 'd' }],
      };

      // when
      const theClone = clone(original);
      original.number = 321;
      original.obj.a = 'xyz';
      original.arr[0].c = 'xyz';

      // then
      expect(theClone).toEqual({
        number: 123,
        obj: {
          a: 'b',
        },
        arr: [{ c: 'd' }],
      });
    });
  });

  describe('#stringify()', () => {
    describe.each`
      value   | string
      ${1}    | ${'1'}
      ${true} | ${'true'}
    `('$value', ({ value, string }) => {
      test(`converts ${value} to a string`, () => {
        expect(stringify(value)).toBe(string);
      });
    });
  });
});
