import React, {useState, useEffect} from "react";
import Form from './components/Form';
import Axios from "axios";
import Login from "./pages/Login";
import {Routes, Route} from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { UserContext } from "./context/UserContext";
import './App.scss';

function App() {
  const[loanList, setLoanList]=useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/read")
    .then(res=>{
      setLoanList(res.data);
    })
  }, [loanList,setLoanList])

  return (
    <div className="App">
      <AuthProvider>
      <UserContext>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
            <Form />
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

      {/* <h1>Loan List</h1><br/>
      {
        loanList.map((item,key)=>{
          return item.loansApplied.map((loanData,key)=>{
            return <LoanInfo key={loanData._id} loanData={loanData}/>
          })
        })
      } */}