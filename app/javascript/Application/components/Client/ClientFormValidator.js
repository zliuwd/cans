export function validate(fieldName, value) {
  const isName = value => /^[A-z]+(([ ]|[-])[A-z]+)?$/i.test(value);
  switch (fieldName) {
    case 'first_name':
    case 'last_name':
      return value.length && isName(value);
    case 'middle_name':
      return value.length === 0 || isName(value);
    case 'suffix':
      return value.length === 0 || /^([a-zA-Z])+[.]?$/i.test(value);
    case 'case_id':
      return (
        value.length === 0 ||
        (value.length > 18 && (/^\d{4}-\d{3}-\d{4}-\d{8}$/i.test(value) || /^\d{19}$/i.test(value)))
      );
    case 'external_id':
      return value.length > 18 && (/^\d{4}-\d{4}-\d{4}-\d{7}$/i.test(value) || /^\d{19}$/i.test(value));
    case 'dob':
      return !!value;
    case 'county':
      return value ? !!value.id : false;
    default:
      return false;
  }
}

export function isFormValid(childInfoValidation) {
  return !!(
    childInfoValidation.first_name &&
    childInfoValidation.middle_name &&
    childInfoValidation.last_name &&
    childInfoValidation.suffix &&
    childInfoValidation.case_id &&
    childInfoValidation.external_id &&
    childInfoValidation.dob &&
    childInfoValidation.county
  );
}
