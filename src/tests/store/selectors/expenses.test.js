import moment from 'moment';
import selectExpenses from '../../../store/selectors/expenses';
import expenses from '../fixtures/expenses';

test('should filter by text value', () => {
  const filters = {
    text: 'a',
    sortBy: 'date',
    startDate: undefined,
    stopDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[1], expenses[0]]);

});

test('should filter by start date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(1).valueOf(),
    stopDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[3], expenses[2]]);
});

test('should filter by stop date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    stopDate: moment(1).valueOf()
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[1], expenses[0], expenses[3]]);
});

test('should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    stopDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[1], expenses[0], expenses[3], expenses[2]]);
});

test('should sort by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    stopDate: undefined
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0], expenses[3], expenses[1]]);
});