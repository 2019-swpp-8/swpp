import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ProfilePage } from 'components'
import { getProfile, getRequestList, deleteRequest, changeRequestStatus, getNotification, deleteNotification, checkAll } from 'store/actions'

const mapStateToProps = state => {
  return {user: state.user, profile: state.profile, tutor: state.tutor, notification: state.notification};
};

const mapDispatchToProps = {
  getProfile, getNotification, deleteNotification, checkAll
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
