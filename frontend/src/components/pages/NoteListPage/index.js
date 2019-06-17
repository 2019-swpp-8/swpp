// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import { NavBar, NoteRow } from 'components'
import { withRouter } from 'react-router-dom';

class NoteListPage extends React.Component {
  componentDidMount() {
    console.log(this.props.user.id)
    this.props.getNotification(this.props.user.id);
    this.setState({
      id: this.props.user.id
    });
  }

  componentWillReceiveProps(props) {
    if (props.user.id !== this.state.id)
      this.props.getNotification(props.user.id);
    this.setState({
      id: props.user.id
    });
  }

  render() {
    const {user, notification, getNotification, deleteNotification, checkAll, notifications} = this.props;
    const noteList = Array.isArray(notification.dat) ? notification.dat.map(i => (
      <NoteRow key={i['id']} notification={i} delFunc={(noteid)=>this.props.deleteNotification(noteid, this.props.user.id)} />
    )) : null;

    return (
      <div>
        <NavBar user={user} />
        <div className="container mt-3">
        <button id='note-refresh' onClick={()=>this.props.getNotification(user.id)} className="btn btn-success mb-2">새로 고침</button>
        <button id='note-check-all' onClick={()=>this.props.checkAll(user.id)} className="btn btn-danger mb-2">모두 확인</button>
        <ul className="list-group">
            {noteList}
        </ul>
        </div>
      </div>
    );
  };
}

export default NoteListPage;
