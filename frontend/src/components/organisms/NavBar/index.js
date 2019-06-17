import React from 'react'
import {LoginLogout, NoteButton} from 'components'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'


const NavBar = ({user, getNotification, deleteNotification, checkAll, notifications}) => {
  const profile = user.loggedIn ? <li className="nav-item">
    <Link to={'/profile/' + user.id} className="nav-link">프로파일</Link>
  </li> : "";
  const tutors = <li className="nav-item">
    <Link to={'/tutors'} className="nav-link">튜터 목록</Link>
  </li>;

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">SNU Peer Tutoring</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            {profile}
            {tutors}
            <NoteButton user={user} getNotification={getNotification} deleteNotification={deleteNotification} checkAll={checkAll} notifications={notifications} />
          </ul>
          <LoginLogout user={user} />
        </div>
      </div>
    </nav>
  )
};

export default NavBar;
