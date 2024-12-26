import React from "react";
import IncomeInput from "./components/IncomeInput";
import Navbar from "./components/NavBar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Outlet/>
    </div>
  );
};

export default App;
