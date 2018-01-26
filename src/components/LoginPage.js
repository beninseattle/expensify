import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {startGoogleLogin, startDemoLogin} from "../store/actions/auth";

export const LoginPage = ({startGoogleLogin, startDemoLogin}) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p>Get your expenses under control!</p>
      <button className="button button--login" onClick={startGoogleLogin}>Login with Google</button>
      <button className="button button--login button--secondary" onClick={startDemoLogin}>Login for Demo</button>
    </div>
  </div>
);

LoginPage.propTypes = {
  startGoogleLogin: PropTypes.requiredFunc,
  startDemoLogin: PropTypes.requiredFunc
};

const mapDispatchToProps = (dispatch) => ({
  startGoogleLogin: () => dispatch(startGoogleLogin()),
  startDemoLogin: () => dispatch(startDemoLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);