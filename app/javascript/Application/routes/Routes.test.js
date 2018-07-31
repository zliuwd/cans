import React from 'react';
import { shallow } from 'enzyme';
import { executeTest } from './Routes.test.util';
import { AssessmentContainer } from '../components/Assessment';
import { ClientsContainer, ClientAddEditForm } from '../components/Client';
import { Routes } from './';
import { Route, Switch } from 'react-router-dom';

describe('<Router />', () => {
  describe('#render', () => {
    const getWrapper = () => shallow(<Routes />);
    const getLength = component => getWrapper().find(component).length;

    it('renders with 1 <Switch /> component', () => {
      expect(getLength(Switch)).toBe(1);
    });

    it('renders with 4 <Route /> component', () => {
      expect(getLength(Route)).toBe(5);
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
      it('navigates to client add form page', () => {
        executeTest(ClientAddEditForm, '/clients/new', 'Child/Youth');
      });
    });

    describe('/clients/edit/:id', () => {
      it('navigates to client edit form page', () => {
        executeTest(ClientAddEditForm, '/clients/edit/:id', 'Child/Youth');
      });
    });
  });
});
