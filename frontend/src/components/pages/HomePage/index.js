// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import {LoginLogout} from 'components'

const HomePage = (user) => {
  return (
    <div>
      <LoginLogout user={user} />
    </div>
  );
};

export default HomePage;
