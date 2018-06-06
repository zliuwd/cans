import React from 'react';
import Card from '@material-ui/core/Card/Card';
import CardHeader from '@material-ui/core/CardHeader/index';
import CardContent from '@material-ui/core/CardContent/index';
import Grid from '@material-ui/core/Grid/Grid';
import { ClientAssessmentHistory } from './index';
import { MemoryRouter } from 'react-router-dom';

describe('<ClientAssessmentHistory', () => {
  const getWrapper = () =>
    shallow(
      <ClientAssessmentHistory
        clientFirstName={'test'}
        clientLastName={'user'}
      />
    );

  const getLength = component => getWrapper().find(component).length;

  it('renders with 1 <Grid /> component', () => {
    expect(getLength(Grid)).toBe(1);
  });

  it('renders with 1 <Card /> component', () => {
    expect(getLength(Card)).toBe(1);
  });

  it('renders with 1 <CardHeader /> component', () => {
    expect(getLength(CardHeader)).toBe(1);
  });

  it('renders with <CardContent /> component', () => {
    expect(getLength(CardContent)).toBe(1);
  });

  it('renders with <Link /> that navigates to /assessments', () => {
    const wrapper = mount(
      <MemoryRouter>
        <ClientAssessmentHistory
          clientFirstName={'test'}
          clientLastName={'user'}
        />
      </MemoryRouter>
    ).find(CardHeader);
    expect(wrapper.props().action.props.to.pathname).toBe('/assessments');
    expect(wrapper.props().action.props.to.pathname).not.toBe(
      '/some-other-url'
    );
  });
});
