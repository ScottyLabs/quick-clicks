import React from 'react';
// import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Container, Header} from 'semantic-ui-react';
import Home from './components/Home';
import Admin from './components/Admin';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {

  return (
    <Container>
      <Header as='h1'>Quick Clicks</Header>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/admin">
            <Admin></Admin>
          </Route>  
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
