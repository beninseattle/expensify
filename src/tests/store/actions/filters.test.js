import {setStartDate, setStopDate, setTextFilter, sortByAmount, sortByDate} from "../../../store/actions/filters";
import moment from 'moment';

test('should generate set text filter action object', () => {
  const text = 'blah';
  const textFilterAction = setTextFilter(text);
  expect(textFilterAction).toEqual({
    type: 'SET_TEXT_FILTER',
    text: text
  })
});

test('should generate set start date action object', () => {
  const date = moment(20);
  const action = setStartDate(date);
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: date
  })
});

test('should generate set stop date action object', () => {
  const date = moment(20);
  const action = setStopDate(date);
  expect(action).toEqual({
    type: 'SET_STOP_DATE',
    stopDate: date
  })
});

test('should generate sort by date action object', () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: 'SORT_BY_DATE'
  })
});

test('should generate sort by amount action object', () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT'
  })
});
