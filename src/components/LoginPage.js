import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {startLogin} from "../store/actions/auth";

export const LoginPage = ({startLogin}) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p>Get your expenses under control!</p>
      <button className="button" onClick={startLogin}>Login with Google</button>
    </div>
  </div>
);

LoginPage.propTypes = {
  startLogin: PropTypes.requiredFunc
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);