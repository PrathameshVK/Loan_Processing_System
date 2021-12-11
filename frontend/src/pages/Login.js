import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import '../styles/Login.styles.scss';

export default function Login() {

    const {login, currentUser}=useAuth();
    const [loading, setLoading]=useState(false);
    const history=useNavigate();

    const handleSignup= async ()=>{
        try{
            setLoading(true);
            await login();
            history('/');
        }catch(error){
            console.log(error);
        }
        setLoading(false);
    }

    return (
        <div>
            <h1>Loan Processing System</h1>
            {
                currentUser?history('/')
                :<button className='login-with-google-btn' disabled={loading} onClick={handleSignup} >Sign in with google</button>        
            }
        </div>
    )
}
