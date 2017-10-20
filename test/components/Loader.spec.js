import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loader from '../../app/components/core/Loader';

describe('Loader', () => {
  it('should render self', () => {
    const enzymeWrapper = shallow(<Loader />);
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });
});
