import React from "react";
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Switch>
          <PrivateRoute
            path="/"
            exact
            children={<Dashboard></Dashboard>}
          ></PrivateRoute>
          <Route path="/login" children={<Login></Login>}></Route>
          <Route path="*" children={<Error></Error>}></Route>
        </Switch>
      </Router>
    </AuthWrapper>
  );
}

export default App;
