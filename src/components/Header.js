import React from 'react';
import {NavLink} from 'react-router-dom';
import paths from '../routers/paths'
import { connect } from 'react-redux';
import { startLogout } from "../store/actions/auth";

export const Header = ({ startLogout }) => (
  <div>
    <h1>
      Expensify
    </h1>
    <ul className="header">
      <li><NavLink activeClassName="is-active" to={paths.dashboard}>Dashboard</NavLink></li>
      <li><NavLink activeClassName="is-active" to={paths.addExpense}>Add Expense</NavLink></li>
      <button onClick={startLogout}>Logout</button>
    </ul>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);