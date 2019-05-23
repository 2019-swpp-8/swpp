// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import {NavBar} from 'components'
import { withRouter } from 'react-router-dom';

class TutorListPage extends React.Component {
  componentDidMount() {
    this.props.getTutorList("", "");
  }

  componentDidUpdate() {
    this.props.getTutorList("", "");
  }

  render() {
    const {user, tutorlist} = this.props;
    return (
      <div>
        <NavBar user={user} />
        <div className="container mt-3">
        예쁘게 표시하는건 구현 안 했어요 죄송합니다! ㅠㅠ
        <br />
        {JSON.stringify(tutorlist)}
        </div>
      </div>
    );
  };
}

export default TutorListPage;
