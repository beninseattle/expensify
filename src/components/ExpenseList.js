import React from 'react';
import {connect} from 'react-redux';
import ExpenseListHeader from './ExpenseListHeader';
import ExpenseListItem from './ExpenseListItem';
import ExpenseListFilter from './ExpenseListFilter';
import selectExpenses from '../store/selectors/expenses';

/**
 * @param {Object} props
 * @param {Expense[]} props.expenses
 * @constructor
 */
export const ExpenseList = ({expenses}) => {
  if (expenses.length === 0) {
    return (
      <div>
        <ExpenseListHeader/>
      </div>
    );
  } else {
    return (
      <div>
        <ExpenseListHeader/>
        <ExpenseListFilter/>
        {expenses.map(
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
