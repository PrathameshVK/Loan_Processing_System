import React, {useState, createContext} from 'react';

export const userInfo=createContext();

export function UserContext({children}) {
    const[name, setName]=useState("");
    const[address, setAddress]=useState("");
    const[pan, setPan]=useState("");
    const[loanAmount, setLoanAmount]=useState("");
    const[tenure, setTenure]=useState("");

    const value={
        name: [name, setName],
        address: [address, setAddress],
        pan: [pan, setPan],
        loanAmount: [loanAmount, setLoanAmount],
        tenure: [tenure, setTenure]
      }

    return (
            <userInfo.Provider value={value}>
                {children}
            </userInfo.Provider>
    )
}
