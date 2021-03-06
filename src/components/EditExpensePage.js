import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import {startEditExpense, startDeleteExpense} from "../store/actions/expenses";
import paths from '../routers/paths';

/**
 * @property {Object} props
 * @property {Expense} props.expense
 * @property {function(Expense)} props.editExpense
 * @property {function(Expense)} props.deleteExpense
 * @property {Object} props.history
 * @property {function(string)} props.history.push
 * @property {function(string)} props.history.redirect
 */
export class EditExpensePage extends React.Component {
  /**
   * @callback onSubmitExpenseCallback
   * @param {Expense} expense
   */
  onSubmit = (expense) => {
    this.props.editExpense(expense);
    this.props.history.push(paths.dashboard);
  };
  /**
   * @callback onDeleteExpenseCallback
   */
  onDelete = () => {
    this.props.deleteExpense(this.props.expense);
    this.props.history.push(paths.dashboard);
  };

  render() {
    if( this.props.expense === undefined ) {
      return (
        <Redirect to={paths.dashboard} />
      );
    }

    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onDelete}>Delete</button>
        </div>
      </div>
    );
  }
}
/**
 *
 * @param {Object} state
 * @property {Expense[]} state.expenses
 * @param {Object} props
 * @property {string} props.match.params.id
 * @returns {{expense: T}}
 */
const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.equals(props.match.params.id))
});
/**
 * @callback
 * @param {function(expenseAction)} dispatch
 * @returns {{addExpense: (function(Expense)), deleteExpense: (function(Expense))}}
 */

const mapDispatchToProps = (dispatch) => ({
  editExpense: (expense) => dispatch(startEditExpense(expense)),
  deleteExpense: (expense) => dispatch(startDeleteExpense(expense))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);