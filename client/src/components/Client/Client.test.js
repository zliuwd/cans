import React from 'react';
import { shallow, mount } from 'enzyme';
import { Client } from './index';
import Card from '@material-ui/core/Card/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

describe('<Client />', () => {
  const match = { params: { id: 1 } };
  const getWrapper = () => shallow(<Client match={match} />);
  const getLength = component => getWrapper().find(component).length;

  it('renders with 1 <Card /> component', () => {
    expect(getLength(Card)).toBe(1);
  });

  it('renders with 1 <CardHeader /> component', () => {
    expect(getLength(CardHeader)).toBe(1);
  });

  it('renders with <CardContent /> component', () => {
    expect(getLength(CardContent)).toBe(1);
  });
});

describe('<Client /> without childData', () => {
  const match = { params: { id: 1 } };
  const getWrapper = () => shallow(<Client match={match} />);
  const getLength = component => getWrapper().find(component).length;

  it('renders with 2 <Grid /> components', () => {
    expect(getLength(Grid)).toBe(2);
  });

  it('renders No Child Data Found', () => {
    expect(getLength('#no-data')).toBe(1);
  });
});

describe('<Client /> with childData', () => {
  const match = { params: { id: 1 } };
  const wrapper = mount(<Client match={match} />);
  wrapper.setState({
    childData: {
      id: 1,
      first_name: 'test',
      last_name: 'user',
      dob: '10/10/1980',
      case_id: '483u92432',
      county: { name: 'Sacramento' },
    },
  });
  const getLength = component => wrapper.find(component).length;

  it('renders with 8 <Grid /> components', () => {
    expect(getLength(Grid)).toBe(8);
  });

  it('renders with 6 <Typography /> components', () => {
    expect(getLength(Typography)).toBe(6);
  });
});

describe('verify componentDidMount called', () => {
  const match = { params: { id: 1 } };

  it('calls person service for client data', () => {
    const spy = jest.spyOn(Client.prototype, 'componentDidMount');
    const wrapper = mount(<Client match={match} />);
    wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalled();
  });
});
