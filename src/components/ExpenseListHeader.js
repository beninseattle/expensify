import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import selectExpenses from '../store/selectors/expenses';
import selectExpensesTotal from '../store/selectors/expenses-total';
import paths from '../routers/paths';

/**
 * @param {Object} props
 * @param {int} props.expensesCount
 * @param {int} props.expensesTotal
 * @constructor
 */
export const ExpenseListHeader = ({expensesCount, expensesTotal}) => {
  const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
  const formattedTotal = (expensesTotal/100).toLocaleString(undefined, {style: 'currency', currency: 'USD'});
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title"><span>{expensesCount}</span> {expenseWord} found for a total of <span>{formattedTotal}</span></h1>
        <div className="page-header__actions">
          <Link className="button" to={paths.addExpense}>Add Expense</Link>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expensesCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpenseListHeader);