import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Expense from '../../../models/expense';
import {addExpense, startAddExpense, deleteExpense, editExpense} from "../../../store/actions/expenses";
import expenses from '../../fixtures/expenses';
import database from '../../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test( 'should setup add expense action object', () => {
  const expense = new Expense();
  const addAction = addExpense(expense);
  expect(addAction).toEqual({
    type: 'ADD_EXPENSE',
    expense
  });
});
test('should setup start add expense action', (done) => {
  const store = createMockStore({});
  let expense = expenses[1];

  store.dispatch(startAddExpense(expense)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().createdAt).toEqual(expense.createdAt);
    done();
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
