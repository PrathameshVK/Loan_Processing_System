import React, {useContext, useState} from 'react';
import Axios from "axios";
import {userInfo} from "../context/UserContext";
import {useAuth} from '../context/AuthContext';
import {IoIosCloseCircleOutline, IoIosSend} from "react-icons/io";
import Modal from 'react-modal';
import '../styles/Form.styles.scss';

export default function Form({setOpenModal}) {

    const {currentUser}=useAuth();

    const {name, address, pan, loanAmount, tenure}=useContext(userInfo);
    
    const [stateName, setStateName]=name;
    const [stateAddress, setStateAddress]=address;
    const [statePan, setStatePan]=pan;
    const [stateLoanAmount, setStateLoanAmount]=loanAmount;
    const [stateTenure, setStateTenure]=tenure;
    const [emi, setEmi]=useState(0);
    const [confirmModal, setConfirmModal]=useState(false);

    const calcEMI=()=>{
        const interest=(stateLoanAmount*(8.9*0.01))/(stateTenure*12);
        const total=((stateLoanAmount/(stateTenure*12))+interest).toFixed(2);
        return setEmi(total);
    }

    const updateList=(e)=>{
        e.preventDefault();
        Axios.post('http://localhost:5000/add',{
            userid: currentUser.uid,
            name: stateName,
            address: stateAddress,
            pan: statePan,
            loanAmount: stateLoanAmount,
            tenure: stateTenure,
            emi: emi
        })
    }

    return (
        <div>
            <div className='form-header'>
                <h1>Loan Application Form</h1>
                <IoIosCloseCircleOutline className='close-btn' onClick={()=>setOpenModal(false)} />
            </div>
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
                    required
                /><br/>
                <button type='submit' onClick={(e)=>{e.preventDefault();calcEMI();setConfirmModal(true)}} className='apply'>
                    Apply
                </button> 
                <Modal className="confirm-modal" isOpen={confirmModal}>
                    Confirm apply ?<br/>
                    EMI : {(emi>0 || emi==="Infinity")?emi:"0"}<br/>
                    <div>
                        <button onClick={()=>setConfirmModal(false)}>cancel</button>
                        <IoIosSend className='send-form' onClick={(e)=>{updateList(e);setOpenModal(false)}}/>
                    </div>
                </Modal>
            </form>
            
        </div>
    )
}
