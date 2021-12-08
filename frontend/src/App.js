import React, {useState, createContext, useEffect} from "react";
import Form from './components/Form';
import LoanInfo from "./components/LoanInfo";
import './App.css';
import Axios from "axios";

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
      <userInfo.Provider value={{
        name: [name, setName],
        address: [address, setAddress],
        pan: [pan, setPan],
        loanAmount: [loanAmount, setLoanAmount],
        tenure: [tenure, setTenure]
      }}>
        <Form />
      </userInfo.Provider>
      <h1>Loan List</h1><br/>
      {
        loanList.map((item,key)=>{
          return item.loansApplied.map((loanData,key)=>{
            return <LoanInfo key={loanData._id} loanData={loanData}/>
          })
        })
      }
    </div>
  );
}

export default App;
