import React, {useContext} from 'react';
import Axios from "axios";
import {userInfo} from "../App";

export default function Form() {

    const {name, address, pan, loanAmount, tenure}=useContext(userInfo);
    
    const [stateName, setStateName]=name;
    const [stateAddress, setStateAddress]=address;
    const [statePan, setStatePan]=pan;
    const [stateLoanAmount, setStateLoanAmount]=loanAmount;
    const [stateTenure, setStateTenure]=tenure;

    const addToList=(e)=>{
        e.preventDefault();
        Axios.post('http://localhost:5000/insert',{
            name: stateName,
            address: stateAddress,
            pan: statePan,
            loanAmount: stateLoanAmount,
            tenure: stateTenure
        });
    }

    const updateList=(e)=>{
        e.preventDefault();
        Axios.post('http://localhost:5000/add',{
            name: stateName,
            address: stateAddress,
            pan: statePan,
            loanAmount: stateLoanAmount,
            tenure: stateTenure
        })
    }

    return (
        <div>
            <h1>Loan Application Form</h1>
            <form>
                <input
                    placeholder="name"
                    type="text"
                    onChange={(e)=>{setStateName(e.target.value)}}
                /><br />
                <input
                    placeholder="address"
                    type="text"
                    onChange={(e)=>{setStateAddress(e.target.value)}}
                /><br/>
                <input
                    placeholder="PAN number"
                    type="text"
                    onChange={(e)=>{setStatePan(e.target.value)}}
                /><br/>
                <input
                    placeholder="Loan Amount"
                    type="text"
                    onChange={(e)=>{setStateLoanAmount(e.target.value)}}
                /><br/>
                <input
                    placeholder="Tenure"
                    type="text"
                    onChange={(e)=>{setStateTenure(e.target.value)}}
                /><br/>
                <button onClick={(e)=>addToList(e)} type="submit">Apply</button>
                <button onClick={(e)=>updateList(e)} type="submit">Add</button>
            </form>
        </div>
    )
}
