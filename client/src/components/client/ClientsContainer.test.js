import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ClientsContainer from './ClientsContainer';

// jest.mock('./person.service');
// const PersonService = require('./person.service').default;

describe('<ClientsContainer />', () => {
  it('renders', () => {
    // PersonService.fetchAllClients.mockReturnValue(Promise.resolve({}));
    const render1 = render(<ClientsContainer />);
    // expect(render1).not.toThrow();
  });

  // it('has a Header', () => {
  //   const wrapper = shallow(<DashboardContainer />);
  //   expect(wrapper.find('Header').length).toBe(1);
  // });
  //
  // it('has a Page Header', () => {
  //   const wrapper = shallow(<DashboardContainer />);
  //   expect(wrapper.find('PageHeader').length).toBe(1);
  // });
  //
  // describe('renders referrals and cases tables', () => {
  //   it('constructs the cardHeaderText', () => {
  //     FeatureService.fetch.mockReturnValue(Promise.resolve({}));
  //     AccountService.fetchCurrent.mockReturnValue(
  //       Promise.resolve({ staff_id: 'id' })
  //     );
  //     ReferralService.fetch.mockReturnValue(Promise.resolve([]));
  //     CaseService.fetch.mockReturnValue(Promise.resolve([]));
  //     const wrapper = mount(<DashboardContainer />);
  //
  //     setImmediate(() => {
  //       expect(
  //         wrapper
  //           .update()
  //           .find('DataGridCard')
  //           .map($el => $el.prop('cardHeaderText'))
  //       ).toEqual(['Referrals (0)', 'Cases (0)']);
  //     });
  //   });
  // });
  //
  // describe('feature flag', () => {
  //   describe('state is updated when features are fetched', () => {
  //     AccountService.fetchCurrent.mockReturnValue(Promise.resolve({}));
  //
  //     it('fetches all flags as true', async () => {
  //       FeatureService.fetch.mockReturnValue(
  //         Promise.resolve({
  //           dashboard_placement_tool: true,
  //           dashboard_case_actions: true,
  //         })
  //       );
  //       const wrapper = await shallow(<DashboardContainer />);
  //       const state = wrapper.state();
  //       expect(state.isPlacementToolShown).toBe(true);
  //       expect(state.isActionsColumnShown).toBe(true);
  //     });
  //
  //     it('fetches empty flags map', async () => {
  //       FeatureService.fetch.mockReturnValue(Promise.resolve({}));
  //       const wrapper = await shallow(<DashboardContainer />);
  //       await wrapper.update();
  //       const state = wrapper.state();
  //       expect(state.features.XHRStatus).toBe('ready');
  //       expect(state.isPlacementToolShown).toBe(false);
  //       expect(state.isActionsColumnShown).toBe(false);
  //     });
  //
  //     it('falls back to default values when could not fetch flags', async () => {
  //       FeatureService.fetch.mockReturnValue(Promise.reject(new Error('e')));
  //       const wrapper = await shallow(<DashboardContainer />);
  //       await wrapper.update();
  //       const state = wrapper.state();
  //       expect(state.features.XHRStatus).toBe('error');
  //       expect(state.isPlacementToolShown).toBe(false);
  //       expect(state.isActionsColumnShown).toBe(false);
  //     });
  //   });
  //
  //   describe('dashboard_placement_tool', () => {
  //     AccountService.fetchCurrent.mockReturnValue(
  //       Promise.resolve({ staff_id: 'id' })
  //     );
  //
  //     it('shows Find Placement Tool link when flag is on', async () => {
  //       FeatureService.fetch.mockReturnValue(
  //         Promise.resolve({
  //           dashboard_placement_tool: true,
  //         })
  //       );
  //       const wrapper = await mount(<DashboardContainer />);
  //       expect(
  //         wrapper
  //           .update()
  //           .find({ href: '/placement/index' })
  //           .exists()
  //       ).toBe(true);
  //     });
  //
  //     it("doesn't show Find Placement Tool when flag is off", async () => {
  //       FeatureService.fetch.mockReturnValue(Promise.resolve({}));
  //       const wrapper = await mount(<DashboardContainer />);
  //       expect(
  //         wrapper
  //           .update()
  //           .find({ href: '/placement/index' })
  //           .exists()
  //       ).toBe(false);
  //     });
  //   });
  // });
});
