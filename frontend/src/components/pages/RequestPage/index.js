// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import { NavBar, WeeklyScheduler, SearchLecture } from 'components'
import { withRouter } from 'react-router-dom';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import { Form } from 'react-bootstrap'

class RequestPage extends React.Component {
  constructor(props) {
    super(props);
    const request = this.props.request;
    this.state = {detail: "", payment: "",
        mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0,
        redirect: false, validated: false};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTimesChange = this.handleTimesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getProfile(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (this.props.profile.id == this.props.match.params.id) return;
    this.props.getProfile(this.props.match.params.id);
  }

  getRedirect() {
    if (this.state.redirect) {
      return <Redirect to={'/'} />;
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

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
    if (event.target.checkValidity() === false || this.props.searchlecture.selected == null) {
      this.setState({validated: true});
      return;
    }
    const tutor = this.props.match.params.id;
    const tutee = this.props.user.id;
    const lecture = this.props.searchlecture.selected.id;
    const detail = this.state['detail'];
    const payment = this.state['payment'];
    const times = this.state['times'];
    this.props.postRequest(tutor, tutee, lecture, detail, payment, times);
    this.setState({redirect: true});
    event.preventDefault();
  }

  render() {
    const {user, tutor, searchlecture, getLectureList, updateLectureList, selectSearched, changeShow} = this.props;
    const times = this.state.edited ? undefined : {
      mon: 0,
      tue: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0,
      sun: 0,
    };
    const noTimes = tutor.times;

    return (
      <div>
        {this.getRedirect()}
        <NavBar user={user} />
        <div className="container mt-3">
          <h3> 튜터링 신청 양식 </h3>
          <Form className="form mt-3" onSubmit={this.handleSubmit} validated={this.state.validated} noValidate>
            <div className="row">
              <div className="form-group col-md-5">
                <div className="form-group">
                  <label htmlFor="request-detail">요구사항</label>
                  <input type="text" name="detail" className="form-control" id="request-detail" placeholder="원하시는 요구사항을 입력하세요" onChange={this.handleInputChange} required/>
                  <div className="invalid-feedback">원하시는 내용을 입력해주세요</div>
                </div>
                <div className="form-group">
                  <label htmlFor="request-payment">보수</label>
                  <input type="text" name="payment" className="form-control" id="request-payment" placeholder="가능한 보수를 입력하세요" onChange={this.handleInputChange} required/>
                  <div className="invalid-feedback">구체적인 보수를 입력해주세요</div>
                </div>
                <div>
                  <label htmlFor="request-lecture">강의명</label>
                  <SearchLecture className="form" name="lecture" searchlecture={searchlecture} getLectureList={getLectureList} updateLectureList={updateLectureList} selectSearched={selectSearched} changeShow={changeShow} />
                </div>
                <div className="form-group" style={{ verticalAlign:'middle' }}>
                  <label htmlFor="request-submit"></label><br />
                  <button id="request-submit" type="submit" className="btn btn-primary mb-2">신청</button>
                </div>
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="request-times">시간</label>
                <WeeklyScheduler name="times" id="profileedit-times" times={times} tutoringTimes={noTimes} readonly={false} onChange={this.handleTimesChange} inv={true}/>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  };
}

export default RequestPage;
