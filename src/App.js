import React from "react";
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact children={<Dashboard></Dashboard>}></Route>
        <Route path="/login" children={<Login></Login>}></Route>
        <Route path="*" children={<Error></Error>}></Route>
      </Switch>
    </Router>
  );
}

export default App;
