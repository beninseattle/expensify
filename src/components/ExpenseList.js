import React from 'react';
import {connect} from 'react-redux';
import ExpenseListHeader from './ExpenseListHeader';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../store/selectors/expenses';
import selectExpensesTotal from '../store/selectors/expenses-total';

/**
 * @param {Object} props
 * @param {Expense[]} props.expenses
 * @constructor
 */
export const ExpenseList = ({expenses}) => {
  if( expenses.length === 0 ) {
    return (
      <p>
        No expenses found.
      </p>
    );
  } else {
    return (
      <div>
        <ExpenseListHeader/>
        { expenses.map(
              (expense, index) =>
                <ExpenseListItem
                  key={expense.id}
                  index={index + 1}
                  expense={expense}
                />)
        }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);
