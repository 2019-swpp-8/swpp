import React from 'react'
import { shallow } from 'enzyme'
import TutorRow from '.'

it('renders with proper tutor prop', () => {
  shallow(<TutorRow tutor={{
    profile: {
      user: 0,
      name: 'a',
      major: 'b',
    },
    bio: 'c',
    exp: 'd',
  }} user={{
    id: 0,
  }}/>);
  shallow(<TutorRow tutor={{
    profile: {
      user: 0,
      name: 'a',
      major: 'b',
    },
    bio: 'c',
    exp: 'd',
  }} user={{
    id: 1,
  }}/>);
});
