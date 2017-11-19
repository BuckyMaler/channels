import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SearchBar from '../../app/components/SearchBar';

function setup() {
  const props = {
    disabled: false,
    placeholder: 'Search DevTips',
    value: '',
    handleChange: jest.fn(),
    handleReset: jest.fn()
  };

  const enzymeWrapper = shallow(<SearchBar {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('SearchBar', () => {
  describe('when disabled', () => {
    it('should render self', () => {
      const { enzymeWrapper } = setup();
      enzymeWrapper.setProps({
        disabled: true,
        placeholder: 'The Mac App For YouTube Channels.'
      });
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });
  });

  describe('when enabled', () => {
    it('should render self with no value', () => {
      const { enzymeWrapper } = setup();
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });

    it('should render self with value', () => {
      const { enzymeWrapper } = setup();
      enzymeWrapper.setProps({
        value: 'Sass'
      });
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });
  });

  it('should call handleChange', () => {
    const { props, enzymeWrapper } = setup();
    const searchInput = enzymeWrapper.find('.searchInput');

    searchInput.simulate('change');

    expect(props.handleChange).toBeCalled();
  });

  it('should call handleReset', () => {
    const { props, enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      value: 'Sass'
    });
    const resetBtn = enzymeWrapper.find('.resetBtn');

    resetBtn.simulate('click');

    expect(props.handleReset).toBeCalled();
  });
});
