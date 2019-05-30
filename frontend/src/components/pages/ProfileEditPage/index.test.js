import React from 'react'
import { shallow } from 'enzyme'
import ProfileEditPage from '.'

it('renders with logged in user', () => {
  shallow(<ProfileEditPage user={{
    loggedIn: true,
    username: 'a',
  }} profile={{name: 'b', major: 'c'}} tutor={{}} getProfile={()=>{}}/>);
});
