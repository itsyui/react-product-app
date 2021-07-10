import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Main } from "./Main";
import "./data/datasource";
import "./commands";
import "./handlers";
import "./schema";

const App: React.FC = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;
