import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListFilter} from "../../components/ExpenseListFilter";
import {defaultFilters, populatedFilters} from "../fixtures/filters";
import moment from 'moment';

let setTextFilter, setStartDate, setStopDate, sortByDate, sortByAmount, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  setStartDate = jest.fn();
  setStopDate = jest.fn();
  sortByAmount = jest.fn();
  sortByDate = jest.fn();
});

test('should render ExpenseListFilter correctly', () => {
  const filters = defaultFilters;
  wrapper = shallow(
    <ExpenseListFilter {...{setTextFilter, setStartDate, setStopDate, sortByDate, sortByAmount, filters}}/>
  );
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilter with various filter options set', () => {
  const filters = populatedFilters;
  wrapper = shallow(
    <ExpenseListFilter {...{setTextFilter, setStartDate, setStopDate, sortByDate, sortByAmount, filters}}/>
  );
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const filters = defaultFilters;
  const newText = 'chocolate';
  wrapper = shallow(
    <ExpenseListFilter {...{setTextFilter, setStartDate, setStopDate, sortByDate, sortByAmount, filters}}/>
  );
  wrapper.find('input').simulate('change', {
    target: { value: newText }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(newText);
});

test('should sort by date', () => {
  const filters = populatedFilters;
  const newSort = 'date';
  wrapper = shallow(
    <ExpenseListFilter {...{setTextFilter, setStartDate, setStopDate, sortByDate, sortByAmount, filters}}/>
  );
  wrapper.find('select').simulate('change', {
    target: { value: newSort }
  });
  expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
  const filters = defaultFilters;
  const newSort = 'amount';
  wrapper = shallow(
    <ExpenseListFilter {...{setTextFilter, setStartDate, setStopDate, sortByDate, sortByAmount, filters}}/>
  );
  wrapper.find('select').simulate('change', {
    target: { value: newSort }
  });
  expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
  const filters = defaultFilters;
  const startDate = moment(Date.now()).subtract(1,'month');
  const stopDate = moment(Date.now()).subtract(1,'week');
  wrapper = shallow(
    <ExpenseListFilter {...{setTextFilter, setStartDate, setStopDate, sortByDate, sortByAmount, filters}}/>
  );
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate: stopDate});
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setStopDate).toHaveBeenLastCalledWith(stopDate);
});

test('should handle date focus changes', () => {
  const filters = defaultFilters;
  const focused = true;
  wrapper = shallow(
    <ExpenseListFilter {...{setTextFilter, setStartDate, setStopDate, sortByDate, sortByAmount, filters}}/>
  );
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')({startDate: focused});
  expect(wrapper.state('calendarFocused')).toEqual({startDate: focused});
});

// test('should handle editExpense', () => {
//   wrapper = shallow(<EditExpensePage {...{expense, editExpense, deleteExpense, history}}/>);
//   wrapper.find('ExpenseForm').prop('onSubmit')(expense);
//   expect(history.push).toHaveBeenLastCalledWith(paths.dashboard);
//   expect(editExpense).toHaveBeenLastCalledWith(expense);
// });
//
// test('should handle deleteExpense', () => {
//   wrapper = shallow(<EditExpensePage {...{expense, editExpense, deleteExpense, history}}/>);
//   wrapper.find('button').at(0).simulate('click');
//   expect(history.push).toHaveBeenLastCalledWith(paths.dashboard);
//   expect(deleteExpense).toHaveBeenLastCalledWith(expense);
// });
