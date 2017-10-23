import moment from 'moment';
import {filtersReducer} from "../../../store/reducers/filters";

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  stopDate: moment().endOf('month')
};

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual(filtersReducerDefaultState);
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  // give it a state that doesn't have sortBy set to date already
  const currentState = {
    ...filtersReducerDefaultState,
    sortBy: 'amount'
  };
  const state = filtersReducer(currentState, {type: 'SORT_BY_DATE'});
  expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
  const testText = 'blah';
  const state = filtersReducer(undefined, {type: 'SET_TEXT_FILTER', text: testText});
  expect(state.text).toBe(testText);
});

test('should set start date filter', () => {
  const testDate = moment().add(2, 'days');
  const state = filtersReducer(undefined, {type: 'SET_START_DATE', startDate: testDate});
  expect(state.startDate).toEqual(testDate);
});

test('should set stop date filter', () => {
  const testDate = moment().subtract(5, 'days');
  const state = filtersReducer(undefined, {type: 'SET_STOP_DATE', stopDate: testDate});
  expect(state.stopDate).toEqual(testDate);
});