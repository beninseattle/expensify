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
 * Returns function to start async action to add a new expense in Firebase and then dispatch to redux
 * @param {Expense} expense
 * @returns {function(func,func)}
 */
export const startAddExpense = (expense) => {
  // function functionality thanks to redux-thunk
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).push(expense.dataForSave())
      .then((ref) => {
        expense.saveToStore(ref.key);
        dispatch(addExpense(expense));
      })
      .catch((error) => {
        console.log(`Add expense for expense ${expense.id} failed: ${error}`);
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
 * Returns function to start async action to delete a specific expense in Firebase and then dispatch to redux
 * @param expense
 * @returns {function(func, func)}
 */
export const startDeleteExpense = (expense) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${expense.id}`).remove()
      .then(() => {
        dispatch(deleteExpense(expense));
      })
      .catch((error) => {
        console.log(`Delete for expense ${expense.id} failed: ${error}`);
      });
  };
};

/**
 * @callback expenseAction
 * @param {Expense} expense - object with 1 or more of the fields of an expense
 */
export const editExpense = (expense) => ({
  type: 'EDIT_EXPENSE',
  expense
});

/**
 * Returns function to start async action to save a specific expense in Firebase and then dispatch to redux
 * @param expense
 * @returns {function(func, func)}
 */
export const startEditExpense = (expense) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses/${expense.id}`).set(expense.dataForSave())
      .then(() => {
        dispatch(editExpense(expense));
      })
      .catch((error) => {
        console.log(`Edit for expense ${expense.id} failed: ${error}`);
      });
  };
};

/**
 * @callback setExpenses
 */
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

/**
 * Returns function to start async action to load expenses from Firebase and then dispatch to redux
 * @returns {function(func, func)}
 */
export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value')
      .then((snapshot) => {
        const expenses = [];
        snapshot.forEach((childSnapshot) => {
          expenses.push(new Expense({
            id: childSnapshot.key,
            ...childSnapshot.val()
          }));
        });

        dispatch(setExpenses(expenses));
      })
      .catch((error) => {
        console.log(`Set expenses failed to load data: ${error}`);
      });
  };
};