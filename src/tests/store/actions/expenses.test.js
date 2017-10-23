import Expense from '../../../models/expense';
import {addExpense, deleteExpense, editExpense} from "../../../store/actions/expenses";

test( 'should setup delete expense action object', () => {
  const expense = new Expense();
  const addAction = addExpense(expense);
  expect(addAction).toEqual({
    type: 'ADD_EXPENSE',
    expense
  });
});
test( 'should setup edit expense action object', () => {
  const expense = new Expense();
  const deleteAction = deleteExpense(expense);
  expect(deleteAction).toEqual({
    type: 'DELETE_EXPENSE',
    expense
  });
});
test( 'should setup edit expense action object', () => {
  const expense = new Expense();
  const editAction = editExpense(expense);
  expect(editAction).toEqual({
    type: 'EDIT_EXPENSE',
    expense
  });
});
