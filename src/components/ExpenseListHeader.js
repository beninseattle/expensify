import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../store/selectors/expenses';
import selectExpensesTotal from '../store/selectors/expenses-total';

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
    <div className="list_header">
      <h2>{expensesCount} {expenseWord} found for a total of {formattedTotal}</h2>
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