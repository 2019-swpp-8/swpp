import React from 'react'
import { apiUrl } from 'config'

const LogoutButton = () => {
  return (
    <a href={apiUrl + '/auth/logout'} className="button logout-button">로그아웃</a>
  );
};

export default LogoutButton;
