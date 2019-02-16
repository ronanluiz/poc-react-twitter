import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import LoginPage from './pages/Login';
import TimelinePage from './pages/Timeline';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* excact é necessário para definir a rota principal da aplicação */ }
          <Route path="/" exact component={LoginPage}/>
          <Route path="/timeline" component={TimelinePage}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
