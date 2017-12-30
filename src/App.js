import React from 'react';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import AppRouter from './routers/AppRouter';
import {Provider} from 'react-redux';

import {startSetExpenses} from './store/actions/expenses';
import configureStore from './store/configureStore';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};

    this.store = configureStore();
    this.store.dispatch(startSetExpenses()).then(() => {
      console.log('loading complete');
      this.setState({loading: false});
    });
  }

  render() {
    if( this.state.loading ){
      return (
        <p>Loading...</p>
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
