// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import {NavBar, WeeklyScheduler} from 'components'
import { withRouter } from 'react-router-dom';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

class ProfileEditPage extends React.Component {
  constructor(props) {
    super(props);
    const profile = this.props.profile;
    const tutor = this.props.tutor;
    this.state = {name: profile.name, major: profile.major, redirect: false, exp: tutor.exp, bio: tutor.bio};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTimesChange = this.handleTimesChange.bind(this);
  }

  componentDidMount() {
    this.props.getProfile(this.props.user.id);
  }

  componentDidUpdate() {
    if (this.props.profile.id == this.props.user.id) return;
    this.props.getProfile(this.props.user.id);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleTimesChange(val) {
    console.log(val);
    this.setState({
      times: val,
      edited: true,
    });
  }

  handleSubmit(event) {
    console.log(this.state);
    const name = this.state['name'] == '' ? this.props.profile.name : this.state['name'];
    const major = this.state['major'] == '' ? this.props.profile.major : this.state['major'];
    const bio = this.state['bio'] == '' ? this.props.tutor.bio : this.state['bio'];
    const exp = this.state['exp'] == '' ? this.props.tutor.exp : this.state['exp'];
    this.props.putProfile(this.props.profile.id, name, major);
    console.log({id: this.props.tutor.times, ...this.state.times});
    this.props.putTutor(this.props.profile.tutor, bio, exp, {id: this.props.tutor.times.id, ...this.state.times});
    this.setState({redirect: true});
    event.preventDefault();
  }

  getRedirect() {
    if (this.state.redirect) {
      return <Redirect to={'/profile/' + this.props.profile.id} />;
    }
  }

  render() {
    const {user, profile, tutor} = this.props;
    return (
      <div>
        {this.getRedirect()}
        <NavBar user={user} />
        <div className="container mt-3">
          <form className="form mt-3" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <h3> 프로파일 정보 </h3>
                <div className="form-group">
                  <label htmlFor="profileedit-name">이름</label>
                  <input type="text" name="name" className="form-control" id="profileedit-name" placeholder={profile.name} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="profileedit-major">전공</label>
                  <input type="text" name="major" className="form-control" id="profileedit-major" placeholder={profile.major} onChange={this.handleInputChange} />
                </div>
                <h3> 튜터 정보 </h3>
                <div className="form-group">
                  <label htmlFor="profileedit-bio">자기소개</label>
                  <textarea rows="4" value={this.state.bio} type="text" name="bio" className="form-control" id="profileedit-bio" placeholder={tutor.bio} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="profileedit-exp">경력</label>
                  <textarea rows="4" value={this.state.exp} type="text" name="exp" className="form-control" id="profileedit-exp" placeholder={tutor.exp} onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="form-group col-md-6">
                <h3> 튜터링 가능 시간대 </h3><br/>
                <h4>가능한 시간에 색칠하세요</h4>
                <WeeklyScheduler name="times" id="profileedit-times" times={this.state.edited ? undefined : tutor.times} tutoringTimes={tutor.tutoringTimes} readonly={false} onChange={this.handleTimesChange} />
              </div>
            </div>
            <div className="form-group col-md-5" style={{ verticalAlign:'middle' }}>
              <label htmlFor="profileedit-submit"> </label><br />
              <button id="profileedit-submit" type="submit" className="btn btn-primary mb-2">수정</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

export default ProfileEditPage;
