import React from 'react'
import _ from 'lodash'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const SearchLecture = ({searchlecture, acceptLecture, getLectureList, updateLectureList, selectSearched}) => {
  const selected = searchlecture.selected;
  const lectures = searchlecture.lectures

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    if (value.length >= 2) {
      getLectureList(value);
    } else {
      updateLectureList([]);
    }
  }

  function handleSelect(lecture) {
    selectSearched(lecture);
    updateLectureList([]);
  }

  const input_keyword = <input id="lecture-input" type="text" name="input" className="form-control" onChange={handleInputChange} />;
  const accept_button = <button id="lecture-accept" type="button" onClick={()=>{acceptLecture(selected);selectSearched(null)}} className="btn btn-primary mb-2">입력</button>;
  const cancel_button = <button id="lecture-cancel" type="button" onClick={()=>selectSearched(null)} className="btn btn-danger mb-2">취소</button>;

  return <div>
    {selected != null ? <div>{selected.prof} + {selected.title}</div> : input_keyword}
    {selected != null ? accept_button : null}
    {selected != null ? cancel_button : null}
    {lectures.map(i => (<div key={i.id} onClick={()=>handleSelect(i)}>{i.prof} - {i.title}</div>))}
  </div>
};

export default SearchLecture;
