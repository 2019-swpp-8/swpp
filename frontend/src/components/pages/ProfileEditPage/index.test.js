import React from 'react'
import { shallow } from 'enzyme'
import ProfileEditPage from '.'

it('renders and all callbacks work', () => {
  const wrapper = shallow(<ProfileEditPage user={{
    loggedIn: true,
    username: 'a',
    id: 1,
  }} profile={{id: 2, name: 'b', major: 'c'}} tutor={{}} getProfile={()=>{}} putProfile={()=>{}}/>);
  wrapper.setProps({profile: {id: 2, name: 'b', major: 'd'}});
  wrapper.setProps({profile: {id: 1, name: 'b', major: 'd'}});
  wrapper.find('#profileedit-name').simulate('change', {
    target: {
      name: 'name',
      value: 'hi',
    },
  });
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
  wrapper.find('.form').simulate('submit', {
    preventDefault: () => {},
  });
});
