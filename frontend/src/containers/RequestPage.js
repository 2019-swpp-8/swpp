import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RequestPage } from 'components'
import { getProfile, getTutor, postRequest } from 'store/actions'

const mapStateToProps = state => {
  return {user: state.user, profile: state.profile, tutor: state.tutor};
};

const mapDispatchToProps = {
  getProfile, getTutor, postRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestPage);
