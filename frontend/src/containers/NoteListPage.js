import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NoteListPage } from 'components'
import { getNotification, deleteNotification } from 'store/actions'

const mapStateToProps = state => {
  return {user: state.user, notification: state.notification};
};

const mapDispatchToProps = {
  getNotification, deleteNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteListPage);
