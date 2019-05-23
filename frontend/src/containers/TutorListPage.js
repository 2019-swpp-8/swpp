import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TutorListPage } from 'components'
import { getTutorList } from 'store/actions'

const mapStateToProps = state => {
  return {user: state.user, tutorlist: state.tutorlist};
};

const mapDispatchToProps = {
  getTutorList,
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorListPage);
