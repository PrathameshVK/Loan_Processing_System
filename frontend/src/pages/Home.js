import React, {useState,useEffect} from 'react';
import Axios from 'axios';
import LoansList from '../components/LoansList';
import Form from '../components/Form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../styles/Home.styles.scss';
import {FiLogOut} from "react-icons/fi";
import {MdPostAdd} from "react-icons/md";

Modal.setAppElement("#root");
export default function Home() {
    const {currentUser,logout}=useAuth();
  const[loanList, setLoanList]=useState([]);
  const[openModal, setOpenModal]=useState(false);
  const history=useNavigate();

  
  const handleLogout=async ()=>{
    try{
        await logout();
        history('/login');
    }catch{

    }
}
  
  useEffect(() => {
    Axios.post("http://localhost:5000/read",{
        user: currentUser.uid
    })
    .then(res=>{
      setLoanList(res.data);
    })
  }, [loanList,currentUser.uid])

    return (
      <div>
        <div className='header'>
          <h1>Loan List</h1>
          <FiLogOut onClick={()=>handleLogout()} className='logout-btn' />
          </div><br/>
        <LoansList loanList={loanList}/>
            <Modal className='form-modal' isOpen={openModal}>
                <Form setOpenModal={setOpenModal} />
            </Modal>
        <br />
        <MdPostAdd onClick={()=>setOpenModal(true)} className='add-btn'/>
      </div>
    );
}
