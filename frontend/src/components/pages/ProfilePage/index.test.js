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
  profile={{id: 1, name: 'b', major: 'c', contact: '010-1234-5678'}}
  tutor={{bio:'d', exp:'e'}} 
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
  profile={{id: 2, name: 'b', major: 'c', contact: '010-1234-5678'}}
  tutor={{bio:'d', exp:'e', lectures: [{id: 1, prof: "p", title: "t"}]}} requestlist={{}}
  getProfile={()=>{}} getRequestList={()=>{}}
  deleteRequest={()=>{}} changeRequestStatus={()=>{}}/>);
  wrapper.setProps({match: {params: {id: 3}}});
});
