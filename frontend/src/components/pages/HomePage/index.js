// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import {NavBar} from 'components'

const HomePage = (user) => {
  return (
    <div>
      <NavBar user={user} />
      <div className="container">
      </div>
    </div>
  );
};

export default HomePage;
