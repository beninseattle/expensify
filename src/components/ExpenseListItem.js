import React from 'react';
import {Link} from 'react-router-dom';
import paths from '../routers/paths';

/**
 * @param {object} props
 * @param {number} props.index
 * @param {Expense} props.expense
 * @constructor
 */
const ExpenseListItem = ({index, expense}) => (
  <Link className="list-item" to={paths.editExpense + expense.id}>
    <div>
      <h3 className="list-item__title">{expense.description}</h3>
      <span className="list-item__subtitle">({expense.createdAtDateString()})</span>
    </div>
    <h3 className="list-item__data">{expense.amountCurrencyString()}</h3>
  </Link>
);

export default ExpenseListItem;