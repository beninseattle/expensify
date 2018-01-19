import React from 'react';
import ExpenseListHeader from './ExpenseListHeader';
import ExpenseListFilter from './ExpenseListFilter';
import ExpenseList from './ExpenseList';

const DashboardPage = () => (
  <div>
    <ExpenseListHeader/>
    <ExpenseListFilter/>
    <ExpenseList/>
  </div>
);

export default DashboardPage;