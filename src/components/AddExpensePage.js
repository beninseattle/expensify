import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {addExpense} from '../store/actions/expenses';
import paths from '../routers/paths';

/**
 * @property {Object} props
 * @property {mapDispatchToProps} props.onSubmit
 * @property {Object} props.history
 * @property {function(string)} props.history.push
 */
export class AddExpensePage extends React.Component {
  /**
   * @callback onSubmitExpenseCallback
   * @param expense
   */
  onSubmit = (expense) => {
    this.props.addExpense(expense);
    this.props.history.push(paths.dashboard);
  };

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={this.onSubmit}/>
      </div>
    );
  }
}

/**
 * @callback
 * @param {function(expenseAction)} dispatch
 * @returns {{addExpense: (function(Expense): *)}}
 */
const mapDispatchToProps = (dispatch) => {
  return {
    addExpense: (expense) => dispatch(addExpense(expense))
  };
};
export default connect(undefined, mapDispatchToProps)(AddExpensePage);