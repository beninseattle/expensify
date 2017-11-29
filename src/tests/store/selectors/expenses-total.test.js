import selectExpensesTotal from '../../../store/selectors/expenses-total';
import expenses from '../../fixtures/expenses';

test('should return 0 if no expenses', () => {
  const result = selectExpensesTotal([]);
  expect(result).toBe(0);
});

test('should correctly total a single expense', () => {
  const result = selectExpensesTotal([expenses[0]]);
  expect(result).toBe(expenses[0].amount);
});

test('should correctly total multiple expenses', () => {
  const result = selectExpensesTotal([expenses[0], expenses[1]]);
  expect(result).toBe(expenses[0].amount + expenses[1].amount);
});
