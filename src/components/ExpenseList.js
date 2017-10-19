import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../store/selectors/expenses';

/**
 * @param {Object} props
 * @param {Expense[]} props.expenses
 * @param {function} props.dispatch
 * @constructor
 */
const ExpenseList = ({expenses, dispatch}) => (
  <div>
    <h1>Expense List</h1>
    {
      expenses.map(
        (expense, index) =>
          <ExpenseListItem
            key={expense.id}
            index={index + 1}
            expense={expense}
          />)
    }
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);
