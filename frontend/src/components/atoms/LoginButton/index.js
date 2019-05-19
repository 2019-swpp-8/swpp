import React from 'react'
import { apiUrl } from 'config'

const LoginButton = () => {
  return (
    <a href={apiUrl + '/auth/login'} className="button login-button">로그인</a>
  );
};

export default LoginButton;
