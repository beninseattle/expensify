import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import ExpenseForm from "../../components/ExpenseForm";
import expenses from '../fixtures/expenses';

test('should render an empty ExpenseForm', () => {
  const wrapper = shallow(<ExpenseForm/>);

  expect(wrapper).toMatchSnapshot();
});

test('should render an expense form with given Expense', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm/>);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const value = 'a new description';
  const wrapper = shallow(<ExpenseForm/>);
  wrapper.find('[name="description"]').simulate('change', {
    target: {value}
  });
  expect(wrapper.state('error').length).toBe(0);
  expect(wrapper.state('expense')).toHaveProperty('description', value);
  expect(wrapper).toMatchSnapshot();
});

test('should set note on input change', () => {
  const value = 'a new note';
  const wrapper = shallow(<ExpenseForm/>);
  wrapper.find('[name="note"]').simulate('change', {
    target: {value}
  });
  expect(wrapper.state('error').length).toBe(0);
  expect(wrapper.state('expense')).toHaveProperty('note', value);
  expect(wrapper).toMatchSnapshot();
});

test('should set amount with valid input', () => {
  // TODO: should I be making use of expense objects? I don't like having to translate in this test with '* 100'
  const value = '29.99';
  const wrapper = shallow(<ExpenseForm/>);
  wrapper.find('[name="amount"]').simulate('change', {
    target: {value}
  });
  expect(wrapper.state('error').length).toBe(0);
  expect(wrapper.state('expense')).toHaveProperty('amount', value * 100);
  expect(wrapper).toMatchSnapshot();
});

test('should not set amount with invalid input', () => {
  const value = '100.9901';
  const wrapper = shallow(<ExpenseForm/>);
  const prevValue = wrapper.state('expense').amount;
  wrapper.find('[name="amount"]').simulate('change', {
    target: {value}
  });
  expect(wrapper.state('error').length).toBe(0);
  expect(wrapper.state('expense')).toHaveProperty('amount', prevValue);
  expect(wrapper).toMatchSnapshot();
});

test('should call onsubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const testExpense = expenses[0];
  const wrapper = shallow(<ExpenseForm expense={testExpense} onSubmit={onSubmitSpy}/>);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error').length).toBe(0);
  expect(onSubmitSpy).toHaveBeenLastCalledWith(testExpense);
});

test('should set new date on date change', () => {
  const now = moment(Date.now());
  const wrapper = shallow(<ExpenseForm/>);
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
  expect(wrapper.state('error').length).toBe(0);
  expect(wrapper.state('expense')).toHaveProperty('createdAt', now.valueOf());
  expect(wrapper).toMatchSnapshot();
});

test('should accept focus on date picker', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm/>);
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused});
  expect(wrapper.state('error').length).toBe(0);
  expect(wrapper.state('calendarFocused')).toBe(focused);
  expect(wrapper).toMatchSnapshot();
});