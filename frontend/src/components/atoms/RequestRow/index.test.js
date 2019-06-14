import React from 'react'
import { shallow } from 'enzyme'
import RequestRow from '.'

it('renders with no request prop', () => {
  shallow(<RequestRow />);
});

it('renders with proper request prop. user is tutor, status is 0', () => {
  const wrapper = shallow(<RequestRow user={1} request={{
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
    status: "0",
  }}
  deleteRequest={()=>{}} changeStatus={()=>{}}/>);
  wrapper.find('#request-accept').simulate('click');
  wrapper.find('#request-cancel').simulate('click');
});

it('renders with proper request prop. user is tutee, status is 1', () => {
  const wrapper = shallow(<RequestRow user={1} request={{
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
    status: "1",
  }}
  deleteRequest={()=>{}} changeStatus={()=>{}}/>);
  wrapper.find('#request-complete').simulate('click');
});

it('renders with proper request prop. user is tutor, status is 2', () => {
  const wrapper = shallow(<RequestRow user={1} request={{
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
    status: "2",
  }}
  deleteRequest={()=>{}} changeStatus={()=>{}}/>);
});

it('renders with proper request prop. user is tutee, status is 2', () => {
  const wrapper = shallow(<RequestRow user={1} request={{
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
    status: "2",
  }}
  deleteRequest={()=>{}} changeStatus={()=>{}}/>);
  wrapper.find('#request-star').simulate('click');
});
