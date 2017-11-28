import React from 'react';
import { shallow } from 'enzyme';
import Comments from '../../app/components/Comments';

function setup() {
  const props = {
    activeVideo: {},
    comments: [],
    isFetching: false,
    error: false,
    pageToken: '',
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
  it('should call fetchComments on activeVideo id change', () => {
    const { props, enzymeWrapper } = setup();

    expect(props.fetchComments).toHaveBeenCalledTimes(0);

    enzymeWrapper.setProps({
      activeVideo: {
        id: 'XsFQEUP1MxI'
      }
    });

    expect(props.fetchComments).toHaveBeenCalledTimes(1);

    enzymeWrapper.setProps({
      activeVideo: {
        id: 'Eu35xM76kKY'
      }
    });

    expect(props.fetchComments).toHaveBeenCalledTimes(2);

    enzymeWrapper.setProps({
      activeVideo: {
        id: 'Eu35xM76kKY'
      }
    });

    expect(props.fetchComments).toHaveBeenCalledTimes(2);
  });

  it('should handle change', () => {
    const { enzymeWrapper } = setup();
    const mockEvent = {
      target: {
        value: 'Great video!'
      }
    };

    expect(enzymeWrapper.state('description')).toEqual('');

    enzymeWrapper.instance().handleChange(mockEvent);

    expect(enzymeWrapper.state('description')).toEqual('Great video!');
  });

  it('should handle reset', () => {
    const { enzymeWrapper } = setup();

    enzymeWrapper.setState({ description: 'Great video!' });

    expect(enzymeWrapper.state('description')).toEqual('Great video!');

    enzymeWrapper.instance().handleReset();

    expect(enzymeWrapper.state('description')).toEqual('');
  });
});
