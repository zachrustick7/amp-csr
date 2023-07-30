import React from "react";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Users from "./pages/Users.jsx";
import FAQ from "./pages/FAQ.jsx";
import UserInfo from "./pages/UserInfo.jsx";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Layout tabIndex={0}><Dashboard/></Layout>}>
        </Route>
        <Route exact path="/users" element={<Layout tabIndex={1}><Users/></Layout>}>
        </Route>
        <Route exact path="/faq" element={<Layout tabIndex={2}><FAQ/></Layout>}>
        </Route>
        <Route exact path="/users/:userId" element={<Layout tabIndex={1}><UserInfo/></Layout>}>
        </Route>
      </Routes>
    </Router>
  );
}