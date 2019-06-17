import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RequestPage } from 'components'
import { getProfile, getTutor, postRequest, getLectureList, updateLectureList, selectSearched, changeShow, getNotification, deleteNotification, checkAll } from 'store/actions'

const mapStateToProps = state => {
  return {user: state.user, profile: state.profile, tutor: state.tutor, searchlecture: state.searchlecture, notification: state.notification};
};

const mapDispatchToProps = {
  getProfile, getTutor, postRequest, getLectureList, updateLectureList, selectSearched, changeShow, getNotification, deleteNotification, checkAll
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestPage);
