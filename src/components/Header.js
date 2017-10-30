import React from 'react';
import {NavLink} from 'react-router-dom';
import paths from '../routers/paths'

const Header = () => (
  <div>
    <h1>
      Expensify
    </h1>
    <ul className="header">
      <li><NavLink activeClassName="is-active" to={paths.dashboard} exact={true}>Expensify</NavLink></li>
      <li><NavLink activeClassName="is-active" to={paths.addExpense}>Add Expense</NavLink></li>
      <li><NavLink activeClassName="is-active" to={paths.help}>Help</NavLink></li>
    </ul>
  </div>
);

export default Header;