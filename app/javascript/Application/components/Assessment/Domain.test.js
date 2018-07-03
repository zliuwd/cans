import React from 'react';
import { shallow } from 'enzyme';
import Domain from './Domain';

const domain = {
  id: '1',
  class: 'domain',
  code: 'BEHEMO',
  under_six: true,
  above_six: false,
  items: [
    {
      under_six_id: '',
      above_six_id: '1',
      code: '1',
      required: true,
      confidential: false,
      rating_type: 'REGULAR',
      rating: -1,
    },
  ],
};

const i18n = {
  _title_: 'Title',
  _description_: 'Description',
};

const domainComponent = (
  <Domain
    key={'1'}
    domain={{ ...domain }}
    assessmentUnderSix={true}
    i18n={{ ...i18n }}
    i18nAll={{ a: 'b' }}
    onRatingUpdate={() => {}}
    onConfidentialityUpdate={() => {}}
  />
);

describe('<Domain />', () => {
  it('renders', () => {
    expect(() => shallow(domainComponent)).not.toThrow();
  });
});
