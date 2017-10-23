import {expensesReducer} from "../../../store/reducers/expenses";
import expenses from '../fixtures/expenses';
import Expense from '../../../models/expense';

const expensesReducerDefaultState = [];
test('should set default state', () => {
  const state = expensesReducer(undefined, '@@INIT');
  expect(state).toEqual(expensesReducerDefaultState);
});

test('should add expense', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expense: expenses[0]
  };
  const state = expensesReducer(expensesReducerDefaultState, action);
  expect(state).toEqual([...expensesReducerDefaultState, expenses[0]]);
});

test('should remove expense', () => {
  const action = {
    type: 'DELETE_EXPENSE',
    expense: expenses[1]
  };
  const state = expensesReducer([...expensesReducerDefaultState, expenses[1]], action);
  expect(state).toEqual(expensesReducerDefaultState);
});

test('should not remove not found expense', () => {
  const newExpense = new Expense({id: 'notAnId'});
  const action = {
    type: 'DELETE_EXPENSE',
    expense: newExpense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should edit an expense', () => {
  const newNote = 'test note for editing';
  const newExpense = new Expense(expenses[0]);
  newExpense.note = newNote;
  const action = {
    type: 'EDIT_EXPENSE',
    expense: newExpense
  };
  const state = expensesReducer(expenses, action);
  expect(state[0].note).toBe(newNote);
});

test('should not edit not found expense', () => {
  const newExpense = new Expense({id: 'notAnId', note: 'test note again'});
  const action = {
    type: 'EDIT_EXPENSE',
    expense: newExpense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});