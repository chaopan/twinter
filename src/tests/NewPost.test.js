import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
// Game/game.test.js
import React from 'react'
import NewPost from '../components/NewPost'
import { POST_NONE, POST_SUCCEEDED, POST_ERRORED, POST_PENDING } from '../components/App'
import {shallow, mount} from 'enzyme'

describe('NewPost Component', () => {
  it('renders without crashing', () => {
    shallow(<NewPost 
      name=""
      title=""
      body=""
      submitStatus={0}
      //actions
      titleChanged={jest.fn()}
      bodyChanged={jest.fn()}
      nameChanged={jest.fn()}
      postSucceeded={jest.fn()}
      postFailed={jest.fn()}
      handleSubmit={jest.fn()}
      clearMessage={jest.fn()}
    />);
  })
  
  it('does call handleSubmit on correct inputs', () => {
    const handleSubmit = jest.genMockFn();
    let wrapper = mount(<NewPost
      name="valid_name"
      title="valid_title"
      body="valid_body 12345678910"
      submitStatus={0}
      //actions
      titleChanged={jest.fn()}
      bodyChanged={jest.fn()}
      nameChanged={jest.fn()}
      postSucceeded={jest.fn()}
      postFailed={jest.fn()}
      handleSubmit={handleSubmit}
      clearMessage={jest.fn()}
    />);
    //click shouldn't submit when 
    //wrapper.find('button.form-submit').first().simulate('click');
    expect(handleSubmit).not.toBeCalled();
    wrapper.find('button.form-submit').first().simulate('click');
    expect(handleSubmit).toBeCalled();
  });
  
  it("doesn't call handleSubmit on incorrect inputs", () => {
    const handleSubmit = jest.genMockFn();
    let wrapper = mount(<NewPost
      name=""
      title=""
      body="asdf"
      submitStatus={0}
      //actions
      titleChanged={jest.fn()}
      bodyChanged={jest.fn()}
      nameChanged={jest.fn()}
      postSucceeded={jest.fn()}
      postFailed={jest.fn()}
      handleSubmit={handleSubmit}
      clearMessage={jest.fn()}
    />);
    wrapper.find('button.form-submit').first().simulate('click');
    expect(handleSubmit).not.toBeCalled();
  });  
});

