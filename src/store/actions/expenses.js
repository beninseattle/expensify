import database from '../../firebase/firebase';

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
