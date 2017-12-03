import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CommentForm from '../../app/components/CommentForm';

function setup() {
  const props = {
    description: '',
    isPosting: false,
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    handleReset: jest.fn()
  };

  const enzymeWrapper = shallow(<CommentForm {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('CommentForm', () => {
  it('should render self with no value', () => {
    const { enzymeWrapper } = setup();
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should render self with value', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      description: 'Great video!'
    });
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should call handleChange', () => {
    const { props, enzymeWrapper } = setup();
    const textarea = enzymeWrapper.find('.textarea');

    textarea.simulate('change');

    expect(props.handleChange).toBeCalled();
  });

  it('should call handleReset', () => {
    const { props, enzymeWrapper } = setup();
    const cancelBtn = enzymeWrapper.find('.cancelBtn');

    cancelBtn.simulate('click');

    expect(props.handleReset).toBeCalled();
  });
});
