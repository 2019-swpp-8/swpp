import React from 'react'
import {LoginLogout} from 'components'

const NavBar = ({user}) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">SNU Peer Tutoring</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
            </li>
          </ul>
          <LoginLogout user={user} />
        </div>
      </div>
    </nav>
  )
};

export default NavBar;
