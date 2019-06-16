import React from 'react'
import { shallow } from 'enzyme'
import ProfileEditPage from '.'
import SearchLecture from '../../atoms/SearchLecture'

it('renders and all callbacks work', () => {
  const wrapper = shallow(<ProfileEditPage user={{
    loggedIn: true,
    username: 'a',
    id: 1,
  }} profile={{id: 2, name: 'b', major: 'c'}} tutor={{times: {id: 0}, bio: 'x', exp: 'y', lectures: [{id: 1, prof: 'p', title: 't'}]}} putTutor={()=>{}} getProfile={()=>{}} putProfile={()=>{}}/>);
  wrapper.setProps({profile: {id: 2, name: 'b', major: 'd'}});
  wrapper.setProps({profile: {id: 1, name: 'b', major: 'd'}});
  wrapper.instance().handleTimesChange(0);
  wrapper.find('#profileedit-name').simulate('change', {
    target: {
      name: 'name',
      value: 'hi',
    },
  });
  wrapper.find('SearchLecture').prop('acceptLecture')(1);
  wrapper.find('.form').simulate('submit', {
    preventDefault: () => {},
  });
  wrapper.find('#profileedit-name').simulate('change', {
    target: {
      name: 'name',
      value: '',
    },
  });
  wrapper.find('#profileedit-major').simulate('change', {
    target: {
      name: 'major',
      value: '',
    },
  });
  wrapper.find('#profileedit-exp').simulate('change', {
    target: {
      name: 'exp',
      value: '',
    },
  });
  wrapper.find('#profileedit-bio').simulate('change', {
    target: {
      name: 'bio',
      value: '',
    },
  });
  wrapper.find('.form').simulate('submit', {
    preventDefault: () => {},
  });
  wrapper.find('button').forEach((node, index)=>node.simulate('click'));
});
