import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {startLogin} from "../store/actions/auth";

export const LoginPage = ({ startLogin }) => (
  <div>
    <button onClick={startLogin}>Login</button>
  </div>
);

LoginPage.propTypes = {
  startLogin: PropTypes.requiredFunc
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);