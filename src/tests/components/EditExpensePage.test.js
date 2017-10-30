import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from "../../components/EditExpensePage";
import expenses from '../fixtures/expenses';
import paths from '../../routers/paths';

let expense, editExpense, deleteExpense, history, wrapper;

beforeEach(() => {
  expense = expenses[0];
  editExpense = jest.fn();
  deleteExpense = jest.fn();
  history = {push: jest.fn()};
});

test('should render EditExpensePage correctly', () => {
  wrapper = shallow(<EditExpensePage {...{expense, editExpense, deleteExpense, history}}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should redirect when no expense given', () => {
  wrapper = shallow(<EditExpensePage {...{editExpense, deleteExpense, history}}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  wrapper = shallow(<EditExpensePage {...{expense, editExpense, deleteExpense, history}}/>);
  wrapper.find('ExpenseForm').prop('onSubmit')(expense);
  expect(history.push).toHaveBeenLastCalledWith(paths.dashboard);
  expect(editExpense).toHaveBeenLastCalledWith(expense);
});

test('should handle deleteExpense', () => {
  wrapper = shallow(<EditExpensePage {...{expense, editExpense, deleteExpense, history}}/>);
  wrapper.find('button').at(0).simulate('click');
  expect(history.push).toHaveBeenLastCalledWith(paths.dashboard);
  expect(deleteExpense).toHaveBeenLastCalledWith(expense);
});
