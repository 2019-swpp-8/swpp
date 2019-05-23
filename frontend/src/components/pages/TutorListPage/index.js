// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import {NavBar} from 'components'
import { withRouter } from 'react-router-dom';

class TutorListPage extends React.Component {
  componentDidMount() {
    this.props.getTutorList("", "");
  }

  componentDidUpdate() {
  }

  render() {
    const {user, tutorlist} = this.props;
    return (
      <div>
        <NavBar user={user} />
        <div className="container mt-3">
        <form className="form">
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="tutorlist-bio">소개</label>
              <input type="text" className="form-control" id="tutorlist-bio" />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="tutorlist-exp">경력</label>
              <input type="text" className="form-control" id="tutorlist-exp" />
            </div>
            <div className="form-group col-md-5" style={{ verticalAlign:'middle' }}>
              <label htmlFor="tutorlist-submit">사실 뻥이고 frontend 검색 구현 아직 안 했어요</label><br />
              <button id="tutorlist-submit" type="submit" className="btn btn-primary mb-2">검색</button>
            </div>
          </div>
        </form>
        예쁘게 표시하는건 구현 안 했어요 죄송합니다! ㅠㅠ
        <br />
        {JSON.stringify(tutorlist, null, 2)}
        </div>
      </div>
    );
  };
}

export default TutorListPage;
