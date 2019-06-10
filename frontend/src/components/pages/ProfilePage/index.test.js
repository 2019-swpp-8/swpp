import React from 'react'
import { shallow } from 'enzyme'
import ProfilePage from '.'
import RequestRow from '../../atoms/RequestRow'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

it("renders user's own profile", () => {
  const wrapper = shallow(<ProfilePage.WrappedComponent user={{
    loggedIn: true,
    username: 'a',
    id: 1,
  }}
  match={{params: {id: 1}}}
  profile={{id: 1, name: 'b', major: 'c'}}
  tutor={{bio:'d', exp:'e'}} requestlist={{
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
  }}
  getProfile={()=>{}} getRequestList={()=>{}}
  deleteRequest={()=>{}} changeRequestStatus={()=>{}}/>);

  wrapper.setProps({match: {params: {id: 1, n: 1}}});
});

it("renders others' profiles", () => {
  const wrapper = shallow(<ProfilePage.WrappedComponent user={{
    loggedIn: true,
    username: 'a',
    id: 1,
  }}
  match={{params: {id: 1}}}
  profile={{id: 2, name: 'b', major: 'c'}}
  tutor={{bio:'d', exp:'e'}} requestlist={{}}
  getProfile={()=>{}} getRequestList={()=>{}}
  deleteRequest={()=>{}} changeRequestStatus={()=>{}}/>);
  wrapper.setProps({match: {params: {id: 3}}});
});
