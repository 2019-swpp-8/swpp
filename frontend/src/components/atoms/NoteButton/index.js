import React from 'react'
import { apiUrl } from 'config'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class NoteButton extends React.Component {
  componentDidMount() {
    this.props.getNotification(this.props.user.id);
    this.setState({
      user: this.props.user.id
    });
  }
  componentWillReceiveProps(props) {
    if (this.state.user != props.user.id)
      props.getNotification(props.user.id);
    this.setState({
      user: props.user.id
    });
  }

  render() {
    const {user, getNotification, deleteNotification, checkAll, notifications} = this.props;
    console.log(notifications);
    const numNotes = notifications.dat.length ? notifications.dat.length : 0;
    return (
      <li className="nav-item">
        <Link to={'/notes/'} className="nav-link"> 알림({numNotes}) </Link>
      </li>
    );
  }
}

export default NoteButton;
