import React from 'react';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';

import {addExpense, editExpense, deleteExpense} from './store/actions/expenses';
import {setTextFilter, setStartDate, setStopDate, sortByAmount, sortByDate} from './store/actions/filters';
import {getVisibleExpenses} from "./store/selectors/expenses";
import configureStore from './store/configureStore';

const App = () => {

  const store = configureStore();

  store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
  });

  const expense1 = store.dispatch(addExpense({description: 'Test', note: 'Test note', amount: 100, createdAt: 2000}));
  console.log(expense1);
  const expense2 = store.dispatch(addExpense({description: 'Coffee', note: 'Mmmm', amount: 565, createdAt: -1000}));
  // const removed = store.dispatch(deleteExpense({id: expense1.expense.id}));
  // console.log(removed);

  const editExpense2 = store.dispatch(editExpense(expense2.expense.id, {amount: 500}));

  //store.dispatch(setTextFilter('coffee'));
  store.dispatch(sortByAmount());
  store.dispatch(sortByDate());
  store.dispatch(setStartDate(125));
  store.dispatch(setStartDate());
  store.dispatch(setStopDate(1250));
  store.dispatch(setStopDate());
  store.dispatch(setTextFilter('coffee'));

  return (
    <AppRouter />
  );
};

export default App;
