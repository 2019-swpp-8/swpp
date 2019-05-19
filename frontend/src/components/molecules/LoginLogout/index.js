import React from 'react'
import {LoginButton, LogoutButton} from 'components'

const LoginLogout = ({user}) => {
  if (user.loggedIn) {
    return (
      <span className="loginlogout">
        {user.username}님, 안녕하세요!
        <LogoutButton />
      </span>
    );
  } else {
    return (
      <span className="loginlogout">
        로그인해주세요.
        <LoginButton />
      </span>
    );
  }
};

export default LoginLogout;
