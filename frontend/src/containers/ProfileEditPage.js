import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ProfileEditPage } from 'components'
import { getProfile, putProfile, putTutor, getLectureList, updateLectureList, selectSearched, changeShow, getNotification, deleteNotification, checkAll } from 'store/actions'

const mapStateToProps = state => {
  return {user: state.user, profile: state.profile, tutor: state.tutor, searchlecture: state.searchlecture, notification: state.notification};
};

const mapDispatchToProps = {
  getProfile, putProfile, putTutor, getLectureList, updateLectureList, selectSearched, changeShow, getNotification, deleteNotification, checkAll
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditPage);
