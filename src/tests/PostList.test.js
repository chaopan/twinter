import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import React from 'react'
import PostList from '../components/PostList'
import {shallow, mount} from 'enzyme'
const mockData = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  }
]
describe('PostList Component', () => {
  it('renders without crashing', () => {
    shallow(<PostList 
      posts={[]}
      hasMore={false}
      getFailed={false}
      //actions
      loadMore={jest.fn()}
      handleSuccess={jest.fn()}
      handleFailure={jest.fn()}
    />);
  });

  it('renders mock data', () => {
    let wrapper = mount(<PostList
      posts={mockData}
      hasMore={false}
      getFailed={false}
      //actions
      loadMore={jest.fn()}
      handleSuccess={jest.fn()}
      handleFailure={jest.fn()}
    />);

    expect(wrapper.find('.post .post-user').first().text()).toEqual("1");
    expect(wrapper.find('.post .post-title').first().text()).toEqual(mockData[0].title);
    expect(wrapper.find('.post .post-body').first().text()).toEqual(mockData[0].body);
  });
})
