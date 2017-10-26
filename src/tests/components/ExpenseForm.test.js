import React from 'react';
import {shallow} from 'enzyme';
import ExpenseForm from "../../components/ExpenseForm";
import expenses from '../fixtures/expenses';

test('should render an empty ExpenseForm', () => {
  const wrapper = shallow(<ExpenseForm/>);

  expect(wrapper).toMatchSnapshot();
});

test('should render an expense form with given Expense', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});