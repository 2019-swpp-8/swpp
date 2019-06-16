import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { HomePage } from 'components'
import { getProfile, getRequestList, deleteRequest, changeRequestStatus } from 'store/actions'


const mapStateToProps = state => {
  return {user: state.user, profile: state.profile, requestlist: state.requestlist};
};

const mapDispatchToProps = {
  getProfile, getRequestList, deleteRequest, changeRequestStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
