import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ErrorState from '../../app/components/core/ErrorState';

function setup(optionalProps = {}) {
  const props = {
    message: 'Error requesting channels.',
    color: 'black',
    ...optionalProps
  };

  const enzymeWrapper = shallow(<ErrorState {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('ErrorState', () => {
  describe('without retry', () => {
    it('should render self', () => {
      const { enzymeWrapper } = setup();
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });
  });

  describe('with retry', () => {

    const optionalProps = {
      retry: jest.fn()
    };

    it('should render self', () => {
      const { enzymeWrapper } = setup(optionalProps);
      const tree = toJson(enzymeWrapper);

      expect(tree).toMatchSnapshot();
    });

    it('should call retry', () => {
      const { enzymeWrapper } = setup(optionalProps);
      const retry = enzymeWrapper.find('.retry');

      retry.simulate('click');

      expect(optionalProps.retry).toBeCalled();
    });
  });
});
