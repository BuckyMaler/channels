import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Home from '../../app/components/Home';

jest.mock('../../app/containers/LeftColumn', () => 'LeftColumn');
jest.mock('../../app/containers/RightColumn', () => 'RightColumn');

function setup() {
  const props = {
    token: '',
    isFetching: false,
    error: false,
    fetchAccessToken: jest.fn()
  };

  const enzymeWrapper = shallow(<Home {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Home', () => {
  it('should render self with loader', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      isFetching: true
    });
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should render self with error message', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      error: true
    });
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should render self with content', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      token: 'ya29.GlyrBCJQJoIYFzocIunVN-CfjQZMG4oyVuAB6v_x_Z3FRnViyPy_deqRdwSAipQtKc9Nb2RudM9UISwI8SGNXxsJ1t3QHddeCdnoCjsM_vhLa9FlFVqMN_seI7oljg'
    });
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should call fetchAccessToken and setInterval on componentDidMount', () => {
    const spy = jest.spyOn(Home.prototype, 'componentDidMount');
    const { props } = setup();
    const enzymeWrapper = mount(<Home {...props} />);

    expect(spy).toBeCalled();
    expect(enzymeWrapper.instance().intervalId).toBeDefined();
  });
});
