import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Home from '../../app/components/Home';

jest.mock('../../app/containers/LeftColumn', () => 'LeftColumn');

function setup() {
  const props = {
    token: '',
    isFetching: false,
    error: false,
    fetchAccessToken: jest.fn(),
    fetchChannels: jest.fn()
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

  it('should call fetchChannels when token is first received', () => {
    const { props, enzymeWrapper } = setup();

    expect(props.fetchChannels).toHaveBeenCalledTimes(0);

    enzymeWrapper.setProps({
      token: 'ya29.GlyrBCJQJoIYFzocIunVN-CfjQZMG4oyVuAB6v_x_Z3FRnViyPy_deqRdwSAipQtKc9Nb2RudM9UISwI8SGNXxsJ1t3QHddeCdnoCjsM_vhLa9FlFVqMN_seI7oljg'
    });

    expect(props.fetchChannels).toHaveBeenCalledTimes(1);

    enzymeWrapper.setProps({
      token: 'ya29.GlznBHuaWOOrsCY8MtkBg0iRr5DCuxQ9lpZ2meAMTCykg7fl-5cocGka4LpmUU-xhzisbrH7uj4e8hZrJZL-x3iEgur5ek8D-uRgc9XtjaNad9CIIu5bDnLA7d_8Ow'
    });

    expect(props.fetchChannels).toHaveBeenCalledTimes(1);
  });
});
