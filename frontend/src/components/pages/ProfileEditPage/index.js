// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import {NavBar} from 'components'
import { withRouter } from 'react-router-dom';

class ProfileEditPage extends React.Component {
  componentDidMount() {
    this.props.getProfile(this.props.user.id);
  }

  render() {
    const {user, profile, tutor} = this.props;
    return (
      <div>
        <NavBar user={user} />
        <div className="container mt-3">
        <h3> 프로파일 정보 수정 </h3>
        <form className="form mt-3">
          <div className="form-group col-md-3">
            <label htmlFor="profileedit-name">이름</label>
            <input type="text" className="form-control" id="profileedit-name" placeholder={profile.name} />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="profileedit-major">전공</label>
            <input type="text" className="form-control" id="profileedit-major" placeholder={profile.major} />
          </div>
          <div className="form-group col-md-5" style={{ verticalAlign:'middle' }}>
            <label htmlFor="profileedit-submit">사실 뻥이고 수정 안 돼요</label><br />
            <button id="profileedit-submit" type="submit" className="btn btn-primary mb-2">수정?</button>
          </div>
        </form>
        </div>
      </div>
    );
  };
}

export default ProfileEditPage;
