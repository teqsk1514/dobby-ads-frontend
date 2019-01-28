import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Search from './Pages/Search';
import SignIn from './Pages/signin';
import Register from './Pages/register';

import AuthContext from './context/auth-context';

class App extends Component {

  state = {
    token: localStorage.getItem('token'),
  }
  login = (token) => {
    const splitedToken = token.split(' ')[1];
    localStorage.setItem('token', splitedToken)
    this.setState({
      token: splitedToken,
    });
  }

  logout = () => {
    localStorage.removeItem('token')
    this.setState({
      token: null,
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <AuthContext.Provider value={{
            token: this.state,
            login: this.login,
            logout: this.logout
          }} >
            <Switch>
              <Redirect from="/" to="/register" exact />
              {this.state.token && <Redirect from="/login" to="/search" exact />}
              {this.state.token && <Redirect from="/register" to="/search" exact />}
              {this.state.token && <Route path="/search" component={Search} />}
              {<Route path="/login" component={SignIn} />}
              <Route path="/register" component={Register} />
              {!this.state.token && <Redirect to="/login" exact />}
            </Switch>
          </AuthContext.Provider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
