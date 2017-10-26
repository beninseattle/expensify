import React from 'react';
import {shallow} from 'enzyme';
import ExpenseListItem from "../../components/ExpenseListItem";
import expenses from '../fixtures/expenses';

test('should render ExpenseListItem with an expense', () => {
  const wrapper = shallow(<ExpenseListItem index={0} expense={expenses[0]}/>);

  expect(wrapper).toMatchSnapshot();
});
