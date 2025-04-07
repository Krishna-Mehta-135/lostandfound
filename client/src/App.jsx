import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Gridview from "./components/Gridview";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Route with Navbar, Homepage, Gridview, Footer */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Homepage />
              <Gridview />
              <Footer />
            </>
          }
        />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;

 