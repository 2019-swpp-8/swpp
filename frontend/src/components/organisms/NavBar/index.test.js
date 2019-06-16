import React from 'react'
import { shallow } from 'enzyme'
import NavBar from '.'

it('renders with logged out user', () => {
  shallow(<NavBar user={{loggedIn: false}} />);
});

it('renders with logged in user', () => {
  shallow(<NavBar user={{
    loggedIn: true,
    username: 'a',
    name: 'b',
  }}/>);
});
