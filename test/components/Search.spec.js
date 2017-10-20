import React from 'react';
import { shallow } from 'enzyme';
import Search from '../../app/components/Search';

function setup() {
  const props = {
    activeChannel: undefined,
    query: '',
    results: [],
    isFetching: false,
    error: false,
    pageToken: '',
    fetchSearch: jest.fn(),
    updateSearch: jest.fn(),
    clearSearch: jest.fn()
  };

  const enzymeWrapper = shallow(<Search {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Search', () => {
  it('should handle change', () => {
    const { props, enzymeWrapper } = setup();
    const mockEvent = {
      target: {
        value: ''
      }
    };

    enzymeWrapper.instance().handleChange(mockEvent);

    expect(props.clearSearch).toHaveBeenCalledTimes(1);
    expect(props.updateSearch).toHaveBeenCalledTimes(0);
    expect(props.fetchSearch).toHaveBeenCalledTimes(1);

    mockEvent.target.value = 'react';

    enzymeWrapper.instance().handleChange(mockEvent);

    expect(props.clearSearch).toHaveBeenCalledTimes(1);
    expect(props.updateSearch).toHaveBeenCalledTimes(1);
    expect(props.updateSearch).toBeCalledWith('react');
    expect(props.fetchSearch).toHaveBeenCalledTimes(2);
  });

  it('should handle submit', () => {
    const { props, enzymeWrapper } = setup();
    const mockEvent = {
      preventDefault() {}
    };

    enzymeWrapper.instance().handleSubmit(mockEvent);

    expect(props.fetchSearch).toBeCalled();
  });

  it('should handle reset', () => {
    const { props, enzymeWrapper } = setup();

    enzymeWrapper.instance().handleReset();

    expect(props.clearSearch).toBeCalled();
  });
});
