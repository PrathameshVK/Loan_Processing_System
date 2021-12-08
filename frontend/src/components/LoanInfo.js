import React from 'react';
import Axios from 'axios';

export default function LoanInfo({loanData}) {
    const remove=(e)=>{
        e.preventDefault();
        Axios.post('http://localhost:5000/delete',{
            id:loanData._id
        });
    }
    return (
        <div>
            <h4>{loanData._id}</h4>
            <h2>{loanData.username}</h2>
            <p>{loanData.address}</p>
            <button onClick={(e)=>remove(e)}>Delete</button>
        </div>
    )
}
