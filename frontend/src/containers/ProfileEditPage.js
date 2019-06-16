import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ProfileEditPage } from 'components'
import { getProfile, putProfile, putTutor, getLectureList, updateLectureList, selectSearched, changeShow } from 'store/actions'

const mapStateToProps = state => {
  return {user: state.user, profile: state.profile, tutor: state.tutor, searchlecture: state.searchlecture};
};

const mapDispatchToProps = {
  getProfile, putProfile, putTutor, getLectureList, updateLectureList, selectSearched, changeShow
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditPage);
