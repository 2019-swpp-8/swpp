import React from 'react'
import { shallow } from 'enzyme'
import SearchLecture from '.'

it('renders with selected is null', () => {
  const wrapper = shallow(<SearchLecture searchlecture={{
    selected: null,
    lectures: [{id: 1, prof: "prof", title: "title"}],
    show: true,
  }}
  acceptLecture={()=>{}} getLectureList={()=>{}}
  updateLectureList={()=>{}} selectSearched={()=>{}}/>);
  wrapper.find('#lecture-input').simulate('change', {
    target: {value: 't'},
  });
  wrapper.find('#lecture-input').simulate('change', {
    target: {value: 'title'},
  });
  wrapper.find('div').forEach((node, index)=>node.simulate('click'));
  wrapper.find('div').forEach((node, index)=>node.simulate('mousedown'));
});

it('renders with selected is not null', () => {
  const wrapper = shallow(<SearchLecture searchlecture={{
    selected: {id: 1, prof: "prof", title: "title"},
    lectures: [],
  }}
  acceptLecture={()=>{}} getLectureList={()=>{}}
  updateLectureList={()=>{}} selectSearched={()=>{}}/>);
  wrapper.find('#lecture-accept').simulate('click');
  wrapper.find('#lecture-cancel').simulate('click');
});
