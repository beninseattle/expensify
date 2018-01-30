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
 * @property {string} state.expense.id
 * @property {string} state.expense.description
 * @property {string} state.expense.note
 * @property {string} state.expense.amount
 * @property {int} state.expense.createdAt
 */
export default class ExpenseForm extends Component {
  onDescriptionChange = (e) => {
    let newDescription = e.target.value;
    this.setState(() => ({description: newDescription}));
  };
  onNoteChange = (e) => {
    let newNote = e.target.value;
    this.setState(() => ({note: newNote}));
  };
  // Amount needs to handle incomplete string representations of numbers
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d+(\.\d{0,2})?$/)) {
      let newAmount = amount.trim();
      this.setState(() => ({amount: newAmount}));
    }
  };

  /**
   * @param {moment} createdAt
   */
  onDateChange = (createdAt) => {
    if (createdAt) {
      let newCreatedAt = createdAt.valueOf();
      this.setState(() => ({createdAt: newCreatedAt}));
    }
  };
  onFocusChange = ({focused}) => {
    this.setState(() => ({calendarFocused: focused}));
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const expense = new Expense({
      id: this.state.expenseId,
      description: this.state.description.trim(),
      note: this.state.note.trim(),
      amount: parseFloat(this.state.amount) * 100,
      createdAt: this.state.createdAt
    });

    if (!expense.isValid()) {
      this.setState(() => ({error: 'A description and amount is required'}));
    } else {
      this.setState(() => ({error: ''}));
      this.props.onSubmit(expense);
    }
  };

  /**
   * @param {Object} props
   * @property {onSubmitExpenseCallback} props.onSubmit
   * @property {Expense} [props.expense]
   */
  constructor(props) {
    super(props);
    const expense = props.expense;
    this.submitButton = expense !== undefined ? 'Save changes' : 'Save expense';
    let expenseFields = {
      expenseId: expense !== undefined ? expense.id : undefined,
      description: expense !== undefined ? expense.description : '',
      note: expense !== undefined ? expense.note : '',
      amount: expense !== undefined ? (expense.amount / 100).toFixed(2) : '',
      createdAt: expense !== undefined ? expense.createdAt : undefined
    };
    this.state = {
      calendarFocused: false,
      error: '',
      ...expenseFields
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
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          className="text-input"
          type="text"
          placeholder="Amount"
          name="amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={moment(this.state.createdAt)}
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
          value={this.state.note}
          onChange={this.onNoteChange}/><br/>
        <div>
          <button className="button">{this.submitButton}</button>
        </div>
      </form>
    );

  }
}