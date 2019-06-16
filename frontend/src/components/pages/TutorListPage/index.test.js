import React from 'react'
import { shallow, simulate } from 'enzyme'
import TutorListPage from '.'

it("renders empty tutorlist", () => {
  const wrapper = shallow(<TutorListPage user={{
    loggedIn: true,
    username: 'a',
    id: 1,
  }}
  tutorlist={{dat: {}}} getTutorList={(a, b)=>{}}/>);
  wrapper.find('#tutorlist-bio').simulate('change', {
    target: {
      name: 'bio',
      value: 'hi',
    },
  });
  wrapper.find('#tutorlist-minInterval').simulate('change', {
    target: {
      name: 'minInterval',
      value: '-1',
    },
  });
  wrapper.find('#tutorlist-minInterval').simulate('blur', {
    target: {
      name: 'minInterval',
      value: '-1',
    },
  });
  wrapper.find('#tutorlist-minInterval').simulate('change', {
    target: {
      name: 'minInterval',
      value: '900',
    },
  });
  wrapper.find('#tutorlist-minInterval').simulate('blur', {
    target: {
      name: 'minInterval',
      value: '900',
    },
  });
  wrapper.instance().handleTimesChange(0);
  wrapper.find('.form').simulate('submit', {
    preventDefault: () => {},
  });
});

it("renders filled tutorlist", () => {
  const wrapper = shallow(<TutorListPage user={{
    loggedIn: true,
    username: 'a',
    id: 1,
  }}
  tutorlist={{dat: [{
    profile: {
      user: 0,
      name: 'a',
      major: 'b',
    },
    bio: 'c',
    exp: 'd',
  }]}} getTutorList={(a, b)=>{}}/>);
});
