import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { HomePage } from 'components'
import { getProfile, getRequestList, deleteRequest, changeRequestStatus, getNotification, deleteNotification, checkAll } from 'store/actions'


const mapStateToProps = state => {
  return {user: state.user, profile: state.profile, requestlist: state.requestlist, notification: state.notification};
};

const mapDispatchToProps = {
  getProfile, getRequestList, deleteRequest, changeRequestStatus, getNotification, deleteNotification, checkAll
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
