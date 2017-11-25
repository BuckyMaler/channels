import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CommentList from '../../app/components/CommentList';

function setup() {
  const props = {
    comments: []
  };

  const enzymeWrapper = shallow(<CommentList {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('CommentList', () => {
  it('should render self with comments', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({
      comments: [
        {
          id: 'z12ddf2arwvtvdk0s23iztxx5szwzppfj',
          author: 'Miron Swyst',
          avatar: 'https://yt3.ggpht.com/photo.jpg',
          description: 'background sound , ok , but a bit too interfering to ears* ...',
          publishedAt: 'a year ago'
        },
        {
          id: 'z12exdqh2tifxzexi04ch1kbaqm0sf25ao00k',
          author: 'gabo2212',
          avatar: 'https://yt3.ggpht.com/photo.jpg',
          description: 'Please no music on the background :(',
          publishedAt: 'a year ago'
        }
      ]
    });
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });

  it('should render self with no comments', () => {
    const { enzymeWrapper } = setup();
    const tree = toJson(enzymeWrapper);

    expect(tree).toMatchSnapshot();
  });
});
