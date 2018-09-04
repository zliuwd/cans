import { isoToJsDate, isoToLocalDate, isValidIsoDate, jsDateToIso } from './dateHelper';

describe('#isoToLocalDate()', () => {
  it('returns a formatted date', () => {
    expect(isoToLocalDate('2012-05-31')).toEqual('05/31/2012');
  });

  it('returns Invalid DateTime when input is null', () => {
    expect(isoToLocalDate(null)).toEqual(null);
  });

  it('returns Invalid Date when input is undefined', () => {
    expect(isoToLocalDate(undefined)).toEqual('Invalid date');
  });

  it('returns Invalid Date when input is invalid JS Date', () => {
    expect(isoToLocalDate('Wrong Date')).toEqual('Invalid date');
  });
});

describe('#jsDateToIso()', () => {
  it('returns a formatted ISO date when input is valid JS Date', () => {
    expect(jsDateToIso(isoToJsDate('2010-06-30'))).toEqual('2010-06-30');
  });

  it('returns null when input is null', () => {
    expect(jsDateToIso(null)).toEqual(null);
  });

  it('returns Invalid DateTime when input is invalid JS Date', () => {
    expect(jsDateToIso('Wrong Date')).toEqual('Invalid date');
  });
});

describe('#isoToJsDate()', () => {
  it('returns a valid JS Date when input is valid ISO Date', () => {
    var result = isoToJsDate('1970-01-01');
    var expected = jsDateToIso(result);
    expect('1970-01-01').toEqual(expected);
  });

  it('returns null when input is null', () => {
    expect(isoToJsDate(null)).toEqual(null);
  });

  it('returns null when input is invalid JS Date', () => {
    expect(isoToJsDate('Wrong Date')).toEqual(null);
  });
});

describe('#isValidIsoDate()', () => {
  it('returns true is input is valid ISO date', () => {
    expect(isValidIsoDate('1970-01-01')).toEqual(true);
  });

  it('returns false when input is invalid ISO date string', () => {
    expect(isValidIsoDate('wrong date')).toEqual(false);
    expect(isValidIsoDate(null)).toEqual(false);
    expect(isValidIsoDate(undefined)).toEqual(false);
    expect(isValidIsoDate('2018-13-45')).toEqual(false);
  });
});
