export const getVisibleExpenses = (expenses, filters) => {
  let visibleExpenses = expenses.filter((expense) => {
    if (filters.text.length > 0) {
      if (expense.note.toLowerCase().indexOf(filters.text.toLowerCase()) === -1 &&
        expense.description.toLowerCase().indexOf(filters.text.toLowerCase()) === -1) {
        return false;
      }
    }
    if (typeof(filters.startDate) === 'number') {
      if (expense.createdAt < filters.startDate) {
        return false;
      }
    }
    if (typeof(filters.stopDate) === 'number') {
      if (expense.createdAt > filters.stopDate) {
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
        return a.createdAt > b.createdAt ? -1 : 1;
      }
    } else if (filters.sortBy === 'amount') {
      if (a.amount === b.amount) {
        return 0;
      } else {
        return a.amount > b.amount ? -1 : 1;
      }
    }
    return 0;
  });
  return visibleExpenses;
};
