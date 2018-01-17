import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Expense from '../../../models/expense';
import {
  addExpense,
  startAddExpense,
  deleteExpense,
  startDeleteExpense,
  setExpenses,
  startSetExpenses,
  editExpense,
  startEditExpense
} from "../../../store/actions/expenses";
import expensesFixture from '../../fixtures/expenses';
import database from '../../../firebase/firebase';
import {expensesReducer} from "../../../store/reducers/expenses";

/**
 * @property {function()} dispatch
 */
const createMockStore = configureMockStore([thunk]);
const uid = 'testuid';
let expenses = [];
let expensesData = {};
let store = () => {};

/**
 * As we may modify the objects, we need to make fresh copies for each test
 */
beforeEach(() => {
  expenses = [];
  expensesData = {};
  expensesFixture.forEach((expense) => {
    expensesData[expense.id] = expense.dataForSave();
    expenses.push(new Expense(expense));
  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
  store = createMockStore({auth: {uid}});
});

test('should setup add expense action object', () => {
  const expense = new Expense();
  const addAction = addExpense(expense);
  expect(addAction).toEqual({
    type: 'ADD_EXPENSE',
    expense
  });
});

test('should setup start add expense action', (done) => {
  let expense = expenses[1];

  store.dispatch(startAddExpense(expense)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense
    });

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().createdAt).toEqual(expense.createdAt);
    done();
  });
});

test('should setup delete expense action object', () => {
  const expense = new Expense();
  const deleteAction = deleteExpense(expense);
  expect(deleteAction).toEqual({
    type: 'DELETE_EXPENSE',
    expense
  });
});

test('should delete an expense from firebase', (done) => {
  store.dispatch(startDeleteExpense(expenses[0]))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'DELETE_EXPENSE',
        expense: expenses[0]
      });
      return database.ref(`users/${uid}/expenses/${expenses[0].id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test('should setup edit expense action object', () => {
  const expense = new Expense();
  const editAction = editExpense(expense);
  expect(editAction).toEqual({
    type: 'EDIT_EXPENSE',
    expense
  });
});

test('should edit an expense in firebase', (done) => {
  const newNote = 'test update';
  expenses[2].note = newNote;
  store.dispatch(startEditExpense(expenses[2]))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        expense: expenses[2]
      });
      return database.ref(`users/${uid}/expenses/${expenses[2].id}/note`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(newNote);
      done();
    })
});

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
});

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});

test('should fetch the expenses from firebase', (done) => {
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0].type).toEqual('SET_EXPENSES');
    expect(actions[0].expenses).toEqual(expect.arrayContaining(expenses));
    done();
  });
});
