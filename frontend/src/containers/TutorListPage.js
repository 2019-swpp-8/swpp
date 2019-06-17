import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TutorListPage } from 'components'
import { getTutorList, getNotification, deleteNotification, checkAll } from 'store/actions'

const mapStateToProps = state => {
  return {user: state.user, tutorlist: state.tutorlist, notification: state.notification};
};

const mapDispatchToProps = {
  getTutorList, getNotification, deleteNotification, checkAll
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorListPage);
