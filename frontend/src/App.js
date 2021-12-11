import React from "react";
import Login from "./pages/Login";
import {Routes, Route} from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { UserContext } from "./context/UserContext";
import Home from "./pages/Home";
import './App.scss';

function App() {
  
  return (
    <div className="App">
      <AuthProvider>
      <UserContext>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
            <Home />
            </PrivateRoute>
          }/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </UserContext>
      </AuthProvider>
    </div>
  );
}

export default App;