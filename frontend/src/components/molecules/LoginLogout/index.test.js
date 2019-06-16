import React from 'react'
import { shallow } from 'enzyme'
import LoginLogout from '.'

it('renders with logged out user', () => {
  shallow(<LoginLogout user={{loggedIn: false}} />);
});

it('renders with logged in user', () => {
  shallow(<LoginLogout user={{
    loggedIn: true,
    username: 'a',
    name: 'b',
  }}/>);
});
