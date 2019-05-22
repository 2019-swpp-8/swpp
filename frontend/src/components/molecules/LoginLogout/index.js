import React from 'react'
import {LoginButton, LogoutButton} from 'components'

const LoginLogout = ({user}) => {
  if (user.loggedIn) {
    return (
      <span className="loginlogout">
        <span className="greeting mr-2"> {user.username}님, 안녕하세요! </span>
        <LogoutButton />
      </span>
    );
  } else {
    return (
      <span className="loginlogout">
        <span className="greeting mr-2"> 로그인해주세요. </span>
        <LoginButton />
      </span>
    );
  }
};

export default LoginLogout;
