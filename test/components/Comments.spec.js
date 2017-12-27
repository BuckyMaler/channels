import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Comments from '../../app/components/Comments';

function setup() {
  const props = {
    comments: [],
    pageToken: '',
    isFetching: false,
    error: false,
    activeVideoId: '',
    fetchComments: jest.fn(),
    postComment: jest.fn()
  };

  const enzymeWrapper = shallow(<Comments {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Comments', () => {
  it('should render self with loader', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({ isFetching: true });
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should render self with error', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({ error: true });
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should render self and child components', () => {
    const { enzymeWrapper } = setup();
    let tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();

    enzymeWrapper.setProps({
      pageToken: 'token',
      isFetching: true
    });
    tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should call fetchComments twice', () => {
    const { props, enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      activeVideoId: '1'
    });

    enzymeWrapper.setProps({
      activeVideoId: '1'
    });

    expect(props.fetchComments).toHaveBeenCalledTimes(2);
  });

  it('should call postComment', () => {
    const { props, enzymeWrapper } = setup();

    props.postComment.mockReturnValue(Promise.resolve());
    enzymeWrapper.setState({ description: 'description' });
    enzymeWrapper.instance().handleSubmit({
      preventDefault: () => undefined
    });

    expect(props.postComment).toHaveBeenLastCalledWith('description');
  });
});
