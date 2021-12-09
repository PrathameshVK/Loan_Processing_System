import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';

export default function Login() {

    const {login, currentUser}=useAuth();
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState('');
    const history=useNavigate();

    const handleSignup= async ()=>{
        try{
            setError("");
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
            {
                currentUser?history('/')
                :<button disabled={loading} onClick={handleSignup} >Sign in with google</button>        
            }
        </div>
    )
}
