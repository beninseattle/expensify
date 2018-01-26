import React from 'react';
import {Link} from 'react-router-dom';
import paths from '../routers/paths'
import {connect} from 'react-redux';
import {startLogout} from "../store/actions/auth";
import isDemo from "../store/selectors/auth";

export const Header = ({startLogout, isDemo}) => (
  <header className={isDemo ? 'header header--demo' : 'header'}>
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to={paths.dashboard}><h1>Expensify</h1></Link>
        <button className="button button--link" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

const mapStateToProps = (state) => {
  return {
    isDemo: isDemo(state.auth)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);