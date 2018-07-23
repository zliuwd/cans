import React from 'react';
import { shallow } from 'enzyme';
import { executeTest } from './Routes.test.util';
import { AssessmentContainer } from '../components/Assessment';
import { ClientsContainer } from '../components/Client';
import { ChildForm } from '../components/ChildForm';
import { Routes } from './';
import { Route, Switch } from 'react-router-dom';

describe('<Router />', () => {
  describe('#render', () => {
    const getWrapper = () => shallow(<Routes />);
    const getLength = component => getWrapper().find(component).length;

    it('renders with 1 <Switch /> component', () => {
      console.log(getWrapper().debug());
      expect(getLength(Switch)).toBe(1);
    });

    it('renders with 4 <Route /> component', () => {
      expect(getLength(Route)).toBe(4);
    });
  });

  /**
   * To test that a configured route is working, create a new
   * test block below and pass executeTest() the component, the url and some html
   * that will be rendered from the component.
   *
   * example: the following route is defined in Routes.js:
   *   <Route path="/home" component={Home} />
   *
   * so you will pass the following:
   *   executeTest(Home, /home', 'Welcome!')
   */
  describe('route config', () => {
    describe('/', () => {
      it('navigates to clients list page', () => {
        executeTest(ClientsContainer, '/', '');
      });
    });

    describe('/assessments', () => {
      it('navigates to assessments', () => {
        executeTest(AssessmentContainer, '/assessments', 'Communimetric');
      });
    });

    describe('/clients/new', () => {
      it('navigates to clients form page', () => {
        executeTest(ChildForm, '/clients/new', 'Child/Youth');
      });
    });
  });
});
