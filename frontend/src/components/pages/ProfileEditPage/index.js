// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import {NavBar, WeeklyScheduler, SearchLecture} from 'components'
import { withRouter } from 'react-router-dom';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

class ProfileEditPage extends React.Component {
  constructor(props) {
    super(props);
    const profile = this.props.profile;
    const tutor = this.props.tutor;
    this.state = {name: profile.name, major: profile.major, contact: profile.contact, redirect: false, exp: tutor.exp, bio: tutor.bio};

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
    this.setState({
      times: val,
      edited: true,
    });
  }

  handleSubmit(event) {
    console.log(this.state);
    const name = this.state['name'] == '' ? this.props.profile.name : this.state['name'];
    const major = this.state['major'] == '' ? this.props.profile.major : this.state['major'];
    const contact = this.state['contact'] == '' ? this.props.profile.contact : this.state['contact'];
    const bio = this.state['bio'] == '' ? this.props.tutor.bio : this.state['bio'];
    const exp = this.state['exp'] == '' ? this.props.tutor.exp : this.state['exp'];
    const lectures = this.state['lectures'] == undefined ? this.props.tutor.lectures : this.state['lectures'];
    this.props.putProfile(this.props.profile.id, name, major, contact);
    this.props.putTutor(this.props.profile.tutor, bio, exp, lectures, {id: this.props.tutor.times.id, ...this.state.times});
    this.setState({redirect: true});
    event.preventDefault();
  }

  getRedirect() {
    if (this.state.redirect) {
      return <Redirect to={'/profile/' + this.props.profile.id} />;
    }
  }

  addLecture(lecture) {
    const lectures = this.state['lectures'] == undefined ? this.props.tutor.lectures : this.state['lectures'];
    lectures.push(lecture);
    this.setState({lectures: lectures});
  }

  deleteLecture(id) {
    const lectures = this.state['lectures'] == undefined ? this.props.tutor.lectures : this.state['lectures'];
    this.setState({lectures: lectures.filter(i => (i.id != id))});
  }

  render() {
    const {user, profile, tutor, searchlecture, getLectureList, updateLectureList, selectSearched} = this.props;
    const lectures = this.state['lectures'] == undefined ? tutor.lectures : this.state['lectures'];
    const lectureList = Array.isArray(lectures) ? lectures.map(i => (
      <button type="button" key={i.id} onClick={()=>this.deleteLecture(i.id)}>{i.prof} / {i.title} X</button>
    )) : null;
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
                <div className="form-group">
                  <label htmlFor="profileedit-contact">연락처</label>major
                  <input type="text" name="contact" className="form-control" id="profileedit-contact" placeholder={profile.contact} onChange={this.handleInputChange} />
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
                <WeeklyScheduler name="times" id="profileedit-times" times={this.state.edited ? undefined : tutor.times} tutoringTimes={tutor.tutoringTimes} readonly={false} onChange={this.handleTimesChange} inv={false}/>
              </div>
            </div>
            <h3> 가르칠 수 있는 강의 </h3>
            <SearchLecture searchlecture={searchlecture} acceptLecture={(lecture)=>this.addLecture(lecture)} getLectureList={getLectureList} updateLectureList={updateLectureList} selectSearched={selectSearched}></SearchLecture>
            {lectureList}
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
