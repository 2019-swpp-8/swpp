import React from 'react'
import {LoginButton, LogoutButton, RegisterButton} from 'components'

const LoginLogout = ({user}) => {
  if (user.loggedIn) {
    return (
      <span className="loginlogout">
        <span className="greeting mr-2"> {user.name}님, 안녕하세요! </span>
        <LogoutButton />
      </span>
    );
  } else {
    return (
      <span className="loginlogout">
        <span className="greeting mr-2"> 로그인해주세요. </span>
        <div className="btn-group" role="group" aria-label="login-group">
          <LoginButton />
          <RegisterButton />
        </div>
      </span>
    );
  }
};

export default LoginLogout;
