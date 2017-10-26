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
export const ExpenseList = ({expenses, dispatch}) => (
  <div>
    {
      expenses.length === 0 ?
        <p>
          No expenses found.
        </p>
        :
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
