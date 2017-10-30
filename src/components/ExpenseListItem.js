import React from 'react';
import {Link} from 'react-router-dom';
import NavButton from './NavigationButton';
import paths from '../routers/paths';

/**
 * @param {object} props
 * @param {number} props.index
 * @param {Expense} props.expense
 * @constructor
 */
const ExpenseListItem = ({index, expense}) => (
  <div>
    <h3><Link to={paths.editExpense + expense.id}>{expense.description}</Link></h3>
    <p>{expense.amountCurrencyString()} ({expense.createdAtDateString()})</p>
    <NavButton path={paths.editExpense + expense.id} title="Edit"/>
  </div>
);

export default ExpenseListItem;