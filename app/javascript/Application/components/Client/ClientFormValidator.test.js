import { validate, isFormValid } from './ClientFormValidator';

describe('ClientFormValidator', () => {
  describe('#validate()', () => {
    it('first_name', () => {
      expect(validate('first_name', '')).toBe(false);
      expect(validate('first_name', 'Mike')).toBe(true);
    });

    it('last_name', () => {
      expect(validate('first_name', '')).toBe(false);
      expect(validate('first_name', 'Mike')).toBe(true);
    });

    it('middle_name', () => {
      expect(validate('middle_name', '')).toBe(true);
      expect(validate('middle_name', 'Mike')).toBe(true);
    });

    it('suffix', () => {
      expect(validate('suffix', '')).toBe(true);
      expect(validate('suffix', 'Mr')).toBe(true);
    });

    it('case_id', () => {
      expect(validate('case_id', '1234567891234567890')).toBe(true);
      expect(validate('case_id', '1234-567-8912-34567890')).toBe(true);
      expect(validate('case_id', '1234-5678-9123-4567890')).toBe(false);
      expect(validate('case_id', '12345678912345678900')).toBe(false);
      expect(validate('case_id', '123456789')).toBe(false);
      expect(validate('case_id', '1234--5678-9123-4567890')).toBe(false);
      expect(validate('case_id', '76cv39d6')).toBe(false);
      expect(validate('case_id', 'vgh7321 ')).toBe(false);
      expect(validate('case_id', '#34la7sd')).toBe(false);
      expect(validate('case_id', '')).toBe(true);
    });

    it('external_id', () => {
      expect(validate('external_id', '1234567891234567890')).toBe(true);
      expect(validate('external_id', '1234-5678-9123-4567890')).toBe(true);
      expect(validate('external_id', '12345678912345678900')).toBe(false);
      expect(validate('external_id', '123456789')).toBe(false);
      expect(validate('external_id', '1234--5678-9123-4567890')).toBe(false);
      expect(validate('external_id', '76cv39d6')).toBe(false);
      expect(validate('external_id', 'vgh7321 ')).toBe(false);
      expect(validate('external_id', '#34la7sd')).toBe(false);
      expect(validate('external_id', '   ')).toBe(false);
    });

    it('dob', () => {
      expect(validate('dob', '2012/10/12')).toBe(true);
      expect(validate('dob', null)).toBe(false);
      expect(validate('dob', undefined)).toBe(false);
      expect(validate('dob', '')).toBe(false);
    });

    it('county', () => {
      expect(validate('county', { id: '1' })).toBe(true);
      expect(validate('county', {})).toBe(false);
      expect(validate('county', null)).toBe(false);
      expect(validate('county', undefined)).toBe(false);
      expect(validate('county', '')).toBe(false);
    });

    it('unknown field name', () => {
      expect(validate('unknownFieldName', { id: '1' })).toBe(false);
      expect(validate('unknownFieldName', {})).toBe(false);
      expect(validate('unknownFieldName', null)).toBe(false);
      expect(validate('unknownFieldName', undefined)).toBe(false);
      expect(validate('unknownFieldName', '')).toBe(false);
      expect(validate('unknownFieldName', 'string')).toBe(false);
    });
  });

  describe('#isFormValid()', () => {
    it('returns false when invalid', () => {
      expect(
        isFormValid({
          first_name: '',
          last_name: '',
          dob: '',
          case_id: '',
          external_id: '',
          county: '',
        })
      ).toBe(false);
    });

    it('returns true when valid', () => {
      expect(
        isFormValid({
          first_name: 'Amber',
          middle_name: 'Marie',
          last_name: 'Jersey',
          suffix: 'Mrs.',
          dob: '10/12/2012',
          case_id: '1234567891234567890',
          external_id: '1234567891234567890',
          county: { id: 1 },
        })
      ).toBe(true);
    });
  });
});
