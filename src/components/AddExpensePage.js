import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {startAddExpense} from '../store/actions/expenses';
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
    this.props.startAddExpense(expense);
    this.props.history.push(paths.dashboard);
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm onSubmit={this.onSubmit}/>
        </div>
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
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
  };
};
export default connect(undefined, mapDispatchToProps)(AddExpensePage);