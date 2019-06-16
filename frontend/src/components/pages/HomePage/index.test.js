// https://github.com/diegohaz/arc/wiki/Testing-components
import React from 'react'
import { shallow } from 'enzyme'
import HomePage from '.'

it('renders', () => {
  const wrapper = shallow(<HomePage user={{
    loggedIn: true,
    username: 'a',
    id: 2,
  }}
  match={{params: {id: 1}}}
  profile={{id: 1, name: 'b', major: 'c', contact: '010-1234-5678'}}
  tutor={{bio:'d', exp:'e'}}
  getProfile={()=>{}} getRequestList={()=>{}}
  deleteRequest={()=>{}} changeRequestStatus={()=>{}} requestlist={{
    tutor_request: [{
      id: 1,
      tutor: {
        profile: 1,
      },
      tutee: {
        user: 2,
      },
      lecture: {
        prof: "pro",
        title: "tit",
      },
      detail: "det",
      payment: "pay",
      status: 0,
    }], tutee_request: [{
      id: 1,
      tutor: {
        profile: 2,
      },
      tutee: {
        user: 1,
      },
      lecture: {
        prof: "pro",
        title: "tit",
      },
      detail: "det",
      payment: "pay",
      status: 0,
    }]
  }}/>);

  wrapper.setProps({user: {
    loggedIn: true,
    username: 'a',
    id: 3,
  }});
});
