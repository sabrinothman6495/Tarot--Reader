import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client"; // Apollo client setup
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TarotReading from "./pages/TarotReading";
import ProtectedRoute from "./components/ProtectedRoute"; // Protect dashboard

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tarot-reading"
              element={
                <ProtectedRoute>
                  <TarotReading />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
