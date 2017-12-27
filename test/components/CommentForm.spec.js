import { mount } from 'enzyme';
import React from 'react';
import CommentForm from '../../app/components/CommentForm';

function setup() {
  const props = {
    description: '',
    isPosting: false,
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    handleReset: jest.fn()
  };

  const enzymeWrapper = mount(<CommentForm {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('CommentForm', () => {
  /* eslint-disable no-unused-expressions */
  describe('buttons', () => {
    it('should be disabled', () => {
      const { props, enzymeWrapper } = setup();
      const submitBtn = enzymeWrapper.find('.submitBtn');
      const cancelBtn = enzymeWrapper.find('.cancelBtn');

      cancelBtn.simulate('click');

      expect(submitBtn).toBeDisabled;
      expect(cancelBtn).toBeDisabled;
      expect(props.handleReset).not.toHaveBeenCalled();

      enzymeWrapper.setProps({
        description: 'description',
        isPosting: true
      });

      cancelBtn.simulate('click');

      expect(submitBtn).toBeDisabled;
      expect(cancelBtn).toBeDisabled;
      expect(props.handleReset).not.toHaveBeenCalled();
    });

    it('should not be disabled', () => {
      const { props, enzymeWrapper } = setup();
      const submitBtn = enzymeWrapper.find('.submitBtn');
      const cancelBtn = enzymeWrapper.find('.cancelBtn');

      enzymeWrapper.setProps({ description: 'description' });
      cancelBtn.simulate('click');

      expect(submitBtn).not.toBeDisabled;
      expect(cancelBtn).not.toBeDisabled;
      expect(props.handleReset).toHaveBeenCalled();
    });
  });
  /* eslint-enable no-unused-expressions */
});
