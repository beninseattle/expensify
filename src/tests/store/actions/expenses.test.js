import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Expense from '../../../models/expense';
import {
  addExpense,
  startAddExpense,
  deleteExpense,
  startDeleteExpense,
  editExpense,
  setExpenses,
  startSetExpenses
} from "../../../store/actions/expenses";
import expenses from '../../fixtures/expenses';
import database from '../../../firebase/firebase';
import {expensesReducer} from "../../../store/reducers/expenses";

/**
 * @property {function()} dispatch
 */
const createMockStore = configureMockStore([thunk]);

beforeEach(() => {
  let expensesData = {};
  expenses.forEach(({id, description, amount, createdAt}) => {
    expensesData[id] = {description, amount, createdAt};
  });
  database.ref('expenses').set(expensesData).then(() => done());
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

test('should setup delete expense action object', () => {
  const expense = new Expense();
  const deleteAction = deleteExpense(expense);
  expect(deleteAction).toEqual({
    type: 'DELETE_EXPENSE',
    expense
  });
});

test('should delete an expense from firebase', (done) => {
  const store = createMockStore({});
  store.dispatch(startDeleteExpense(expenses[0]))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'DELETE_EXPENSE',
        expense: expenses[0]
      });
      return database.ref(`expenses/${expenses[0].id}`).once('value');
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

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
});
test('' +
  'should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0].type).toEqual('SET_EXPENSES');
    expect(actions[0].expenses).toEqual(expect.arrayContaining(expenses));
    done();
  });
});
