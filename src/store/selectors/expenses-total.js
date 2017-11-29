/**
 * Sum the amounts of an array of expenses
 *
 * @param {Expense[]} expenses
 */
export default (expenses) => {
  const initialValue = 0;
  return expenses.reduce((total, expense) => total + expense.amount, initialValue);
};
