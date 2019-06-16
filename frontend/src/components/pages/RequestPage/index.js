// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import {NavBar, WeeklyScheduler} from 'components'
import { withRouter } from 'react-router-dom';

class RequestPage extends React.Component {
  constructor(props) {
    super(props);
    const request = this.props.request;
    this.state = {lecture: 1, detail: "", payment: "",
        mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0};
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
    const tutor = this.props.match.params.id;
    const tutee = this.props.user.id;
    const lecture = this.state['lecture'];
    const detail = this.state['detail'];
    const payment = this.state['payment'];
    const times = this.state['times'];
    this.props.postRequest(tutor, tutee, lecture, detail, payment, times);
    event.preventDefault();
  }

  render() {
    const {user, tutor} = this.props;
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
        <NavBar user={user} />
        <div className="container mt-3">
        <h3> 튜터링 신청 양식 </h3>
        <form className="form mt-3" onSubmit={this.handleSubmit}>
          <div className="form-group col-md-3">
            <label htmlFor="request-detail">요구사항</label>
            <input type="text" name="detail" className="form-control" id="request-detail" placeholder="원하시는 요구사항을 입력하세요" onChange={this.handleInputChange} />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="request-payment">보수</label>
            <input type="text" name="payment" className="form-control" id="request-payment" placeholder="가능한 보수를 입력하세요" onChange={this.handleInputChange} />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="request-lecture">강의명(번호)</label>
            <input type="text" name="lecture" className="form-control" id="request-lecture" placeholder="강의를 선택하세요" onChange={this.handleInputChange} />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="request-times">시간</label>
            <WeeklyScheduler name="times" id="profileedit-times" times={times} tutoringTimes={noTimes} readonly={false} onChange={this.handleTimesChange} inv={true}/>
          </div>
          <div className="form-group col-md-5" style={{ verticalAlign:'middle' }}>
            <label htmlFor="request-submit"></label><br />
            <button id="request-submit" type="submit" className="btn btn-primary mb-2">신청</button>
          </div>
        </form>
        </div>
      </div>
    );
  };
}

export default RequestPage;
