import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
  <div>
    <h1>
      Expensify
    </h1>
    <ul className="header">
      <li><NavLink activeClassName="is-active" to="/" exact={true}>Expensify</NavLink></li>
      <li><NavLink activeClassName="is-active" to="/create">Add Expense</NavLink></li>
      <li><NavLink activeClassName="is-active" to="/help">Help</NavLink></li>
    </ul>
  </div>
);

export default Header;