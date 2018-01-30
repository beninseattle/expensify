import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../store/selectors/expenses';
import {setStartDate, setStopDate, setTextFilter, sortByAmount, sortByDate} from "../store/actions/filters";

/**
 * @param {Object} props
 * @param {Expense[]} props.expenses
 * @constructor
 */
export const ExpenseList = ({expenses, sortByDate, sortByAmount}) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div onClick={sortByDate} className="list-header--left show-for-desktop">Expense</div>
      <div onClick={sortByAmount} className="list-header--right show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
    {
      expenses.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No expenses</span>
        </div>
      ) : (
        expenses.map((expense, index) =>
          <ExpenseListItem
            key={expense.id}
            index={index + 1}
            expense={expense}
          />)
      )
    }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};
const mapDispatchToProps = (dispatch) => ({
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount())
});


export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
