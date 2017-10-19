import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilter from './ExpenseListFilter';

const DashboardPage = () => (
  <div>
    <ExpenseListFilter/>
    <ExpenseList/>
  </div>
);

export default DashboardPage;