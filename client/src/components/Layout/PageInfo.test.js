import React from 'react';
import { shallow } from 'enzyme';
import { Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import PageInfo from './PageInfo';

describe('<PageInfo />', () => {
  const getWrapper = () => shallow(<PageInfo />);
  const getLength = component => getWrapper().find(component).length;

  it('renders with 2 <Row /> component', () => {
    expect(getLength(Row)).toBe(2);
  });

  it('renders with 2 <Col /> component', () => {
    expect(getLength(Col)).toBe(2);
  });

  it('renders with 1 <Breadcrumb /> component', () => {
    expect(getLength(Breadcrumb)).toBe(1);
  });

  it('renders with 4 <BreadcrumbItem /> components', () => {
    expect(getLength(BreadcrumbItem)).toBe(4);
  });
});
