import React from 'react';
import { ThemeProvider } from "styled-components";
import {theme} from "./design/theme";
import Routing from "./Routing";
import GlobalStyle from "./design/GlobalStyle";

import './i18n/setup';

const App = () => {
  return (
      <ThemeProvider theme={theme}>
          <GlobalStyle/>
          <Routing />
      </ThemeProvider>
  );
};

export default App;
