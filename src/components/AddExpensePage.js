import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {addExpense} from '../store/actions/expenses';

/**
 * @param {Object} props
 * @property {function(expenseAction)} props.dispatch
 * @property {function(string)} props.history
 * @property {function(string)} props.history.push
 * @class
 */
const AddExpensePage = ({dispatch, history}) => {
  /**
   * @callback onSubmitExpenseCallback
   * @param {Expense} expense
   */
  const onSubmitExpense = (expense) => {
    dispatch(addExpense(expense));
    history.push('/');
  };

  return (
    <div>
      <ExpenseForm onSubmit={onSubmitExpense}/>
    </div>
  );
};


export default connect()(AddExpensePage);