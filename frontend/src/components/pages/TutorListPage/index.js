// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import {NavBar} from 'components'
import { withRouter } from 'react-router-dom';

class TutorListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {bio: '', exp: ''};

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
    this.props.getTutorList("", "");
  }

  componentDidUpdate() {
  }

  handleSubmit() {
    this.props.getTutorList(this.state['bio'], this.state['exp']);
    event.preventDefault();
  }

  render() {
    const {user, tutorlist} = this.props;
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
            <div className="form-group col-md-5" style={{ verticalAlign:'middle' }}>
              <label htmlFor="tutorlist-submit">사실 뻥이고 frontend 검색 구현 아직 안 했어요</label><br />
              <button id="tutorlist-submit" type="submit" className="btn btn-primary mb-2">검색</button>
            </div>
          </div>
        </form>
        {this.state['bio'] + ", " + this.state['exp']}
        <code>
          <pre>
            {JSON.stringify(tutorlist, null, 4)}
          </pre>
        </code>
        </div>
      </div>
    );
  };
}

export default TutorListPage;
