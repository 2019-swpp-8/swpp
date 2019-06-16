import React from 'react'
import _ from 'lodash'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const SearchLecture = ({searchlecture, acceptLecture, getLectureList, updateLectureList, selectSearched, changeShow}) => {
  const selected = searchlecture.selected;
  const lectures = searchlecture.lectures;
  const show = searchlecture.show;

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

  const input_keyword = <input id="lecture-input" type="text" name="input" className="form-control" onChange={handleInputChange} onFocus={()=>changeShow(true)} onBlur={()=>changeShow(false)} />;
  const accept_button = <button id="lecture-accept" type="button" onClick={()=>{if (acceptLecture!=undefined) {acceptLecture(selected);selectSearched(null)}}} className={"btn-sm btn-"+(acceptLecture!=undefined?"success":"light")}>{selected != null ? selected.prof : ""} + {selected != null ? selected.title : ""}</button>;
  const cancel_button = <button id="lecture-cancel" type="button" onClick={()=>selectSearched(null)} className="btn-sm btn-danger">취소</button>;
  const lectures_item = lectures.map(i => (<div className="dropdown-item" key={i.id} onMouseDown={()=>handleSelect(i)}>{i.prof} - {i.title}</div>));
  const lectures_menu = <div className={"dropdown-menu" + (show && lectures.length > 0 ? " show": "")}>{lectures_item}</div>

  return <div className="dropdown">
    {selected != null ? null : input_keyword}
    {selected != null ? accept_button : null}
    {selected != null ? cancel_button : null}
    {lectures_menu}
  </div>
};

export default SearchLecture;
