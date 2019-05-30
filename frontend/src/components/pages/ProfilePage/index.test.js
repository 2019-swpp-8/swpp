import React from 'react'
import { shallow } from 'enzyme'
import ProfilePage from '.'

it("renders user's own profile", () => {
  const wrapper = shallow(<ProfilePage.WrappedComponent user={{
    loggedIn: true,
    username: 'a',
    id: 1,
  }}
  match={{params: {id: 1}}}
  profile={{id: 1, name: 'b', major: 'c'}}
  tutor={{bio:'d', exp:'e'}} getProfile={()=>{}}/>);
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
  tutor={{bio:'d', exp:'e'}} getProfile={()=>{}}/>);
  wrapper.setProps({match: {params: {id: 3}}});
});
