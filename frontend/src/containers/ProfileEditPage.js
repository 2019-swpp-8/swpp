import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ProfileEditPage } from 'components'
import { getProfile, putProfile } from 'store/actions'

const mapStateToProps = state => {
  return {user: state.user, profile: state.profile, tutor: state.tutor};
};

const mapDispatchToProps = {
  getProfile, putProfile,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditPage);
