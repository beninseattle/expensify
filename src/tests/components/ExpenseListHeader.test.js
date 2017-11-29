import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListHeader} from "../../components/ExpenseListHeader";

test('should render ExpenseListHeader for one expense', () => {
  const wrapper = shallow(<ExpenseListHeader expensesCount={1} expensesTotal={200}/>);

  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListHeader for multiple expenses', () => {
  const wrapper = shallow(<ExpenseListHeader expensesCount={2} expensesTotal={450000}/>);

  expect(wrapper).toMatchSnapshot();
});
