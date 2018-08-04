import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style/index.css';
import App from './components/App';
import SignIn from './components/SignIn';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/SignIn" component={SignIn}/>
        <Route path="/" component={App}/>
      </Switch>
    </Router>
  </Provider>, 
document.getElementById('root'));