const expensesReducerDefaultState = [];
export const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];

    case 'DELETE_EXPENSE':
      return state.filter(({id}) => id !== action.expense.id);

    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.equals(action.expense.id)) {
          return action.expense;
        } else {
          return expense;
        }
      });

    case 'SET_EXPENSES':
      return action.expenses;

    default:
      return state;
  }
};
