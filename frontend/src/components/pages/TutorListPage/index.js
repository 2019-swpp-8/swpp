// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import { NavBar, TutorRow } from 'components'
import { withRouter } from 'react-router-dom';

class TutorListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {bio: '', exp: '', major: ''};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    this.props.getTutorList("", "", "");
  }

  componentDidUpdate() {
  }

  handleSubmit(event) {
    this.props.getTutorList(this.state['bio'], this.state['exp'], this.state['major']);
    event.preventDefault();
  }

  render() {
    const {user, tutorlist} = this.props;
    const tutorList = Array.isArray(tutorlist.dat) ? tutorlist.dat.map(i => (
      <TutorRow key={i['profile']['user']} tutor={i} />
    )) : <tr></tr>;
    return (
      <div>
        <NavBar user={user} />
        <div className="container mt-3">
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="tutorlist-bio">소개</label>
              <input name="bio" type="text" className="form-control" id="tutorlist-bio" onChange={this.handleInputChange} />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="tutorlist-exp">경력</label>
              <input name="exp" type="text" className="form-control" id="tutorlist-exp" onChange={this.handleInputChange} />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="tutorlist-exp">전공</label>
              <input name="major" type="text" className="form-control" id="tutorlist-major" onChange={this.handleInputChange} />
            </div>
            <div className="form-group col-md-5" style={{ verticalAlign:'middle' }}>
              <label htmlFor="tutorlist-submit"> &nbsp; </label><br />
              <button id="tutorlist-submit" type="submit" className="btn btn-primary mb-2">검색</button>
            </div>
          </div>
        </form>
        <table className="table table-hover">
          <thead>
            <tr>
              <th> 이름 </th>
              <th> 전공 </th>
              <th> 소개 </th>
              <th> 경력 </th>
              <th> 신청 </th>
            </tr>
          </thead>
          <tbody>
            {tutorList}
          </tbody>
        </table>
        </div>
      </div>
    );
  };
}

export default TutorListPage;
