import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ProfilePage } from 'components'
import { getProfile } from 'store/actions'

const mapStateToProps = state => {
  return {user: state.user, profile: state.profile, tutor: state.tutor};
};

const mapDispatchToProps = {
  getProfile,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
