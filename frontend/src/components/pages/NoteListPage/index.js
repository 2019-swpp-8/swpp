// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import { NavBar, NoteRow } from 'components'
import { withRouter } from 'react-router-dom';
import FlipMove from 'react-flip-move';

class NoteListPage extends React.Component {
  componentWillReceiveProps(props) {
    if (this.state == null || this.state.id != props.user.id) {
        this.props.getNotification(props.user.id);
    }
    this.setState({
      id: props.user.id
    });
  }

  render() {
    const {user, notification, getNotification, deleteNotification, checkAll} = this.props;
    const noteList = Array.isArray(notification.dat) ? notification.dat.map(i => (
      <NoteRow key={i['id']} notification={i} delFunc={(noteid)=>this.props.deleteNotification(noteid, this.props.user.id)} />
    )) : null;

    return (
      <div>
        <NavBar user={user} getNotification={getNotification} deleteNotification={deleteNotification} checkAll={checkAll} notifications={notification} />
        <div className="container mt-3">
        <button id='note-check-all' onClick={()=>this.props.checkAll(user.id)} className="btn btn-danger mb-2">모두 확인</button>
        <ul className="list-group">
          <FlipMove>
            {noteList}
          </FlipMove>
        </ul>
        </div>
      </div>
    );
  };
}

export default NoteListPage;
