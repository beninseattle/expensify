import React, {Component} from 'react';
import moment from 'moment';
// react dates must be initialized before importing
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import Expense from '../models/expense';

/**
 * @class ExpenseForm
 * @property {Object} props
 * @property {onSubmitExpenseCallback} props.onSubmit
 * @property {Expense} props.expense
 * @property {Object} state
 * @property {Expense} state.expense
 */
export default class ExpenseForm extends Component {
  onDescriptionChange = (e) => {
    let newExpense = new Expense(this.state.expense);
    newExpense.description = e.target.value;
    this.setState(() => ({expense: newExpense}));
  };
  onNoteChange = (e) => {
    let newExpense = new Expense(this.state.expense);
    newExpense.note = e.target.value;
    this.setState(() => ({expense: newExpense}));
  };
  // TODO: Fix this input
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d+(\.\d{0,2})?$/)) {
      let newExpense = new Expense(this.state.expense);
      newExpense.amount = parseFloat(amount) * 100;
      this.setState(() => ({expense: newExpense}));
    }
  };

  /**
   * @param {moment} createdAt
   */
  onDateChange = (createdAt) => {
    if (createdAt) {
      let newExpense = new Expense(this.state.expense);
      newExpense.createdAt = createdAt.valueOf();
      this.setState(() => ({expense: newExpense}));
    }
  };
  onFocusChange = ({focused}) => {
    this.setState(() => ({calendarFocused: focused}));
  };
  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.expense.isValid()) {
      this.setState(() => ({error: 'A description and amount is required'}));
    } else {
      this.setState(() => ({error: ''}));
      this.props.onSubmit(this.state.expense);
    }
  };

  /**
   * @param {Object} props
   * @property {onSubmitExpenseCallback} props.onSubmit
   * @property {Expense} [props.expense]
   */
  constructor(props) {
    super(props);
    this.submitButton = 'Save changes';
    let expense = props.expense;
    if (expense === undefined) {
      expense = new Expense();
      this.submitButton = 'Save expense';
    }
    this.state = {
      expense: expense,
      calendarFocused: false,
      error: ''
    };
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          className="text-input"
          type="text"
          placeholder="Description"
          name="description"
          autoFocus
          value={this.state.expense.description}
          onChange={this.onDescriptionChange}
        />
        <input
          className="text-input"
          type="text"
          placeholder="Amount"
          name="amount"
          value={this.state.expense.amountAsFloat()}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={moment(this.state.expense.createdAt)}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          className="textarea"
          name="note"
          placeholder="Add a note (optional)"
          value={this.state.expense.note}
          onChange={this.onNoteChange}/><br/>
        <div>
          <button className="button">{this.submitButton}</button>
        </div>
      </form>
    );

  }
}