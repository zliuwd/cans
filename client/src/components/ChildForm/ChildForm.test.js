import React from 'react';
import { shallow, mount } from 'enzyme';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ChildForm from './ChildForm';

describe('<ChildForm />', () => {
  const getWrapper = () => mount(<ChildForm />);
  const getLength = component => getWrapper().find(component).length;

  it('renders with 1 Card component', () => {
    expect(getLength(Card)).toBe(1);
  });

  it('renders with 5 TextField component', () => {
    expect(getLength(TextField)).toBe(5);
  });

  it('renders with 2 Button component', () => {
    expect(getLength(Button)).toBe(2);
  });
});
