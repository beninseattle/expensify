import React from 'react';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import AppRouter from './routers/AppRouter';
import {Provider} from 'react-redux';
import Expense from './models/expense';

import {addExpense} from './store/actions/expenses';
import configureStore from './store/configureStore';

const App = () => {

  const store = configureStore();

  store.dispatch(
    addExpense(
      new Expense({
        description: 'Rent for August',
        note: 'Rent',
        amount: 100000
      })));
  setTimeout(() => store.dispatch(
    addExpense(
      new Expense({
        description: 'Internet service for August',
        note: 'Utility',
        amount: 5000
      }))), 1500);
  setTimeout(() => store.dispatch(
    addExpense(
      new Expense({
        description: 'Coffee',
        note: 'Mmmm',
        amount: 565
      }))), 3000);
  setTimeout(() => store.dispatch(
    addExpense(
      new Expense({
        description: 'Car Payment',
        note: 'Loan',
        amount: 40000
      }))), 4500);

  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  );
};

export default App;
