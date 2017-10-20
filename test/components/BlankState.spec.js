import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BlankState from '../../app/components/core/BlankState';

describe('BlankState', () => {
  it('should render self', () => {
    const enzymeWrapper = shallow(
      <BlankState message={'No channels found.'} />
    );
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });
});
