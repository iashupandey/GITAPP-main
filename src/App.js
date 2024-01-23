import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDetails from "./components/UserDetails";
import UserInfo from "./components/UserInfo";
const App = () => {
  return (
    <div className="container">
      <Router>
        <NavBar />
        <UserInfo />
        {<hr />}
        <UserDetails />
      </Router>
    </div>
  );
};

export default App;
