import React from 'react';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import {firebase} from './firebase/firebase';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import {history} from './routers/AppRouter';
import paths from './routers/paths';
import LoadingPage from './components/LoadingPage';

import {startSetExpenses} from './store/actions/expenses';
import {login, logout} from './store/actions/auth';
import configureStore from './store/configureStore';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
    this.store = configureStore();
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if( user ){
        this.store.dispatch(login(user.uid));
        this.store.dispatch(startSetExpenses()).then(() => {
          this.setState({loading: false});
          if( history.location.pathname === paths.login ){
            history.push(paths.dashboard);
          }
        });
      } else {
        this.store.dispatch(logout());
        this.setState({loading: false});
        history.push(paths.login);
      }
    });
  }

  render() {
    if( this.state.loading ){
      return (
        <LoadingPage/>
      );
    } else {
      return (
        <Provider store={this.store}>
          <AppRouter/>
        </Provider>
      );
    }
  }
}

export default App;
