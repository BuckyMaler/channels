import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SelectChannel from '../../app/components/SelectChannel';

function setup() {
  const props = {
    toggleChannelList: jest.fn()
  };

  const enzymeWrapper = shallow(<SelectChannel {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('SelectChannel', () => {
  it('should render self', () => {
    const { enzymeWrapper } = setup();
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should call toggleChannelList', () => {
    const { props, enzymeWrapper } = setup();
    const select = enzymeWrapper.find('.select');

    select.simulate('click');

    expect(props.toggleChannelList).toBeCalled();
  });
});
