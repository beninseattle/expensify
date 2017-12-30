import database from '../../firebase/firebase';
import Expense from '../../models/expense';

/**
 * @callback expenseAction
 * @param {Expense} expense
 */
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

/**
 *
 * @param {Expense} expense
 * @returns {function(*)}
 */
export const startAddExpense = (expense) => {
  // function functionality thanks to redux-thunk
  return (dispatch) => {
    return database.ref('expenses').push(expense.dataForSave()).then((ref) => {
      expense.saveToStore(ref.key);
      dispatch(addExpense(expense));
    });
  };
};

/**
 * @callback expenseAction
 * @param {Expense} expense - the expense to remove from the store
 */
export const deleteExpense = (expense) => ({
  type: 'DELETE_EXPENSE',
  expense
});

/**
 * @callback expenseAction
 * @param {Expense} expense - object with 1 or more of the fields of an expense
 */
export const editExpense = (expense) => ({
  type: 'EDIT_EXPENSE',
  expense
});

/**
 * @callback setExpenses
 */
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch) => {
    return database.ref('expenses').once('value').then((snapshot) => {
      const expenses = [];
      snapshot.forEach((childSnapshot) => {
        expenses.push( new Expense({
          id: childSnapshot.key,
          ...childSnapshot.val()
        }));
      });

      dispatch(setExpenses(expenses));
    });
  };
};