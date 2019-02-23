import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Task from "./pages/Task/Task";
import NewTask from './pages/NewTask/NewTask';
import Err404 from "./pages/Err404/Error404";
import Navbar from './components/Navbar/Navbar';
import "./App.css";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="text-center">
          <Navbar />
          <div className="padMe">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/task/:id" component={Task} />
              <Route exact path="/newtask" component={NewTask} />
              <Route component={Err404} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
