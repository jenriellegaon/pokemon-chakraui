import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import App from "pages/App";
import NotFound from "pages/not-found";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      {/* <Route exact path="/:id" component={App} /> */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
