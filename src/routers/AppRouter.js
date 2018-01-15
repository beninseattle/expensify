import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from "../components/LoginPage";
import paths from './paths';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path={paths.login} component={LoginPage} exact={true} />
        <PrivateRoute path={paths.dashboard} component={DashboardPage} />
        <PrivateRoute path={paths.addExpense} component={AddExpensePage} />
        <PrivateRoute path={paths.editExpense + ':id'} component={EditExpensePage} />
        <Route path={paths.help} component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;