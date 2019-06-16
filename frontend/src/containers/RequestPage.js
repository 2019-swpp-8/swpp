import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RequestPage } from 'components'
import { getProfile, getTutor, postRequest, getLectureList, updateLectureList, selectSearched } from 'store/actions'

const mapStateToProps = state => {
  return {user: state.user, profile: state.profile, tutor: state.tutor, searchlecture: state.searchlecture};
};

const mapDispatchToProps = {
  getProfile, getTutor, postRequest, getLectureList, updateLectureList, selectSearched,
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestPage);
