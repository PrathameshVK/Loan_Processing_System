import React, {useState} from 'react';
import Axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Modal from 'react-modal';
import '../styles/LoanInfo.styles.scss';
import {RiDeleteBin6Line} from 'react-icons/ri';

export default function LoanInfo({loanData}) {
    const {currentUser}=useAuth();
    const[openModal, setOpenModal]=useState(false);
    const remove=(e)=>{
        e.preventDefault();
        Axios.post('http://localhost:5000/delete',{
            userid:currentUser.uid,
            id:loanData._id
        });
    }
    return (
        <div className='loan-info-div'>
            {
                openModal ?
            <Modal className='loan-info-modal' isOpen={openModal} onRequestClose={()=>setOpenModal(false)}>
                <p>Loan id : {loanData._id}</p>
                <p>Name : {loanData.username}</p>
                <p>Address : {loanData.address}</p>
                <p>PAN : {loanData.PAN}</p>
                <p>Loan Amount : &#8377; {loanData.loanAmount}</p>
                <p>Tenure : {loanData.tenure} years</p>
                <p>EMI : &#8377; {loanData.EMI} </p>
                <p>Status : {loanData.status}</p>
                <br/>
                <RiDeleteBin6Line className="delete-btn" onClick={(e)=>{setOpenModal(false);remove(e)}} />
            </Modal>
            :
            <div className='loan-list-item' onClick={()=>setOpenModal(!openModal)}>
                <p>Loan id : {loanData._id}</p>
            </div>
            }
        </div>
    )
}
