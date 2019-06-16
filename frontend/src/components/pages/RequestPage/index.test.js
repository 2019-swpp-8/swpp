import React from 'react'
import { shallow } from 'enzyme'
import RequestPage from '.'

it('renders and all callbacks work', () => {
  const wrapper = shallow(<RequestPage user={{
    loggedIn: true,
    username: 'a',
    id: 1,
  }}
  match={{params: {id: 2}}}
  profile={{id: 3}} tutor={{id: 4}}
  getProfile={()=>{}} getTutor={()=>{}}
  postRequest={()=>{}}/>);
  wrapper.setProps({profile: {id: 3}});
  wrapper.setProps({tutor: {id: 4}});
  wrapper.setProps({profile: {id: 1}});
  wrapper.setProps({tutor: {id: 2}});
  wrapper.instance().handleTimesChange(0);
  wrapper.find('#request-detail').simulate('change', {
    target: {
      name: 'detail',
      value: '',
    },
  });
  wrapper.find('#request-payment').simulate('change', {
    target: {
      name: 'payment',
      value: '',
    },
  });
  wrapper.find('.form').simulate('submit', {
    preventDefault: () => {},
  });
});
