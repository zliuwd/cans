import React from 'react';
import { mount } from 'enzyme';
import DateField from './DateField';
import { jsDateToIso } from '../../util/dateHelper';

describe('DateField', () => {
  function mountDateField({
    id = '',
    max,
    min,
    onBlur = () => null,
    onChange = () => null,
    required = undefined,
    value,
  } = {}) {
    const props = {
      id,
      max,
      min,
      onBlur,
      onChange,
      required,
      value,
    };
    return mount(<DateField {...props} />);
  }

  it('renders the id', () => {
    const component = mountDateField({ id: 'myDateFieldId' });
    expect(component.find('input').props().id).toEqual('myDateFieldId_input');
  });

  it('renders the input element', () => {
    const dateTimePicker = mountDateField({ value: '2017-05-05' }).find('DateTimePicker');
    expect(dateTimePicker.length).toEqual(1);
    expect(dateTimePicker.props().value).toEqual(new Date('05/05/2017'));
  });

  it('renders the input element with a no date when value is null', () => {
    const dateTimePicker = mountDateField({ value: null }).find('DateTimePicker');
    expect(dateTimePicker.length).toEqual(1);
    expect(dateTimePicker.props().value).toEqual(null);
  });

  it('calls parent onChange with date string when DateTimePicker calls onChange', () => {
    const onChange = jasmine.createSpy('onChange');
    const dateTimePicker = mountDateField({ onChange }).find('DateTimePicker');
    const date = new Date();
    dateTimePicker.props().onChange(date);
    expect(onChange).toHaveBeenCalledWith(jsDateToIso(date));
  });

  it('does not render a required date field', () => {
    const component = mountDateField();
    expect(component.find('input').prop('required')).toEqual(undefined);
    expect(component.find('input').prop('aria-required')).toEqual(undefined);
  });

  it('can render properly without an onBlur prop', () => {
    const component = mountDateField({ onBlur: null });
    const dateTimePicker = component.find('DateTimePicker');
    expect(() => {
      dateTimePicker.props().onBlur({ target: { value: '' } });
    }).not.toThrow(new TypeError('onBlur is not a function'));
  });

  describe('when passed an onBlur function', () => {
    let onBlur;
    let dateTimePicker;

    beforeEach(() => {
      onBlur = jasmine.createSpy('onBlur');
      dateTimePicker = mountDateField({ onBlur }).find('DateTimePicker');
    });

    it('calls the passed function with a value', () => {
      const event = { target: { value: '1999-12-31' } };
      dateTimePicker.props().onBlur(event);
      expect(onBlur).toHaveBeenCalledWith('1999-12-31');
    });

    it('calls the passed function with null if the value is empty', () => {
      const event = { target: { value: '' } };
      dateTimePicker.props().onBlur(event);
      expect(onBlur).toHaveBeenCalledWith(null);
    });

    it('calls the passed function with null if the value is invalid date', () => {
      const event = { target: { value: 'Invalid Date' } };
      dateTimePicker.props().onBlur(event);
      expect(onBlur).toHaveBeenCalledWith(null);
    });
  });

  it('displays with the expected format', () => {
    const input = mountDateField({ value: '2017-05-15' }).find('input');
    expect(input.props().value).toEqual('05/15/2017');
  });

  it('passes the min and max props down to the DateTimePicker', () => {
    const min = new Date('2007-06-15');
    const max = new Date('2008-08-23');
    const dateTimePicker = mountDateField({ min, max }).find('DateTimePicker');
    expect(dateTimePicker.props().max).toBe(max);
    expect(dateTimePicker.props().min).toBe(min);
  });

  it('displays calendar by default', () => {
    const dateTimePicker = mountDateField({}).find('DateTimePicker');
    expect(dateTimePicker.props().format).toEqual('MM/DD/YYYY');
    expect(dateTimePicker.props().placeholder).toEqual('mm/dd/yyyy');
  });

  describe('when value is null, emptystring, or undefined', () => {
    describe('with time', () => {
      [null, '', undefined].map(value => {
        it(`with ${value} has a blank as value`, () => {
          const input = mountDateField({ value }).find('input');
          expect(input.props().value).toEqual('');
        });
      });
    });

    describe('without time', () => {
      [null, '', undefined].map(value => {
        it(`with ${value} has a blank as value`, () => {
          const input = mountDateField({ value, hasTime: false }).find('input');
          expect(input.props().value).toEqual('');
        });
      });
    });
  });

  it('handles null changes to dates (value deleted)', () => {
    const onChange = jasmine.createSpy('onChange');
    const input = mountDateField({ value: '123', onChange }).find('input');
    const event = { target: { value: null } };
    input.simulate('change', event);
    input.simulate('blur', event);
    expect(onChange.calls.mostRecent().args[0]).toEqual(null);
  });
});
