import React, {useState, createContext, useEffect} from "react";
import Form from './components/Form';
import LoanInfo from "./components/LoanInfo";
import Axios from "axios";
import Login from "./pages/Login";
import {Routes, Route} from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import './App.css';

export const userInfo=createContext();

function App() {


  const[name, setName]=useState("");
  const[address, setAddress]=useState("");
  const[pan, setPan]=useState("");
  const[loanAmount, setLoanAmount]=useState("");
  const[tenure, setTenure]=useState("");

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
      <userInfo.Provider value={{
        name: [name, setName],
        address: [address, setAddress],
        pan: [pan, setPan],
        loanAmount: [loanAmount, setLoanAmount],
        tenure: [tenure, setTenure]
      }}>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
            <Form />
            </PrivateRoute>
          }/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </userInfo.Provider>
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