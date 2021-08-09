import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from "pages/App";
import NotFound from "pages/not-found";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route component={NotFound} />
        {/* <Route exact path="/:id" component={App} /> */}
      </Switch>
    </Router>
  );
}

export default Routes;
