import React from 'react';
import {Redirect, Router} from '@reach/router';
import AppLayout from "./pages/app/App";
const Routing = () => {
  return (
      <Router>
          <AppLayout path={"/app/*"} />
          <Redirect noThrow from={"/"} to={"/app"} />
      </Router>
  );
};

export default Routing;
