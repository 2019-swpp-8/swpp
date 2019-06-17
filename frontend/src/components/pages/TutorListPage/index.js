// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import { NavBar, TutorRow, WeeklyScheduler } from 'components'
import { withRouter } from 'react-router-dom';
import FlipMove from 'react-flip-move';

class TutorListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {bio: '', exp: '', major: '', lecTitle:'', lecProf:'', name:'', times: {
      mon: 0,
      tue: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0,
      sun: 0,
    }, total: 0, minInterval: 0.5};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTimesChange = this.handleTimesChange.bind(this);
    this.handleOutOfFocus = this.handleOutOfFocus.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleOutOfFocus(event) {
    let value = (Math.round(Number(this.state[event.target.name]) * 2) / 2).toString();
    if (value < 0) value = 0;
    if (value > 168) value = 168;
    if (event.target.name == 'minInterval' && value < 0.5) value = 0.5;
    if (event.target.name == 'minInterval' && value > 48) value = 48;
    this.setState({
      [event.target.name]: value,
    });
  }

  handleTimesChange(val) {
    this.setState({
      times: val,
      edited: true,
    });
  }

  componentDidMount() {
    this.props.getTutorList("", "", "");
  }

  componentDidUpdate() {
  }

  handleSubmit(event) {
    this.props.getTutorList(this.state['bio'], this.state['exp'],
     this.state['major'], this.state['lecTitle'], this.state['lecProf'], this.state['name'],
     this.state['times'], this.state['total'] * 2, this.state['minInterval'] * 2);
    event.preventDefault();
  }

  render() {
    const {user, tutorlist} = this.props;
    const tutorList = Array.isArray(tutorlist.dat) ? <FlipMove>{
      tutorlist.dat.map(i => (
      <TutorRow key={i['profile']['user']} user={user} tutor={i} loggedIn={user.loggedIn} />
    ))}
    </FlipMove> : null;
    return (
      <div>
        <NavBar user={user} />
        <div className="container mt-3">
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="tutorlist-name">이름</label>
              <input name="name" type="text" className="form-control" id="tutorlist-name" onChange={this.handleInputChange} />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="tutorlist-major">전공</label>
              <input name="major" type="text" className="form-control" id="tutorlist-major" onChange={this.handleInputChange} />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="tutorlist-bio">소개</label>
              <input name="bio" type="text" className="form-control" id="tutorlist-bio" onChange={this.handleInputChange} />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="tutorlist-exp">경력</label>
              <input name="exp" type="text" className="form-control" id="tutorlist-exp" onChange={this.handleInputChange} />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="tutorlist-lecTitle">수강 강의명</label>
              <input name="lecTitle" type="text" className="form-control" id="tutorlist-lecTitle" onChange={this.handleInputChange} />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="tutorlist-lecProf">강의 교수</label>
              <input name="lecProf" type="text" className="form-control" id="tutorlist-lecProf" onChange={this.handleInputChange} />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="tutorlist-total">최소 시간 (0.5시간 단위)</label>
              <input value={this.state.total} name="total" type="number" min="0" max="168" step="0.5" className="form-control" id="tutorlist-total" onChange={this.handleInputChange} onBlur={this.handleOutOfFocus} />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="tutorlist-minInterval">최소 모임 시간 (0.5시간 단위)</label>
              <input value={this.state.minInterval} name="minInterval" type="number" min="0" max="168" step="0.5" className="form-control" id="tutorlist-minInterval" onChange={this.handleInputChange} onBlur={this.handleOutOfFocus} />
            </div>
            <div className="form-group" style={{ verticalAlign:'middle' }}>
              <label htmlFor="tutorlist-open-modal"> &nbsp; </label><br />
              <button type="button" id="tutorlist-open-modal" data-toggle="modal" data-target={'#tutorlist-times'} className="btn btn-outline-primary mb-2">시간대 설정</button>
              <div className="modal fade" id='tutorlist-times' tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">시간대 설정</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <WeeklyScheduler readonly={false} onChange={this.handleTimesChange} />
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">확인</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group col-md-2" style={{ verticalAlign:'middle' }}>
              <label htmlFor="tutorlist-submit"> &nbsp; </label><br />
              <button id="tutorlist-submit" type="submit" className="btn btn-primary mb-2">검색</button>
            </div>
          </div>
        </form>
        {tutorList}
        </div>
      </div>
    );
  };
}

export default TutorListPage;
