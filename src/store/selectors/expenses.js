import moment from 'moment';

/**
 * Filtering by dates compares based on a granularity of days
 *
 * @param expenses
 * @param filters
 */
export default (expenses, filters) => {
  let visibleExpenses = expenses.filter((expense) => {
    if (filters.text.length > 0) {
      if (expense.note.toLowerCase().indexOf(filters.text.toLowerCase()) === -1 &&
        expense.description.toLowerCase().indexOf(filters.text.toLowerCase()) === -1) {
        return false;
      }
    }
    if (filters.startDate !== undefined) {
      if (moment(expense.createdAt).isBefore(filters.startDate, 'day')) {
        return false;
      }
    }
    if (filters.stopDate !== undefined) {
      if (moment(expense.createdAt).isAfter(filters.stopDate, 'day')) {
        return false;
      }
    }
    return true;
  });

  visibleExpenses.sort((a, b) => {
    if (filters.sortBy === 'date') {
      if (a.createdAt === b.createdAt) {
        return 0;
      } else {
        return a.createdAt < b.createdAt ? -1 : 1;
      }
    } else if (filters.sortBy === 'amount') {
      if (a.amount === b.amount) {
        return 0;
      } else {
        return a.amount < b.amount ? -1 : 1;
      }
    }
    return 0;
  });
  return visibleExpenses;
};
