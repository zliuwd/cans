import React from 'react';
import { shallow } from 'enzyme';
import DomainProgressBar from './DomainProgressBar';

const domain = {
  items: [
    {
      required: true,
      rating: -1,
    },
    {
      above_six_id: '2',
      required: true,
      rating: 1,
    },
    {
      above_six_id: '3',
      required: true,
      rating: -1,
    },
  ],
};

describe('<DomainProgressBar />', () => {
  it('should render the progress bar', () => {
    const wrapper = shallow(<DomainProgressBar isAssessmentUnderSix={false} domain={domain} />);
    expect(wrapper.find('.progress-bar').length).toBe(1);
    const progress = wrapper.find('.progress');
    expect(progress.length).toBe(1);
    expect(progress.get(0).props.style['width']).toBe('50%');
  });
});
