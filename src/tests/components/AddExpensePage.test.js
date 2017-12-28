import React from 'react';
import {shallow} from 'enzyme';
import {AddExpensePage} from "../../components/AddExpensePage";
import expenses from '../fixtures/expenses';
import paths from '../../routers/paths';

let startAddExpense, history, wrapper;

beforeEach(() => {
  startAddExpense = jest.fn();
  history = {push: jest.fn()};
  wrapper = shallow(<AddExpensePage {...{startAddExpense, history}}/>);
});

test('should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle addExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith(paths.dashboard);
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});
