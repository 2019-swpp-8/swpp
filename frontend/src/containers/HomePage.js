import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { HomePage } from 'components'

const mapStateToProps = state => state.user;

export default connect(mapStateToProps, undefined)(HomePage);
