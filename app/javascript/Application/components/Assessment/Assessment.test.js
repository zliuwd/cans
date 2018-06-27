import React from 'react';
import { Assessment, AssessmentFormHeader, AssessmentService, Domain, DomainsGroup } from './index';
import { childInfoJson } from '../Client/person.helper.test';
import PersonService from '../Client/person.service';
import { DateTime } from 'luxon';
import { shallow } from 'enzyme/build/index';
import { PageInfo } from '../Layout';
import Typography from '@material-ui/core/Typography/Typography';
import AssessmentFormFooter from './AssessmentFormFooter';

const initialAssessment = {
  instrument_id: 1,
  person: childInfoJson,
  assessment_type: "INITIAL",
  status: 'IN_PROGRESS',
  completed_as: 'COMMUNIMETRIC',
  can_release_confidential_info: false,
  state: {
    id: 0,
    under_six: false,
    domains: [
      {
        id: 0,
        code: 'string',
        underSix: false,
        aboveSix: false,
      },
    ],
  },
  event_date: DateTime.local().toISODate(),
};

const assessment = {
  id: 1,
  instrument_id: 1,
  person: childInfoJson,
  assessment_type: 'INITIAL',
  status: 'IN_PROGRESS',
  completed_as: 'COMMUNIMETRIC',
  can_release_confidential_info: false,
  state: {
    id: 0,
    under_six: false,
    domains: [
      {
        id: 0,
        code: '123',
        class: 'domain',
        items: [
          {
            above_six_id: '1',
            code: '1',
            confidential: false,
            confidential_by_default: false,
            rating: 1,
            rating_type: 'REGULAR',
            required: true,
            under_six_id: 'EC01',
          },
          {
            above_six_id: '2',
            code: 'SUBSTANCE_USE',
            confidential: false,
            confidential_by_default: false,
            rating: 1,
            rating_type: 'REGULAR',
            required: true,
            under_six_id: 'EC01',
          },
          {
            above_six_id: '2',
            code: 'SUBSTANCE_USE_CAREGIVER',
            confidential: false,
            confidential_by_default: false,
            rating: 1,
            rating_type: 'REGULAR',
            required: true,
            under_six_id: 'EC01',
          },
          {
            above_six_id: '2',
            code: 'EXPOSURE',
            confidential: false,
            confidential_by_default: false,
            rating: 1,
            rating_type: 'REGULAR',
            required: true,
            under_six_id: 'EC01',
          },
        ],
        underSix: false,
        aboveSix: false,
      },
    ],
  },
  event_date: '2018-06-11',
};

const domainItems = [
  {
    above_six_id: '2',
    code: 'EXPOSURE',
    confidential: true,
    confidential_by_default: true,
    rating: 1,
    rating_type: 'REGULAR',
    required: true,
    under_six_id: 'EC01',
  },
  {
    above_six_id: '2',
    code: 'SUBSTANCE_USE',
    confidential: true,
    confidential_by_default: true,
    rating: 1,
    rating_type: 'REGULAR',
    required: true,
    under_six_id: 'EC01',
  },
  {
    above_six_id: '2',
    code: 'SUBSTANCE_USE_CAREGIVER',
    confidential: true,
    confidential_by_default: true,
    rating: 1,
    rating_type: 'REGULAR',
    required: true,
    under_six_id: 'EC01',
  },
];

const updatedAssessment = {
  id: 1,
  instrument_id: 1,
  person: childInfoJson,
  assessment_type: 'INITIAL',
  status: 'IN_PROGRESS',
  completed_as: 'COMMUNIMETRIC',
  can_release_confidential_info: false,
  state: {
    id: 0,
    under_six: true,
    domains: [
      {
        id: 0,
        code: '456',
        underSix: false,
        aboveSix: true,
      },
      {
        id: 1,
        code: '780',
        underSix: false,
        aboveSix: true,
      },
    ],
  },
  event_date: '2018-06-11',
};

const instrument = {
  id: 1,
  prototype: {
    id: 0,
    under_six: false,
    domains: [
      {
        id: 0,
        code: 'string',
        underSix: false,
        aboveSix: false,
      },
    ],
  },
};

const i18n = {
  "10._description_" : "Child youth relationship",
  "10._rating_.1._description_" : "Identified need requires monitoring",
  "10._rating_.2._description_" : "Action or intervention is required",
  "10._rating_.3._description_" : "Problems are dangerous",
};

describe('<Assessment />', () => {
  describe('init Assessment', () => {
    describe('page layout', () => {
      const props = {
        location: { childId: 10 },
        match: { params: { id: undefined } },
      };
      const getWrapper = () => shallow(<Assessment {...props}/>);
      const getLength = component => getWrapper().find(component).length;

      it('renders with 1 <PageInfo /> component', () => {
        expect(getLength(PageInfo)).toBe(1);
      });

      it('renders with 1 <AssessmentFormHeader /> component', () => {
        expect(getLength(AssessmentFormHeader)).toBe(1);
      });

      it('renders with 1 <Typography /> component', () => {
        expect(getLength(Typography)).toBe(1);
      });

      it('renders with 1 <AssessmentFormFooter /> component', () => {
        expect(getLength(AssessmentFormFooter)).toBe(1);
      });
    });

    describe('assessment form with data', () => {
      it('renders with 1 <Domain /> component' , () => {
        const props = {
          location: { childId: 10 },
          match: { params: { id: undefined } },
        };
        const wrapper = shallow(<Assessment {...props}/>);
        wrapper.setState({assessment: assessment});
        expect(wrapper.find(Domain).length).toBe(1);
      });
    });

    describe('every assessment', () => {
      const personServiceFetchSpy = jest.spyOn(PersonService, 'fetch');

      beforeEach(() => {
        personServiceFetchSpy.mockClear();
      });

      it('will load client data', async () => {
        const props = {
          location: { childId: 10 },
          match: { params: { id: undefined } },
        };

        personServiceFetchSpy.mockReturnValue(Promise.resolve(childInfoJson));

        const wrapper = shallow(<Assessment {...props} />);
        await wrapper.instance().componentDidMount();

        expect(wrapper.instance().state.child.first_name).toBe('Test');
        expect(wrapper.instance().state.child.first_name).not.toBe('adam');
      });
    });

    describe('assessment form with no existing assessment', () => {
      const props = {
        location: { childId: 1 },
        match: { params: { id: undefined } },
      };

      it('calls fetchNewAssessment', () => {
        const assessmentServiceGetSpy = jest.spyOn(AssessmentService, 'fetchNewAssessment');
        const wrapper = shallow(<Assessment {...props} />);

        wrapper.instance().componentDidMount();
        expect(assessmentServiceGetSpy).toHaveBeenCalled();

        assessmentServiceGetSpy.mockClear()
      });

      it('sets a new assessment on component state', () => {
        const wrapper = shallow(<Assessment {...props} />);
        wrapper.setState({child:childInfoJson})

        expect(wrapper.state('assessment').instrument_id).toBeFalsy();
        wrapper.instance().onFetchNewAssessmentSuccess(instrument);
        expect(wrapper.state('assessment')).toEqual(initialAssessment);
      })
    });

    describe('assessment form with an existing assessment', () => {

      it('calls fetchAssessment', () => {
        const assessmentServiceGetSpy = jest.spyOn(AssessmentService, 'fetchNewAssessment');
        const props = {
          location: { childId: 1 },
          match: { params: { id: 1 } },
        };

        const wrapper = shallow(<Assessment {...props} />);

        wrapper.instance().componentDidMount();
        expect(assessmentServiceGetSpy).toHaveBeenCalled();

        assessmentServiceGetSpy.mockClear()
      });
    });

  });

  describe('save assessment', () => {
    describe('with a new assessment', () => {
      it('should call AssessmentService.postAssessment', () => {
        const assessmentServicePostSpy = jest.spyOn(AssessmentService, 'postAssessment');
        const props = {
          location: { childId: 1 },
          match: { params: { id: 1 } },
        };

        const wrapper = shallow(<Assessment {...props} />);
        wrapper.instance().handleSaveAssessment();

        assessmentServicePostSpy.mockReturnValue(Promise.resolve(assessment));
        expect(assessmentServicePostSpy).toHaveBeenCalled();

        assessmentServicePostSpy.mockClear();
      });
    });

    describe('with an existing assessment', () => {
      it('should call AssessmentService.update', () => {
        const assessmentServicePutSpy = jest.spyOn(AssessmentService, 'update');
        const props = {
          location: { childId: 1 },
          match: { params: { id: 1 } },
        };
        const wrapper = shallow(<Assessment {...props} />);

        assessmentServicePutSpy.mockReturnValue(Promise.resolve(assessment));

        wrapper.setState({assessment: {id:1}});
        wrapper.instance().handleSaveAssessment();

        expect(assessmentServicePutSpy).toHaveBeenCalled();

        assessmentServicePutSpy.mockClear();
      });

      it('should update state with assessment', async () => {
        const assessmentServicePutSpy = jest.spyOn(AssessmentService, 'update');
        const props = {
          location: { childId: 1 },
          match: { params: { id: 1 } },
        };
        const wrapper = shallow(<Assessment {...props} />);

        assessmentServicePutSpy.mockReturnValue(Promise.resolve(assessment));

        wrapper.setState({assessment: {id:1}});
        await wrapper.instance().handleSaveAssessment();

        expect(assessmentServicePutSpy).toHaveBeenCalled();
        expect(wrapper.state('assessment').id).toBe(1);
        expect(wrapper.state('assessment').state.domains).toBeTruthy();

        assessmentServicePutSpy.mockClear();
      });
    });
  });

  describe('handleHeaderFormValueChange', () => {
    it('will update event_date on the component state', () => {
      const props = {
        location: { childId: 1 },
        match: { params: { id: 1 } },
      };
      const wrapper = shallow(<Assessment {...props} />);

      wrapper.setState({assessment: assessment});
      expect(wrapper.state('assessment').event_date).toEqual('2018-06-11');
      wrapper.instance().handleHeaderFormValueChange('event_date', '2018-06-12');
      expect(wrapper.state('assessment').event_date).toEqual('2018-06-12');
    });

    it('will update completed_as on the component state', () => {
      const props = {
        location: { childId: 1 },
        match: { params: { id: 1 } },
      };
      const wrapper = shallow(<Assessment {...props} />);

      wrapper.setState({assessment: assessment});
      expect(wrapper.state('assessment').completed_as).toEqual('COMMUNIMETRIC');
      wrapper.instance().handleHeaderFormValueChange('completed_as', 'Social Worker');
      expect(wrapper.state('assessment').completed_as).toEqual('Social Worker');
    });

    it('will update can_release_confidential_info on the component state', () => {
      const props = {
        location: { childId: 1 },
        match: { params: { id: 1 } },
      };
      const wrapper = shallow(<Assessment {...props} />);

      wrapper.setState({assessment: assessment});
      expect(wrapper.state('assessment').can_release_confidential_info).toEqual(false);
      wrapper.instance().handleHeaderFormValueChange('can_release_confidential_info', true);
      expect(wrapper.state('assessment').can_release_confidential_info).toEqual(true);
    });
  });

  describe('updateItem', () => {
    it('will update an assessment domain item on the component state', () => {
      const props = {
        location: { childId: 1 },
        match: { params: { id: 1 } },
      };
      const wrapper = shallow(<Assessment {...props} />);

      wrapper.setState({assessment: assessment});
      expect(wrapper.state('assessment').state.domains[0].items[0].rating).toEqual(1);
      wrapper.instance().updateItem('1', 'rating', 2);
      expect(wrapper.state('assessment').state.domains[0].items[0].rating).toEqual(2);
    });
  });

  describe('update assessment', () => {
    describe('is passed updated data', () => {
      it('will update the assessment on the component state', () => {
        const props = {
          location: { childId: 1 },
          match: { params: { id: 1 } },
        };
        const wrapper = shallow(<Assessment {...props} />);

        wrapper.setState({assessment: assessment});
        expect(wrapper.state('assessment')).toEqual(assessment);
        wrapper.instance().updateAssessment(updatedAssessment);
        expect(wrapper.state('assessment')).toEqual(updatedAssessment);
      });
    });
  });

  describe('initial save', () => {
    it('will update the assessment on the component state', () => {
      const props = {
        location: { childId: 1 },
        match: { params: { id: 1 } },
        history: { push: jest.fn() },
      };
      const wrapper = shallow(<Assessment {...props} />);

      wrapper.setState({ assessment: assessment });
      expect(wrapper.state('assessment')).toEqual(assessment);
      wrapper.instance().initialSave(updatedAssessment);
      expect(wrapper.state('assessment')).toEqual(updatedAssessment);
    });

    it('will update the url with the assessment id', () => {
      const props = {
        location: { childId: 1 },
        match: { params: { id: 1 } },
      };

      const historyPushMock = {push: jest.fn()}
      const wrapper = shallow(<Assessment {...props} history={historyPushMock}/>);

      wrapper.setState({child: childInfoJson});
      wrapper.instance().initialSave(updatedAssessment);

      expect(historyPushMock.push).toHaveBeenCalled();
      expect(historyPushMock.push).toHaveBeenCalledWith('/clients/10/assessments/1');

      historyPushMock.push.mockClear();
    });
  });

  describe('toggleUnderSix', () => {
    it('will set under six to its opposite', () => {
      const props = {
        location: { childId: 1 },
        match: { params: { id: 1 } },
      };
      const wrapper = shallow(<Assessment {...props} />);

      wrapper.setState({ assessment: {state:{under_six:true}} });
      expect(wrapper.state('assessment').state.under_six).toEqual(true);
      wrapper.instance().toggleUnderSix();
      expect(wrapper.state('assessment').state.under_six).toEqual(false);
    });
  });

  describe('renderDomains', () => {
    it('will render Domain', () => {
      const props = {
        location: { childId: 1 },
        match: { params: { id: 1 } },
      };
      const wrapper = shallow(<Assessment {...props} />);

      wrapper.setState({ assessment: assessment, i18n: i18n});
      wrapper.instance().renderDomains(assessment.state.domains);
      expect(wrapper.find(Domain).length).toBe(1);
    });

    it('will render DomainGroup', () => {
      const props = {
        location: { childId: 1 },
        match: { params: { id: 1 } },
      };
      const wrapper = shallow(<Assessment {...props} />);

      wrapper.setState({ assessment: initialAssessment, i18n: i18n});
      wrapper.instance().renderDomains(assessment.state.domains);
      expect(wrapper.find(DomainsGroup).length).toBe(1);
    });
  });

  describe('setSubstanceAbuseItemsConfidential', () => {
    it ('sets confidential to true for all substance abuse items when canReleaseInfo is false', () => {
        const wrapper = shallow(<Assessment match={ {params: { id: 1 }}}/>);

        wrapper.setState({ assessment: assessment});
        wrapper.instance().handleHeaderFormValueChange('can_release_confidential_info', false);
        expect(wrapper.state('assessment').state.domains[0].items[0].confidential).toBe(false);
        expect(wrapper.state('assessment').state.domains[0].items[1].confidential).toBe(true);
        expect(wrapper.state('assessment').state.domains[0].items[2].confidential).toBe(true);
        expect(wrapper.state('assessment').state.domains[0].items[3].confidential).toBe(true);
      });
  });
});
