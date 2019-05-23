import React from 'react'
import { apiUrl } from 'config'

const RegisterButton = () => {
  return (
    <a href={apiUrl + '/auth/register'} className="btn btn-outline-primary login-button">회원가입</a>
  );
};

export default RegisterButton;
