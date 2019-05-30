// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import {NavBar} from 'components'
import { withRouter } from 'react-router-dom';

class ProfileEditPage extends React.Component {
  constructor(props) {
    super(props);
    const profile = this.props.profile;
    this.state = {name: profile.name, major: profile.major};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
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

  handleSubmit(event) {
    const name = this.state['name'] == '' ? this.props.profile.name : this.state['name'];
    const major = this.state['major'] == '' ? this.props.profile.major : this.state['major'];
    this.props.putProfile(this.props.profile.id, name, major);
    event.preventDefault();
  }

  render() {
    const {user, profile, tutor} = this.props;
    return (
      <div>
        <NavBar user={user} />
        <div className="container mt-3">
        <h3> 프로파일 정보 수정 </h3>
        <form className="form mt-3" onSubmit={this.handleSubmit}>
          <div className="form-group col-md-3">
            <label htmlFor="profileedit-name">이름</label>
            <input type="text" name="name" className="form-control" id="profileedit-name" placeholder={profile.name} onChange={this.handleInputChange} />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="profileedit-major">전공</label>
            <input type="text" name="major" className="form-control" id="profileedit-major" placeholder={profile.major} onChange={this.handleInputChange} />
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
