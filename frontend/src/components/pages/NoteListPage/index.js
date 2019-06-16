// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import { NavBar, NoteRow } from 'components'
import { withRouter } from 'react-router-dom';

class NoteListPage extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    this.props.getNotification(this.props.user.id);
  }

  componentDidUpdate() {
  }


  render() {
    const {user, notification} = this.props;
    const noteList = Array.isArray(notification.dat) ? notification.dat.map(i => (
      <NoteRow key={i['id']} notification={i} delFunc={(noteid)=>this.props.deleteNotification(noteid)} />
    )) : <tr></tr>;
    return (
      <div>
        <NavBar user={user} />
        <div className="container mt-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th> 내용 </th>
              <th> 확인 </th>
            </tr>
          </thead>
          <tbody>
            {noteList}
          </tbody>
        </table>
        </div>
      </div>
    );
  };
}

export default NoteListPage;
