import React from 'react';
import {Link} from 'react-router-dom';
import NavButton from './NavigationButton';

/**
 * @param {object} props
 * @param {number} props.index
 * @param {Expense} props.expense
 * @param {function} props.dispatch
 * @constructor
 */
const ExpenseListItem = ({index, expense}) => (
  <div>
    <h3><Link to={'/edit/' + expense.id}>{expense.description}</Link></h3>
    <p>{expense.amountCurrencyString()} ({expense.createdAtDateString()})</p>
    <NavButton path={'edit/' + expense.id} title="Edit"/>
  </div>
);

export default ExpenseListItem;