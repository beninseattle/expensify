import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import {editExpense, deleteExpense} from "../store/actions/expenses";

/**
 * @param {Object} props
 * @property {Expense} props.expense
 * @property {function(expenseAction)} props.dispatch
 * @property {Object} props.history
 * @property {function(string)} props.history.push
 * @property {function(string)} props.history.redirect
 * @class
 */
const EditExpensePage = ({dispatch, expense, history}) => {
  /**
   * @callback onSubmitExpenseCallback
   * @param {Expense} expense
   */
  const onSubmitExpense = (expense) => {
    dispatch(editExpense(expense));
    history.push('/');
  };
  const onDeleteExpense = () => {
    dispatch(deleteExpense(expense));
    history.push('/');
  };

  if( expense === undefined ) {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <div>
      <ExpenseForm
        expense={expense}
        onSubmit={onSubmitExpense}
      />
      <button onClick={onDeleteExpense}>delete
      </button>
    </div>
  );
};

/**
 *
 * @param {Object} state
 * @property {Expense[]} state.expenses
 * @param {Object} props
 * @property {string} props.match.params.id
 * @returns {{expense: T}}
 */
const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.equals(props.match.params.id))
  };
};
export default connect(mapStateToProps)(EditExpensePage);